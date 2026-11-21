import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test.describe('Contact Page', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('should load the contact page', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact-us/);
    await expect(contactPage.heading).toBeVisible();
  });

  test('should display all form fields', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 800));
    await expect(contactPage.firstNameInput).toBeVisible({ timeout: 10_000 });
    await expect(contactPage.lastNameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.messageTextarea).toBeVisible();
    await expect(contactPage.sendMessageButton).toBeVisible();
  });

  test('should not submit the form with empty required fields', async ({ page }) => {
    await contactPage.sendMessageButton.click();
    await expect(page).toHaveURL(/\/contact-us/);
  });

  test('should accept valid input in form fields', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 800));
    await contactPage.firstNameInput.waitFor({ state: 'visible', timeout: 10_000 });
    await contactPage.fillForm({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.doe@example.com',
      message: 'This is a test message for QA validation.',
    });

    await expect(contactPage.firstNameInput).toHaveValue('Jane');
    await expect(contactPage.lastNameInput).toHaveValue('Smith');
    await expect(contactPage.emailInput).toHaveValue('jane.doe@example.com');
    await expect(contactPage.messageTextarea).toHaveValue(
      'This is a test message for QA validation.'
    );
  });

  test('should display alternative contact options', async ({ page }) => {
    await expect(page.getByText(/talk to sales/i).first()).toBeVisible();
    await expect(page.getByText(/get support/i).first()).toBeVisible();
    await expect(page.getByText(/partnerships/i).first()).toBeVisible();
  });
});
