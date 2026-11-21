import { type Page, type Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly helpDropdown: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly jobRoleDropdown: Locator;
  readonly companyNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1').first();
    this.helpDropdown = page.locator('select').first();
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.jobRoleDropdown = page.locator('select').last();
    this.companyNameInput = page.locator('input[name="companyName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.messageTextarea = page.getByPlaceholder(/tell us more/i);
    this.sendMessageButton = page.getByRole('button', { name: /send message/i });
  }

  async goto() {
    await this.page.goto('/contact-us');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    companyName?: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.messageTextarea.fill(data.message);
    if (data.companyName) {
      await this.companyNameInput.fill(data.companyName);
    }
  }
}
