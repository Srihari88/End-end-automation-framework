import { Page } from '@playwright/test';
import { logger } from '../utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async goto(path: string) {
    logger.info(`Navigating to ${path}`);
    await this.page.goto(path);
  }
}
