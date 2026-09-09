import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';

test.describe('Currency and language controls', () => {
  test('Exposes supported locale menus and keeps homepage stable', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. Select currency and language controls from a fresh homepage.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible();
    await home.openMenu('USD');
    await expect(page.locator('body')).toContainText(new RegExp(data.environment.supportedCurrencies.join('|')));
    await page.getByRole('button', { name: /English/i }).click();
    await expect(page.locator('body')).toContainText(new RegExp(data.environment.supportedLanguages.join('|')));
    // 2. Reload and inspect the resulting locale state without mixing booking data.
    await page.reload();
    await expect(home.heroHeading).toBeVisible();
    await expect(page).toHaveURL(/^https:\/\/phptravels\.net\//);
  });
});
