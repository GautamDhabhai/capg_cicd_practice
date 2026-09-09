import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { ServiceFormsPage } from '../../pages/service-forms.page';

test.describe('Visa and AI validation boundaries', () => {
  test('Keeps service inputs safe and controlled', async ({ page, data }) => {
    const home = new HomePage(page);
    const services = new ServiceFormsPage(page);
    // 1. Open the PHPTRAVELS homepage.
    await home.open(data.environment.baseUrl);
    await home.dismissDemoNoticeIfVisible();
    // 2. Dismiss the demo warning if visible.
    await expect(home.heroHeading).toBeVisible();
    // 3. Select Visa.
    await services.open('Visa');
    // 4. Verify the Visa form or controlled unavailable state is visible.
    await services.expectVisibleForm();
    // 5. Select AI Trip Planner.
    await services.open('AI Trip Planner');
    // 6. Verify the planner input is visible when available.
    const input = page.getByRole('tabpanel').locator('input:visible, textarea:visible').first();
    if (!(await input.count())) {
      test.skip(true, 'The live demo currently exposes no AI input after service selection.');
      return;
    }
    await expect(input).toBeVisible();
    // 7. Fill empty, oversized, script-like, and SQL-like synthetic content.
    await input.fill(data.aiPlanner.invalid.emptyPrompt);
    await input.fill(data.aiPlanner.invalid.oversizedPrompt);
    await input.fill(data.aiPlanner.invalid.scriptPayload);
    await expect(input).toHaveValue(data.aiPlanner.invalid.scriptPayload);
    await input.fill(data.aiPlanner.invalid.sqlPayload);
    await expect(input).toHaveValue(data.aiPlanner.invalid.sqlPayload);
    // 8. Verify content remains inert and no booking or payment success is shown.
    await expect(page.locator('body')).not.toContainText(/confirmed booking|payment successful/i);
    await expect(page.locator('body')).not.toContainText('<script>');
  });
});
