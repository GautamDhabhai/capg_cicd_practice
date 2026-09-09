import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { AuthPage } from '../../pages/auth.page';

test.describe('Input security and safe navigation checks', () => {
  test('Security smoke checks', async ({ page, data }) => {
    const home = new HomePage(page);
    const auth = new AuthPage(page);
    const payload = data.aiPlanner.invalid.scriptPayload;
    // 1. Open the PHPTRAVELS homepage in a fresh browser context and dismiss the demo warning.
    await home.open(data.environment.baseUrl);
    await home.dismissDemoNoticeIfVisible();
    // 2. Enter a script-like payload into an available user input and submit or inspect it.
    await auth.open(data.environment.baseUrl);
    await auth.expectForm();
    await auth.email.fill(payload);
    // 3. Verify the payload is treated as inert text and no unsafe redirect occurs.
    await expect(auth.email).toHaveValue(payload);
    await expect(page.locator('body')).not.toContainText('<script>');
    await expect(page).toHaveURL(/https:\/\/phptravels\.net\/login/);
    // 4. Verify sensitive pages use HTTPS and the URL does not expose payment-card data.
    await expect(page).toHaveURL(/^https:\/\/phptravels\.net\//);
    await expect(page).not.toHaveURL(/4242|card(number)?|cvv/i);
  });
});
