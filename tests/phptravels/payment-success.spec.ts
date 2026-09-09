import { test, expect } from '../fixtures';

test.describe('Sandbox payment success', () => {
  test('Documents confirmation consistency fixture coverage', async ({ page, data }) => {
    // 1. Submit a controlled sandbox-success checkout with synthetic traveler data.
    await page.goto(data.environment.baseUrl);
    await expect(page).toHaveTitle('PHPTRAVELS');
    // 2. Compare confirmation reference, itinerary, travelers, dates, total, and currency with review.
    test.skip(true, 'Sandbox payment success requires a controlled payment fixture.');
    await expect(page.locator('body')).not.toContainText(/real card|payment card number/i);
  });
});
