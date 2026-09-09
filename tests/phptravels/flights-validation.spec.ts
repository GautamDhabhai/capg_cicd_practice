import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { FlightsPage } from '../../pages/flights.page';

test.describe('Flight search validation', () => {
  test('Handles invalid route and journey boundaries', async ({ page, data }) => {
    const home = new HomePage(page); const flights = new FlightsPage(page);
    // 1. Submit a flight search with missing route and invalid date combinations.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await flights.open();
    await flights.expectForm(); await flights.chooseTripType('round-trip');
    await flights.search(data.flightSearch.invalid.pastDate, data.flightSearch.invalid.returnBeforeDeparture);
    // 2. Switch modes and confirm irrelevant fields are handled correctly.
    await expect(page).toHaveURL(/phptravels\.net/);
    await flights.chooseTripType('one-way'); await expect(flights.returnDate).toBeHidden();
    await flights.chooseTripType('round-trip'); await expect(flights.returnDate).toBeVisible();
    await flights.chooseTripType('multi-city');
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
