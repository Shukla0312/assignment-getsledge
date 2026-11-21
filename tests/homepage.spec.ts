import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load the homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/sledge/i);
  });

  test('should display the hero section with heading and CTAs', async () => {
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.heroHeading).toContainText(/construction ai/i);
    await expect(homePage.scheduleDemoButton).toBeVisible();
    await expect(homePage.tryItNowButton).toBeVisible();
  });

  test('should have a visible sign-in link', async () => {
    await expect(homePage.signInLink).toBeVisible();
    await expect(homePage.signInLink).toHaveAttribute('href', /sign-in/);
  });

  test('should display app store download links', async () => {
    await expect(homePage.appStoreLink).toBeVisible();
    await expect(homePage.googlePlayLink).toBeVisible();
  });

  test('should have a footer with social media links', async () => {
    await expect(homePage.footer).toBeVisible();
    const socialLinks = await homePage.getSocialLinks();
    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
