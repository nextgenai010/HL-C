import { test, expect } from '@playwright/test'
import { YDELSER } from '../lib/services'
import { contactSchema } from '../lib/contact'

const routes = ['/', '/om-os', '/ydelser', '/projekter', '/kontakt', '/ofte-stillede-spoergsmaal', '/privatliv', '/cookies', ...YDELSER.map(y => '/ydelser/' + y.slug)]

test.beforeEach(async ({ page }) => {
  // Never send analytics or real enquiries during browser tests.
  await page.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.abort())
  await page.route('**/api/contact', route => route.fulfill({ status: 502, json: { ok: false, error: 'send-failed' } }))
})

test('pages have metadata, readable headings and no horizontal overflow', async ({ page }, info) => {
  test.setTimeout(180000)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of routes) {
    const response = await page.goto(route)
    expect(response?.status(), route).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp('https://hlchristiansen.dk' + (route === '/' ? '/?$' : route + '$')))
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /https:\/\/hlchristiansen.dk\//)
    const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }))
    expect(dimensions.content, route).toBeLessThanOrEqual(dimensions.width)
  }
  expect(errors).toEqual([])
  await page.goto('/')
  await page.getByRole('button', { name: 'Afvis', exact: true }).click()
  await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), { timeout: 30000 }).toBe(true)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: info.outputPath('home.png'), fullPage: true })
})

test('navigation and project lightbox work with keyboard', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Afvis', exact: true }).click()
  const toggle = page.getByRole('button', { name: 'Åbn menu' })
  if (await toggle.isVisible()) {
    await toggle.click()
    await expect(page.getByRole('navigation', { name: 'Mobilnavigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobilnavigation' })).toBeHidden()
  }
  await page.goto('/projekter')
  const opener = page.getByRole('button', { name: /Se billede:/ }).first()
  await opener.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('dialog')).toContainText('2 / 9')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
})

test('forms reject short messages, show server errors, and confirm success', async ({ page }) => {
  await page.goto('/kontakt')
  await page.getByRole('button', { name: 'Afvis', exact: true }).click()
  await page.getByLabel('Navn', { exact: true }).fill('Testperson')
  await page.getByLabel('Telefon', { exact: true }).fill('12345678')
  await page.getByLabel('Email', { exact: true }).fill('test@example.com')
  await page.getByRole('button', { name: 'Type opgave', exact: true }).click()
  await page.getByRole('option', { name: YDELSER[0].title, exact: true }).click()
  await page.getByLabel('Besked', { exact: true }).fill('Kort')
  await page.getByRole('button', { name: 'Send besked' }).click()
  await expect(page.getByText('Beskriv opgaven med mindst 10 tegn')).toBeVisible()
  await page.getByLabel('Besked', { exact: true }).fill('Dette er en lokal formulartest.')
  await page.getByRole('button', { name: 'Send besked' }).click()
  await expect(page.locator('form').getByRole('alert')).toContainText('Beskeden kunne ikke sendes')
  await page.route('**/api/contact', route => route.fulfill({ json: { ok: true } }))
  await page.getByRole('button', { name: 'Send besked' }).click()
  await expect(page.getByRole('status')).toContainText('Tak for din besked')
  await expect(page.getByRole('status')).toBeFocused()
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, 650))
  await page.getByRole('button', { name: 'Få et tilbud', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Send forespørgsel' }).click()
  await expect(dialog.getByText('Angiv venligst dit navn')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
})

test('consent can be rejected and withdrawn without tracking scripts', async ({ page, context }) => {
  await page.goto('/cookies')
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0)
  await page.getByRole('dialog', { name: 'Cookie-samtykke' }).getByRole('button', { name: 'Accepter', exact: true }).click()
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(1)
  await context.addCookies([{ name: '_ga', value: 'test-cookie', domain: 'localhost', path: '/' }])
  await page.getByRole('button', { name: 'Afvis / tilbagekald' }).click()
  await expect(page.getByRole('status')).toHaveText('Statistik er afvist.')
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0)
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toEqual([])
})

test('FAQ remains readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`${baseURL}/ofte-stillede-spoergsmaal`)
  const item = page.locator('details').first()
  await item.locator('summary').click()
  await expect(item.locator('p')).toBeVisible()
  await context.close()
})

test('shared validation and API reject invalid data before sending mail', async ({ request }) => {
  const valid = { name: 'Testperson', phone: '12345678', email: 'test@example.com', type: YDELSER[0].title, message: 'En tilstrækkeligt lang besked' }
  expect(contactSchema.safeParse(valid).success).toBe(true)
  for (const message of ['kort', '123456789', '          ']) {
    expect(contactSchema.safeParse({ ...valid, message }).success).toBe(false)
    const response = await request.post('/api/contact', { data: { ...valid, message } })
    expect(response.status()).toBe(400)
  }
  const malformed = await request.post('/api/contact', { data: '{', headers: { 'Content-Type': 'application/json' } })
  expect(malformed.status()).toBe(400)
})
