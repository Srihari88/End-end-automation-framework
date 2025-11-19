import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly primaryHeader: Locator;
  readonly title: Locator;
  readonly errorMessage: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.primaryHeader = page.getByTestId('primary-header');
    this.title = page.getByTestId('title');
    this.errorMessage = page.getByTestId('error');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async navigate() {
    logger.info('LoginPage: navigate to application');
    await this.goto('/');
  }

  async login(username: string, password: string) {
    logger.info(`LoginPage: filling username and password for user='${username}'`);
    await this.username.fill(username);
    await this.password.fill(password);
    logger.info('LoginPage: clicking login button');
    await this.loginButton.click();
  }

  get error() {
    return this.errorMessage;
  }
}
