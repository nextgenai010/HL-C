import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cookie-consent', 'rejected'))
  await page.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.abort())
  await page.route('**/api/contact', route => route.fulfill({ status: 502, json: { ok: false } }))
})

test('hero reveals the quote on scroll and keeps the original heading', async ({ page }, info) => {
  await page.goto('/')
  const animated = await page.evaluate(() => matchMedia('(min-width: 1024px)').matches)
  const copy = page.locator('.hero-copy')
  const before = await copy.boundingBox()
  if (animated) {
    await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'true')
    await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.75, behavior: 'instant' }))
    await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'false')
    const after = await copy.boundingBox()
    expect(after!.x).toBeLessThan(before!.x - 100)
    expect(await page.locator('.hero-scene').evaluate(el => el.getBoundingClientRect().top)).toBeCloseTo(0, 0)
  } else {
    await expect(page.locator('#hero-tilbud')).toBeHidden()
    return
  }
  await expect(page.locator('#hero-name')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await expect(page.locator('.hero-copy > p')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: info.outputPath('hero-quote.png') })
  if (animated) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'true')
    await expect(page.locator('h1')).toBeVisible()
  }
})

test('quote works with keyboard, validates, and preserves input after a failed send', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'The hero quote form is desktop only')
  await page.goto('/')
  await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.75, behavior: 'instant' }))
  await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'false')
  await page.locator('#hero-name').focus()
  await expect(page.locator('#hero-name')).toBeFocused()
  const form = page.getByRole('form', { name: 'Lad os give dig et tilbud' })
  await form.getByRole('button', { name: 'Få et uforpligtende tilbud' }).click()
  await expect(page.getByText('Angiv venligst dit navn')).toBeVisible()
  await form.getByLabel('Navn', { exact: true }).fill('Test Person')
  await form.getByLabel('Telefon').fill('12345678')
  await form.getByLabel('Email').fill('test@example.com')
  await form.getByLabel('Hvad skal vi hjælpe med?').selectOption({ index: 1 })
  await form.getByLabel('Kort om dit projekt').fill('Test af formular uden rigtig afsendelse.')
  await form.getByRole('button', { name: 'Få et uforpligtende tilbud' }).click()
  await expect(form.getByRole('alert')).toBeVisible()
  await expect(form.getByLabel('Navn', { exact: true })).toHaveValue('Test Person')
  await page.route('**/api/contact', route => route.fulfill({ status: 200, json: { ok: true } }))
  await form.getByRole('button', { name: 'Få et uforpligtende tilbud' }).click()
  await expect(page.getByRole('status')).toContainText('Tak for din forespørgsel')
})

test('reduced motion keeps the quote accessible without scroll animation', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'The hero quote form is desktop only')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'false')
  await expect(page.locator('.hero-scene')).toHaveCSS('position', 'relative')
  await page.locator('#hero-name').fill('Test Person')
  await expect(page.locator('#hero-name')).toHaveValue('Test Person')
})

test('hero contact button goes to the contact page', async ({ page }) => {
  await page.goto('/')
  await page.locator('.hero-copy').getByRole('link', { name: 'Kontakt', exact: true }).click()
  await expect(page).toHaveURL(/\/kontakt$/)
})

test('scroll animation also works in a laptop window below 760px tall', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 650 })
  await page.goto('/')
  await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('.hero-scene')).toHaveCSS('position', 'sticky')
  await page.evaluate(() => scrollTo({ top: innerHeight * 0.75, behavior: 'instant' }))
  await expect(page.locator('#hero-tilbud')).toHaveAttribute('aria-hidden', 'false')
  await expect(page.locator('.hero-copy')).not.toHaveCSS('transform', 'none')
  const box = await page.locator('.hero-quote-card').boundingBox()
  expect(box!.y).toBeGreaterThan(85)
  expect(box!.y + box!.height).toBeLessThanOrEqual(650)
  await page.locator('#hero-name').fill('Test Person')
  await expect(page.locator('#hero-name')).toHaveValue('Test Person')
})
