import { test, expect } from "@playwright/test"


test('verify balance after trasnfering amount', async ({ page }) => {

    await page.goto("https://tta-bank-digital-973242068062.us-west1.run.app/")
    await page.getByRole('button', { name: 'Sign Up' }).click()
    await page.getByRole('textbox', { name: 'John Doe' }).fill("Ash Karale")
    await page.getByRole('textbox', { name: 'you@example.com' }).fill("ashkarale@gmail.com")
    await page.getByRole('textbox', { name: '••••••••' }).fill("ashkarale@123")
    await page.getByRole('button', { name: 'Create Account' }).click()
    const initial_balance = parseFloat((await page.getByRole('heading', { name: '$50,000.00' }).textContent())?.replace(/[$,]/g, '') || '0')
    await page.getByRole('button', { name: 'Transfer Funds' }).click()
    await page.getByPlaceholder('0.00').fill("5000")
    await page.getByRole('button', { name: 'Continue' }).click()
    const transfer_amount = parseFloat((await page.getByText('$5000.00', { exact: true }).textContent())?.replace(/[$,]/g, '') || '0')
    await page.getByRole('button', { name: 'Confirm Transfer' }).click()
    await page.getByRole('button', { name: 'Dashboard' }).click()
    const final_balance = parseFloat((await page.getByRole('heading', { name: '$45,000.00' }).textContent())?.replace(/[$,]/g, '') || '0')
    expect(final_balance).toBe(initial_balance - transfer_amount)

    // Take a screenshot here
    await page.screenshot({ path: 'screenshot.png', fullPage: true })

    await page.waitForTimeout(5000)
})
