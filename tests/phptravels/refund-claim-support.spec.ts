import { test, expect } from '../fixtures';

test.describe('Refund and claim support', () => {
  test('Exposes policy requirements and safe support boundary', async ({ page, data }) => {
    // 1. Open Refund Policy and File a Claim and inspect eligibility and required booking details.
    await page.goto(`${data.environment.baseUrl}page/refund-policy`);
    await expect(page.locator('body')).toContainText(/refund|supplier|booking|fare/i);
    await page.goto(`${data.environment.baseUrl}page/file-a-claim`);
    await expect(page.locator('body')).toContainText(/claim|booking|support/i);
    // 2. Submit invalid or valid support requests only with controlled synthetic booking fixtures.
    test.skip(true, 'Support request submission requires a controlled booking reference fixture.');
    await expect(page).toHaveURL(/file-a-claim/);
  });
});
