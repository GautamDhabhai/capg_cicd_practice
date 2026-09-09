import { test, expect } from '../fixtures';

test.describe('Customer login success', () => {
  test('Documents authenticated account fixture coverage', async ({ page, data }) => {
    // 1. Sign in with a controlled valid customer account and inspect the account area.
    await page.goto(`${data.environment.baseUrl}login`);
    await expect(page).toHaveTitle(/login/i);
    // 2. Log out and revisit the protected page with browser back navigation.
    test.skip(true, 'A valid demo customer account is not provisioned in the public test environment.');
    await expect(page).not.toHaveURL(/email=|password=/i);
  });
});
