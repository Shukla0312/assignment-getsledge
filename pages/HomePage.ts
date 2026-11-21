import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly heroHeading: Locator;
  readonly tryItNowButton: Locator;
  readonly scheduleDemoButton: Locator;
  readonly signInLink: Locator;
  readonly navProduct: Locator;
  readonly navIndustries: Locator;
  readonly navPricing: Locator;
  readonly navCompany: Locator;
  readonly navResources: Locator;
  readonly appStoreLink: Locator;
  readonly googlePlayLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('header a[href="/"]').first();
    this.heroHeading = page.locator('h1').first();
    this.tryItNowButton = page.getByText('Try it now').first();
    this.scheduleDemoButton = page.getByRole('button', { name: /schedule demo/i }).or(
      page.getByRole('link', { name: /schedule demo/i })
    ).first();
    this.signInLink = page.getByRole('link', { name: /sign in/i }).first();
    this.navProduct = page.getByRole('button', { name: 'Product' }).first();
    this.navIndustries = page.getByRole('button', { name: 'Industries' }).first();
    this.navPricing = page.getByRole('link', { name: 'Pricing' }).first();
    this.navCompany = page.getByRole('button', { name: 'Company' }).first();
    this.navResources = page.getByRole('button', { name: 'Resources' }).first();
    this.appStoreLink = page.locator('a[href*="apps.apple.com"]').first();
    this.googlePlayLink = page.locator('a[href*="play.google.com"]').first();
    this.footer = page.locator('footer');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getFooterLinks() {
    return this.footer.locator('a[href]');
  }

  async getSocialLinks() {
    const selectors = [
      'a[href*="linkedin.com"]',
      'a[href*="youtube.com"]',
      'a[href*="instagram.com"]',
      'a[href*="x.com"], a[href*="twitter.com"]',
      'a[href*="facebook.com"]',
    ];
    return this.footer.locator(selectors.join(', '));
  }
}
