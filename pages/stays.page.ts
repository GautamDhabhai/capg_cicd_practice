import { expect, Locator, Page } from '@playwright/test';

export class StaysPage {
  readonly page: Page;
  readonly destination: Locator;
  readonly checkIn: Locator;
  readonly checkOut: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.destination = page.locator('input[name="destination"]');
    this.checkIn = page.locator('input[name="checkin_date"]');
    this.checkOut = page.locator('input[name="checkout_date"]');
    this.searchButton = page.locator('button').filter({ hasText: /Search Hotels/i }).first();
  }
  async open(): Promise<void> { await this.page.getByRole('tab', { name: /Stays/i }).click({ force: true }); }
  async setDateValue(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.evaluate((element, inputValue) => {
      const input = element as HTMLInputElement;
      input.value = inputValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }
  async search(criteria: { destination: string; checkIn: string; checkOut: string }): Promise<void> {
    await this.destination.fill(criteria.destination);
    await this.setDateValue(this.checkIn, criteria.checkIn);
    await this.setDateValue(this.checkOut, criteria.checkOut);
    await this.searchButton.click();
  }
  async expectSearchControls(): Promise<void> {
    await expect(this.searchButton).toBeVisible();
    await expect(this.checkIn).toBeVisible();
    await expect(this.checkOut).toBeVisible();
  }
  async expectResultsOrValidation(): Promise<void> {
    await expect(this.page).toHaveURL(/phptravels\.net/);
    await expect(this.page.locator('body')).not.toContainText('Application error');
  }
}
