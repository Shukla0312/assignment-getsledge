import { type Page, type Locator } from '@playwright/test';

export class PricingPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly tryForFreeButton: Locator;
  readonly contactButton: Locator;
  readonly faqSection: Locator;
  readonly featureComparisonSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1').first();
    this.tryForFreeButton = page.getByRole('link', { name: /try for free/i }).first();
    this.contactButton = page.getByRole('link', { name: /contact/i }).first();
    this.faqSection = page.getByText(/questions/i).first();
    this.featureComparisonSection = page.getByText(/compare features/i).first();
  }

  async goto() {
    await this.page.goto('/pricing');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPlanCards() {
    return this.page.locator('[class*="plan"], [class*="price"], [class*="card"]');
  }

  async getFaqItems() {
    return this.page.locator('details summary, [role="button"][aria-expanded]');
  }
}
