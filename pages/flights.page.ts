import { expect, Locator, Page } from '@playwright/test';

export class FlightsPage {
  readonly page: Page;
  readonly departureDate: Locator;
  readonly returnDate: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.departureDate = page.locator('#flights_departure_date');
    this.returnDate = page.locator('#flights_return_date');
    this.searchButton = page.locator('button').filter({ hasText: /Search Flights/i }).first();
  }
  async open(): Promise<void> { await this.page.getByRole('tab', { name: /Flights/i }).click({ force: true }); }
  async chooseTripType(type: 'one-way' | 'round-trip' | 'multi-city'): Promise<void> {
    const label = type === 'one-way' ? 'One Way' : type === 'round-trip' ? 'Round Trip' : 'Multi-City';
    await this.page.getByRole('button', { name: new RegExp(label, 'i') }).click({ force: true });
  }
  async setDateValue(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.evaluate((element, inputValue) => {
      const input = element as HTMLInputElement;
      input.value = inputValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }
  async search(departureDate: string, returnDate?: string): Promise<void> {
    await this.setDateValue(this.departureDate, departureDate);
    if (returnDate) await this.setDateValue(this.returnDate, returnDate);
    await this.searchButton.click();
  }
  async expectForm(): Promise<void> {
    await expect(this.searchButton).toBeVisible();
    await expect(this.departureDate).toBeVisible();
  }
}
