import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class CartPage extends BasePage {
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescLabel: Locator;
  readonly checkoutButton: Locator;
  readonly cartList: Locator;
  readonly secondaryHeader: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDesc: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.cartQuantityLabel = page.getByTestId('cart-quantity-label');
    this.cartDescLabel = page.getByTestId('cart-desc-label');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartList = page.getByTestId('cart-list');
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.inventoryItemName = page.getByTestId('inventory-item-name');
    this.inventoryItemDesc = page.getByTestId('inventory-item-desc');
  }

  async openCart() {
    logger.info('CartPage: opening cart');
    await this.shoppingCartLink.click();
  }

  async proceedToCheckout() {
    logger.info('CartPage: proceeding to checkout');
    await this.checkoutButton.click();
  }
}
