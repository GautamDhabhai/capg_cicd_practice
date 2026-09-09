import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';

test.describe('Homepage, navigation, and demo safeguards', () => {
  test('Homepage exposes primary booking entry points and demo warning', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. Open the homepage in a fresh browser context.
    await home.open(data.environment.baseUrl);
    await home.expectLoaded();
    await expect(home.serviceTab('Stays')).toBeVisible();
    await expect(home.serviceTab('Flights')).toBeVisible();
    await expect(home.serviceTab('Visa')).toBeVisible();
    await expect(home.serviceTab('AI Trip Planner')).toBeVisible();
    await expect(home.demoNotice).toContainText(/demo|sandbox|real card/i);
    // 2. Click I Understand & Continue on the demo notice.
    await home.dismissDemoNoticeIfVisible();
    await expect(home.heroHeading).toBeVisible();
    await expect(home.serviceTab('Stays')).toBeVisible();
  });

  test('Global navigation menus expose available destinations', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. From a fresh homepage, open Services, Company, currency, language, and Signup menus one at a time.
    await home.open(data.environment.baseUrl);
    await home.dismissDemoNoticeIfVisible();
    for (const menu of ['Services', 'Company', 'USD', 'English', 'Signup']) {
      await home.openMenu(menu);
      await expect(page.locator('body')).toContainText(new RegExp(menu === 'USD' ? 'USD|EUR|GBP|AED' : menu, 'i'));
      await page.keyboard.press('Escape');
    }
    // 2. Close each menu by selecting the control again or clicking outside it.
    await page.mouse.click(20, 20);
    await expect(home.heroHeading).toBeVisible();
  });
});
