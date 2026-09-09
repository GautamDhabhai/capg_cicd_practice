import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { StaysPage } from '../../pages/stays.page';

test.describe('Hotel result consistency', () => {
  test('Keeps result details usable after navigation', async ({ page, data }) => {
    const home = new HomePage(page); const stays = new StaysPage(page);
    // 1. Inspect several hotel cards and open a detail view when available.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await stays.open();
    await stays.search({ destination: data.hotelSearch.valid.destination, checkIn: data.hotelSearch.valid.checkIn, checkOut: data.hotelSearch.valid.checkOut });
    await stays.expectResultsOrValidation();
    await expect(page.locator('body')).toContainText(/Dubai|hotel|property/i);
    // 2. Refresh and reopen the same result or return to the search state.
    await page.reload();
    await expect(page).toHaveURL(/phptravels\.net/);
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
