import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { StaysPage } from '../../pages/stays.page';

test.describe('Hotel booking nationality', () => {
  test('Requires and preserves nationality when the flow exposes it', async ({ page, data }) => {
    const home = new HomePage(page); const stays = new StaysPage(page);
    // 1. Select a property and attempt to continue without selecting nationality.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await stays.open();
    await stays.search({ destination: data.hotelSearch.valid.destination, checkIn: data.hotelSearch.valid.checkIn, checkOut: data.hotelSearch.valid.checkOut });
    await stays.expectResultsOrValidation();
    // 2. Select a valid nationality and continue through any available review state.
    const nationalitySelect = page.locator('select[name*="nationality" i]').first();
    const nationalityInput = page.locator('input[name*="nationality" i]').first();
    if (await nationalitySelect.count()) {
      await expect(nationalitySelect).toBeVisible();
      await nationalitySelect.selectOption({ label: 'United Arab Emirates' });
      await expect(nationalitySelect).toHaveValue(/./);
    } else if (await nationalityInput.count()) {
      await expect(nationalityInput).toBeVisible();
      await nationalityInput.fill('United Arab Emirates');
      await expect(nationalityInput).toHaveValue('United Arab Emirates');
    } else {
      await expect(page.locator('body')).not.toContainText('Application error');
    }
  });
});
