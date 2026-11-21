import { test, expect } from '@playwright/test';
import { PricingPage } from '../pages/PricingPage';

test.describe('Pricing Page', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page }) => {
    pricingPage = new PricingPage(page);
    await pricingPage.goto();
  });

  test('should load the pricing page with a heading', async ({ page }) => {
    await expect(page).toHaveURL(/\/pricing/);
    await expect(pricingPage.heading).toBeVisible();
  });

  test('should display pricing plan tiers', async ({ page }) => {
    await expect(page.getByText(/open beta/i).first()).toBeVisible();
    await expect(page.getByText(/enterprise/i).first()).toBeVisible();
  });

  test('"Try for free" button should link to sign-up', async () => {
    await expect(pricingPage.tryForFreeButton).toBeVisible();
    await expect(pricingPage.tryForFreeButton).toHaveAttribute('href', /sign-up/);
  });

  test('should have a FAQ section', async ({ page }) => {
    await expect(pricingPage.faqSection).toBeVisible();
    await expect(page.getByText(/how does usage work/i).first()).toBeVisible();
  });

  test('should display feature comparison section', async () => {
    await expect(pricingPage.featureComparisonSection).toBeVisible();
  });

  test('Enterprise "Contact" button should link to contact page', async ({ page }) => {
    const contactLink = page.getByRole('link', { name: /contact/i }).first();
    await expect(contactLink).toHaveAttribute('href', /contact/);
  });
});
