import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';

test.describe('Checkout and authorization safety boundaries', () => {
  test('Keeps synthetic checkout data and identifiers out of public URLs', async ({ page, data }) => {
    const home = new HomePage(page);
    // 1. Open the PHPTRAVELS homepage in a fresh context.
    await home.open(data.environment.baseUrl);
    // 2. Verify the homepage loads over HTTPS.
    await expect(page).toHaveURL(/^https:\/\/phptravels\.net\//);
    await home.expectLoaded();
    // 3. Prepare synthetic Unicode traveler, boundary contact, and mismatched booking identifiers.
    const sensitiveValues = [
      data.traveler.invalid.unicodeName,
      data.boundaryValues.maxLengthEmail,
      data.support.claim.mismatchedReference,
      data.payment.cardData.valid.number.replaceAll(' ', ''),
    ];
    // 4. Verify those values are not present in the current URL.
    for (const value of sensitiveValues) await expect(page).not.toHaveURL(new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    // 5. Verify payment-card patterns and sensitive booking details are not rendered on the public homepage.
    await expect(page.locator('body')).not.toContainText(/4242[ -]?4242[ -]?4242[ -]?4242|cvv|confirmed booking/i);
    // 6. Verify the page remains a controlled public state without a false confirmation.
    await expect(page.locator('body')).not.toContainText(/payment successful|booking reference:.*PHX/i);
  });
});
