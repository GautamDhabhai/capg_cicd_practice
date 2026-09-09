import { test, expect } from '../fixtures';

test.describe('Stale booking revalidation', () => {
  test('Documents changed-price and unavailable-inventory fixture coverage', async ({ page, data }) => {
    // 1. Hold a selected result, change supplier availability or price, and continue toward payment.
    await page.goto(data.environment.baseUrl);
    await expect(page).toHaveTitle('PHPTRAVELS');
    // 2. Review the changed summary before accepting the revalidated result.
    test.skip(true, 'Stale availability and price changes require a controlled supplier fixture.');
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
