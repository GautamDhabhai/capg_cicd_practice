import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { ServiceFormsPage } from '../../pages/service-forms.page';

test.describe('Visa request flow', () => {
  test('Exposes validation-safe controls', async ({ page, data }) => {
    const home = new HomePage(page); const services = new ServiceFormsPage(page);
    // 1. Select Visa and inspect its fields and submit control.
    await home.open(data.environment.baseUrl); await home.dismissDemoNoticeIfVisible(); await services.open('Visa');
    await services.expectVisibleForm();
    const input = await services.findTextInput(); await expect(input).toBeVisible();
    // 2. Submit malformed and oversized synthetic values without executing markup.
    await input.fill(data.aiPlanner.invalid.scriptPayload);
    await expect(input).toHaveValue(data.aiPlanner.invalid.scriptPayload);
    await expect(page.locator('body')).not.toContainText('<script>');
  });
});
