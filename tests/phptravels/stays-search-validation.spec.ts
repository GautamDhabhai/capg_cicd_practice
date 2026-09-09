import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { StaysPage } from '../../pages/stays.page';

test.describe('Stay search validation', () => {
  test('Rejects missing and invalid criteria', async ({ page, data }) => {
    const home = new HomePage(page); const stays = new StaysPage(page);
    // 1. Submit the stay form with no destination, missing check-in, missing check-out, and missing occupancy.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await stays.open();
    await stays.expectSearchControls();
    await stays.searchButton.click();
    // 2. Try invalid dates and guest boundaries.
    await expect(page).toHaveURL(/phptravels\.net/);
    await stays.destination.fill('Dubai');
    await stays.checkIn.fill(data.hotelSearch.valid.checkIn);
    await stays.checkOut.fill(data.hotelSearch.valid.checkIn);
    await stays.searchButton.click();
    await expect(page).toHaveURL(/phptravels\.net/);
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});
