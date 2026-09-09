import { test, expect } from '../fixtures';

test.describe('Checkout review state', () => {
  test('Documents the controlled fixture boundary for review totals', async ({ page, data }) => {
    // 1. Reach review with a controlled available hotel or flight fixture.
    await page.goto(data.environment.baseUrl);
    await expect(page).toHaveTitle('PHPTRAVELS');
    // 2. Inspect itinerary, travelers, fees, currency, and optional extras when a fixture is provisioned.
    test.skip(true, 'Review totals and optional extras require a controlled booking fixture, not the public demo.');
    await expect(page.locator('body')).toContainText(/total|currency|traveler/i);
  });
});
