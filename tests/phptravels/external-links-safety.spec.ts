import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';

test.describe('External support and app links', () => {
  test('Uses safe destinations without booking data', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. Inspect email, WhatsApp, phone, social, IATA, and app-store links.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible();
    const externalLinks = page.locator('a[href]');
    const hrefs = await externalLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href') || ''));
    // 2. Verify external destinations use expected schemes and do not contain sensitive booking data.
    expect(hrefs.some((href) => href.startsWith('mailto:'))).toBeTruthy();
    expect(hrefs.some((href) => href.startsWith('tel:'))).toBeTruthy();
    expect(hrefs.some((href) => href.includes('wa.me'))).toBeTruthy();
    expect(hrefs.some((href) => href.includes('apps.apple.com') || href.includes('play.google.com'))).toBeTruthy();
    expect(hrefs.every((href) => !/4242|cvv|password|bookingReference/i.test(href))).toBeTruthy();
  });
});
