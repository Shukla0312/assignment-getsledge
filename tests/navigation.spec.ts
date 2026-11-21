import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Navigation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display all primary navigation items', async () => {
    await expect(homePage.navProduct).toBeVisible();
    await expect(homePage.navIndustries).toBeVisible();
    await expect(homePage.navPricing).toBeVisible();
    await expect(homePage.navCompany).toBeVisible();
    await expect(homePage.navResources).toBeVisible();
  });

  test('should navigate to the Pricing page', async ({ page }) => {
    await homePage.navPricing.click();
    await expect(page).toHaveURL(/\/pricing/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should navigate to Sign In page', async ({ page }) => {
    await homePage.signInLink.click();
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('"Schedule demo" CTA should be visible in header', async () => {
    await expect(homePage.scheduleDemoButton).toBeVisible();
  });

  test('should have correct href on logo linking to homepage', async () => {
    await expect(homePage.logo).toHaveAttribute('href', '/');
  });

  test('footer links should not have broken hrefs', async () => {
    const footerLinks = await homePage.getFooterLinks();
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 10); i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });
});
