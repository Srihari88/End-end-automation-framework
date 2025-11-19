import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class InventoryPage extends BasePage {
  readonly productSortContainer: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItemPrice: Locator;
  readonly inventoryItem: Locator;
  readonly secondaryHeader: Locator;
  readonly inventoryItemDescription: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.productSortContainer = page.getByTestId('product-sort-container');
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.inventoryList = page.getByTestId('inventory-list');
    this.inventoryItemPrice = page.getByTestId('inventory-item-price');
    this.inventoryItem = page.getByTestId('inventory-item');
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.inventoryItemDescription = page.getByTestId('inventory-item-description');
    this.title = page.getByTestId('title');
  }

  async selectSort(optionValue: string) {
    logger.info(`InventoryPage: selecting sort option '${optionValue}'`);
    await this.productSortContainer.selectOption(optionValue);
  }

  async clickItemPriceByText(text: string) {
    logger.info(`InventoryPage: clicking item by price text '${text}'`);
    await this.page.getByText(text).click();
  }

  async addToCartByTestId(testId: string) {
    logger.info(`InventoryPage: adding item to cart by testId 'add-to-cart-${testId}'`);
    await this.page.getByTestId(`add-to-cart-${testId}`).click();
  }

  getItemNameByItemId(itemId: string) {
    return this.page.getByTestId(`${itemId}-title-link`).getByTestId('inventory-item-name');
  }

  getItemTitleLinkById(itemId: string) {
    return this.page.getByTestId(`${itemId}-title-link`);
  }

  async getAllPrices(): Promise<number[]> {
    logger.info('InventoryPage: reading all prices from inventory');
    const texts = await this.inventoryItemPrice.allTextContents();
    return texts
      .map(t => t.replace(/[^0-9.]/g, ''))
      .filter(s => s.length > 0)
      .map(s => parseFloat(s));
  }
}
