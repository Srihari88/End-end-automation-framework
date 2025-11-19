import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Inventory tests', () => {
  test('Check and Verify soring is working when applying the filters', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  await login.navigate();
  await login.login('standard_user', 'secret_sauce');
  await expect(inventory.productSortContainer).toBeVisible();

  // select low to high
  await inventory.selectSort('lohi');
  await expect(inventory.inventoryContainer).toBeVisible();
  await expect(inventory.inventoryContainer).toBeVisible();

  // validate the prices are sorted ascending
  const pricesAsc = await inventory.getAllPrices();
  const sortedAsc = [...pricesAsc].sort((a, b) => a - b);
  await expect(pricesAsc).toEqual(sortedAsc);

  // interact with an item
  await inventory.clickItemPriceByText('$9.99');
  await expect(inventory.inventoryList).toContainText('$9.99');
  await expect(inventory.inventoryList).toContainText('$15.99');
  await expect(inventory.inventoryList).toContainText('$49.99');

  // switch to high to low and validate descending order
  await inventory.selectSort('hilo');
  const pricesDesc = await inventory.getAllPrices();
  const sortedDesc = [...pricesDesc].sort((a, b) => b - a);
  await expect(pricesDesc).toEqual(sortedDesc);

  await expect(inventory.secondaryHeader).toContainText(
    'Price (high to low)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)'
  );
  });
});