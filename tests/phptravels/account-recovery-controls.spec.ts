import { test, expect } from '../fixtures';
import { AuthPage } from '../../pages/auth.page';

test.describe('Account recovery and login controls', () => {
  test('Validates recovery inputs and login presentation controls', async ({ page, data }) => {
    const auth = new AuthPage(page);
    // 1. Open the PHPTRAVELS login page.
    await auth.open(data.environment.baseUrl);
    await auth.expectForm();
    // 2. Verify the login form exposes email and password fields.
    await expect(auth.email).toBeVisible();
    await expect(auth.password).toBeVisible();
    // 3. Toggle password visibility when the live form exposes that control.
    const visibilityToggle = page.getByRole('button', { name: /show|hide|password/i }).filter({ hasNotText: /login|sign in/i }).first();
    if (await visibilityToggle.isVisible().catch(() => false)) {
      const before = await auth.password.getAttribute('type');
      await visibilityToggle.click();
      await expect(auth.password).not.toHaveAttribute('type', before || 'password');
    }
    // 4. Toggle Remember Me when the live form exposes it.
    const rememberMe = page.getByRole('checkbox', { name: /remember/i }).first();
    if (await rememberMe.isVisible().catch(() => false)) {
      const before = await rememberMe.isChecked();
      await rememberMe.setChecked(!before);
      await expect(rememberMe).toBeChecked({ checked: !before });
    }
    // 5. Open the Forgot Password route or control.
    const forgotPassword = page.getByRole('link', { name: /forgot|reset password/i }).first();
    if (!(await forgotPassword.isVisible().catch(() => false))) {
      test.skip(true, 'The public demo currently does not expose a deterministic password recovery control.');
      return;
    }
    await forgotPassword.click();
    // 6. Verify the recovery form is visible.
    const recoveryEmail = page.locator('input[type="email"], input[name*="email" i]').first();
    await expect(recoveryEmail).toBeVisible();
    // 7. Submit an invalid recovery email.
    await recoveryEmail.fill(data.auth.resetPassword.invalidEmail);
    const submit = page.getByRole('button', { name: /reset|send|submit|continue/i }).first();
    if (await submit.isVisible().catch(() => false)) await submit.click();
    // 8. Verify recovery remains controlled without account disclosure.
    await expect(page).toHaveURL(/phptravels\.net/);
    await expect(page.locator('body')).not.toContainText(/password for .* is|account exists|user found/i);
  });
});
