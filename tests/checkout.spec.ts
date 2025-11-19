import { test, expect } from '@playwright/test';
import { Pages } from '../pages/pageFactory';

test.describe('Checkout tests', () => {
  test('Product Checkout End to End Flow ', async ({ page }) => {
    const pages = new Pages(page);
    const { login, inventory, cart, checkout } = pages;

  await login.navigate();
  await login.login('standard_user', 'secret_sauce');

  // basic inventory assertions
  await expect(inventory.inventoryItem.first()).toBeVisible();
  await expect(inventory.getItemNameByItemId('item-4')).toContainText('Sauce Labs Backpack');
  await expect(inventory.inventoryItemDescription.first()).toBeVisible();

  // add backpack to cart
  await inventory.addToCartByTestId('sauce-labs-backpack');
  await expect(cart.shoppingCartLink).toBeVisible();
  await expect(cart.shoppingCartBadge).toContainText('1');

  await cart.openCart();
  await expect(cart.secondaryHeader).toBeVisible();
  await expect(cart.secondaryHeader).toContainText('Your Cart');
  await expect(cart.cartQuantityLabel).toBeVisible();
  await expect(cart.cartQuantityLabel).toContainText('QTY');
  await expect(cart.cartDescLabel).toBeVisible();
  await expect(cart.cartDescLabel).toContainText('Description');

  await expect(cart.inventoryItemName).toContainText('Sauce Labs Backpack');
  await expect(cart.inventoryItemDesc).toBeVisible();

  // proceed to checkout
  await cart.proceedToCheckout();
  await expect(checkout.secondaryHeader).toBeVisible();
  await expect(checkout.secondaryHeader).toContainText('Checkout: Your Information');

  await expect(checkout.firstName).toBeVisible();
  await expect(checkout.lastName).toBeVisible();
  await expect(checkout.postalCode).toBeVisible();

  await checkout.fillCheckoutInformation('Srihari Naidu', 'Pudu', '110076');
  await expect(checkout.checkoutInfo).toBeVisible();
  await expect(checkout.continueButton).toBeVisible();
  await expect(checkout.continueButton).toContainText('Continue');

  await checkout.continue();

  await expect(checkout.title).toBeVisible();
  await expect(checkout.getItemTitleLinkById('item-4')).toBeVisible();
  await expect(cart.cartList).toBeVisible();
  await expect(checkout.paymentInfoLabel).toBeVisible();
  await expect(checkout.paymentInfoLabel).toContainText('Payment Information:');
  await expect(checkout.shippingInfoLabel).toContainText('Shipping Information:');
  await expect(checkout.totalInfoLabel).toContainText('Price Total');
  await expect(checkout.subtotalLabel).toContainText('Item total: $29.99');
  await expect(checkout.taxLabel).toContainText('Tax: $2.40');
  await expect(checkout.totalLabel).toContainText('Total: $32.39');

  await expect(checkout.finishButton).toContainText('Finish');
  await expect(checkout.cancelButton).toContainText('Cancel');

  await checkout.finish();

  await expect(checkout.secondaryHeader).toBeVisible();
  await expect(checkout.secondaryHeader).toContainText('Checkout: Complete!');
  await expect(checkout.checkoutCompleteContainer).toBeVisible();
  await expect(checkout.completeHeader).toContainText('Thank you for your order!');
  await expect(checkout.backToProducts).toBeVisible();
  await expect(checkout.backToProducts).toContainText('Back Home');

  await checkout.backToProducts.click();
  await expect(inventory.title).toBeVisible();
    await expect(inventory.secondaryHeader).toContainText(
      'ProductsName (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)'
    );
  });
});