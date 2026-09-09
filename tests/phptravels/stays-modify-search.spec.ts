import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { StaysPage } from '../../pages/stays.page';

test.describe('Stay search modification', () => {
  test('Refreshes criteria after a modified search', async ({ page, data }) => {
    const home = new HomePage(page); const stays = new StaysPage(page);
    // 1. Complete a valid stay search and record the initial criteria.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await stays.open();
    await stays.search({ destination: data.hotelSearch.valid.destination, checkIn: data.hotelSearch.valid.checkIn, checkOut: data.hotelSearch.valid.checkOut });
    await stays.expectResultsOrValidation();
    // 2. Change destination and dates and submit the modified search.
    await page.goBack();
    await stays.destination.fill('Paris');
    await stays.checkIn.fill('2026-12-10');
    await stays.checkOut.fill('2026-12-12');
    await stays.searchButton.click();
    await expect(page).toHaveURL(/phptravels\.net/);
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
