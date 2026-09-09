import { test, expect } from '../fixtures';

test.describe('Resilience states', () => {
  test('Keeps deep links and empty states controlled', async ({ page, data }) => {
    // 1. Open a deep route and inspect loading, empty, error, or re-authentication behavior.
    await page.goto(`${data.environment.baseUrl}stay/does-not-exist`);
    await expect(page).toHaveURL(/phptravels\.net/);
    // 2. Refresh and revisit the route without allowing stale or partial content to appear bookable.
    await page.reload();
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText(/pay with real card/i);
  });
});
