import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cookie-consent', 'rejected'))
  await page.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.abort())
  await page.route('**/api/contact', route => route.fulfill({ status: 502, json: { ok: false } }))
})

test('hero shows the heading at once and the quote form on every screen size', async ({ page }, info) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Håndværk med karakter.')
  await expect(page.locator('h1')).toBeVisible()
  const form = page.getByRole('form', { name: 'Lad os give dig et tilbud' })
  await form.scrollIntoViewIfNeeded()
  await expect(form).toBeVisible()
  await expect(form.getByLabel('Navn', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: info.outputPath('hero.png') })
})

test('hero quote works with keyboard, validates, and preserves input after a failed send', async ({ page }) => {
  await page.goto('/')
  const form = page.getByRole('form', { name: 'Lad os give dig et tilbud' })
  await form.getByLabel('Navn', { exact: true }).focus()
  await expect(form.getByLabel('Navn', { exact: true })).toBeFocused()
  await form.getByRole('button', { name: 'Få et uforpligtende tilbud' }).click()
  await expect(form.getByText('Angiv venligst dit navn')).toBeVisible()
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
  await expect(page.getByRole('status').first()).toContainText('Tak for din forespørgsel')
  await expect(page.getByRole('status').first()).toBeFocused()
})

test('reduced motion shows all content without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('h1')).toHaveCSS('opacity', '1')
  await page.evaluate(() => scrollTo({ top: document.body.scrollHeight / 2, behavior: 'instant' }))
  await expect(page.locator('.reveal').first()).toHaveCSS('opacity', '1')
  await expect(page.locator('[data-parallax]').first()).toHaveCSS('transform', 'none')
})

test('hero links lead to the projects page and the phone number', async ({ page }, info) => {
  await page.goto('/')
  await expect(page.locator('#home-hero a[href^="tel:"]')).toHaveAttribute('href', 'tel:+4593982730')
  test.skip(info.project.name !== 'desktop', 'The projects link is shown on desktop only')
  await page.locator('#home-hero').getByRole('link', { name: /Se vores arbejde/ }).click()
  await expect(page).toHaveURL(/\/projekter$/)
})
