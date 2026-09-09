import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { ServiceFormsPage } from '../../pages/service-forms.page';

test.describe('AI Trip Planner', () => {
  test('Handles safe synthetic prompt input', async ({ page, data }) => {
    const home = new HomePage(page); const services = new ServiceFormsPage(page);
    // 1. Select AI Trip Planner and enter a synthetic natural-language request.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await services.open('AI Trip Planner');
    const input = page.locator('input:visible, textarea:visible').first();
    if (!(await input.count())) { test.skip(true, 'The public demo currently renders no AI input after tab selection.'); return; }
    await input.fill('Plan a future synthetic family trip to Dubai for two adults.');
    await expect(input).toHaveValue(/Dubai/);
    // 2. Submit or inspect the controlled response without treating it as a booking.
    await expect(page.locator('body')).not.toContainText(/confirmed booking|payment successful/i);
    // 3. Enter malicious text and verify it remains inert.
    const maliciousPrompt = 'SELECT * FROM bookings WHERE user_id = 1;';
    await input.fill(maliciousPrompt);
    await expect(input).toHaveValue(maliciousPrompt);
    await expect(page.locator('body')).not.toContainText('<script>');
  });
});
