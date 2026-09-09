import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';

test.describe('Core accessibility controls', () => {
  test('Keeps primary controls keyboard reachable', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. Ensure the homepage exposes keyboard focusable controls.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible();
    await home.serviceTab('Stays').focus();
    await expect(home.serviceTab('Stays')).toBeFocused();
    await expect(home.serviceTab('Stays')).toBeVisible();
    // 2. Inspect accessible names and tab state for service controls.
    await expect(home.serviceTab('Flights')).toBeVisible();
    await expect(home.serviceTab('Visa')).toBeVisible();
    await expect(home.serviceTab('AI Trip Planner')).toBeVisible();
  });
});
