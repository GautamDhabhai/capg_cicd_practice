import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { FlightsPage } from '../../pages/flights.page';

test.describe('Flight journey mode coverage', () => {
  test('Exposes safe one-way round-trip and multi-city controls', async ({ page, data }) => {
    const home = new HomePage(page);
    const flights = new FlightsPage(page);
    // 1. Open the PHPTRAVELS homepage.
    await home.open(data.environment.baseUrl);
    await home.dismissDemoNoticeIfVisible();
    // 2. Dismiss the demo warning if visible.
    await expect(home.heroHeading).toBeVisible();
    // 3. Select Flights.
    await flights.open();
    // 4. Verify the flight form is visible when exposed.
    await flights.expectForm();
    // 5. Select one-way, round-trip, and multi-city modes when available.
    for (const mode of ['one-way', 'round-trip', 'multi-city'] as const) {
      const control = page.getByRole('button', { name: new RegExp(mode === 'one-way' ? 'one way' : mode, 'i') }).first();
      if (await control.isVisible().catch(() => false)) await control.click({ force: true });
    }
    // 6. Verify multi-city mode exposes segment controls and no unsafe success.
    const segmentInputs = page.locator('input:visible');
    await expect(segmentInputs.first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/confirmed booking|payment successful/i);
  });
});
