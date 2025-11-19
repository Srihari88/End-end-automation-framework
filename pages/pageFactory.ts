import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { InventoryPage } from './inventory.page';
import { CartPage } from './cart.page';
import { CheckoutPage } from './checkout.page';

export class Pages {
  readonly login: LoginPage;
  readonly inventory: InventoryPage;
  readonly cart: CartPage;
  readonly checkout: CheckoutPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.inventory = new InventoryPage(page);
    this.cart = new CartPage(page);
    this.checkout = new CheckoutPage(page);
    console.log(new Date().toISOString() + ' [INFO] Pages factory initialized');
  }
}
