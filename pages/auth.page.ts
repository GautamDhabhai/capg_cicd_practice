import { expect, Locator, Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('input[type="email"], input[name*="email" i]').first();
    this.password = page.locator('input[type="password"], input[name*="password" i]').first();
    this.submit = page.getByRole('button', { name: /login|sign in/i }).first();
  }
  async open(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}login`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const dismissButton = this.page.getByRole('button', { name: 'I Understand & Continue' });
    if (await dismissButton.isVisible().catch(() => false)) await dismissButton.click({ force: true });
  }
  async submitCredentials(email: string, password: string): Promise<void> {
    await this.email.fill(email); await this.password.fill(password); await this.submit.click();
  }
  async expectForm(): Promise<void> { await expect(this.email).toBeVisible(); await expect(this.password).toBeVisible(); }
}
