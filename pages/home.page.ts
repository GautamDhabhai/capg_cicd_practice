import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroHeading: Locator;
  readonly demoNotice: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByRole('heading', { name: 'Travel the way you love!' });
    this.demoNotice = page.getByRole('heading', { name: 'Important Notice: Demo Environment' }).locator('..');
    this.continueButton = page.getByRole('button', { name: 'I Understand & Continue' });
  }

  async open(baseUrl: string): Promise<void> { await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 45000 }); }
  async dismissDemoNoticeIfVisible(): Promise<void> {
    if (!(await this.continueButton.isVisible().catch(() => false))) return;
    await this.continueButton.click({ force: true });
    await this.continueButton.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }
  serviceTab(name: string): Locator { return this.page.getByRole('tab', { name: new RegExp(name, 'i') }); }
  async selectService(name: string): Promise<void> { await this.serviceTab(name).click({ force: true }); }
  async openMenu(name: string): Promise<void> { await this.page.getByRole('button', { name: new RegExp(name, 'i') }).first().click({ force: true }); }
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('PHPTRAVELS');
    await expect(this.heroHeading).toBeVisible();
  }
}
