import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { FlightsPage } from '../../pages/flights.page';

test.describe('Valid flight search', () => {
  test('Accepts route and future dates', async ({ page, data }) => {
    const home = new HomePage(page); const flights = new FlightsPage(page);
    // 1. Select Flights, choose a supported journey type, enter future dates, and submit Search Flights.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await flights.open();
    await flights.expectForm(); await flights.chooseTripType('round-trip');
    await flights.search(data.flightSearch.valid.departureDate, data.flightSearch.valid.returnDate);
    // 2. Review the results or controlled no-results state.
    await expect(page).toHaveURL(/phptravels\.net/);
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
