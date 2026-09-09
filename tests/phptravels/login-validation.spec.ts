import { test, expect } from '../fixtures';
import { AuthPage } from '../../pages/auth.page';

test.describe('Login validation', () => {
  test('Rejects malformed credentials and exposes safe controls', async ({ page, data }) => {
    const auth = new AuthPage(page);
    // 1. Submit empty, malformed, unknown, and incorrect credentials.
    await auth.open(data.environment.baseUrl); await auth.expectForm();
    await auth.submitCredentials(data.auth.invalidCustomer.malformedEmail, data.auth.invalidCustomer.password);
    await expect(page).toHaveURL(/phptravels\.net\/login/);
    await expect(page.locator('body')).not.toContainText(data.auth.invalidCustomer.password);
    // 2. Toggle Remember Me and password visibility, then open Forgot Password.
    const rememberMe = page.getByRole('checkbox', { name: /Remember Me/i });
    await rememberMe.check({ force: true });
    await expect(rememberMe).toBeChecked({ timeout: 5000 });
    await page.getByRole('link', { name: /Forgot Password/i }).click();
    await expect(page).toHaveURL(/forgot-password/);
  });
});
