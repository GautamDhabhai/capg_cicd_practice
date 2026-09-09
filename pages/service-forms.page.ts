import { expect, Locator, Page } from '@playwright/test';
export class ServiceFormsPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async open(service: 'Visa' | 'AI Trip Planner'): Promise<void> {
    await this.page.getByRole('tab', { name: new RegExp(service, 'i') }).click();
  }
  async expectVisibleForm(): Promise<void> { await expect(this.page.getByRole('tabpanel')).toBeVisible(); }
  async findTextInput(): Promise<Locator> {
    const input = this.page.getByRole('tabpanel').locator('input:visible, textarea:visible').first();
    await expect(input).toBeVisible();
    return input;
  }
}
