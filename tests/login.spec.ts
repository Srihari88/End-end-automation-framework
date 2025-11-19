import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login tests', () => {
  test('Check and Verify the login working correctly and verify the Home page header', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login('standard_user', 'secret_sauce');
    await expect(login.primaryHeader).toBeVisible();
    await expect(login.primaryHeader).toContainText('Swag Labs');
    await expect(login.title).toBeVisible();
    await expect(login.title).toContainText('Products');
    await login.shoppingCartLink.click();
    await expect(login.shoppingCartLink).toBeVisible();
  });

  test('negative login shows error for invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    // use invalid credentials
    await login.login('invalid_user', 'invalid_pass');
    // the app shows an error message on failed login
    await expect(login.error).toBeVisible();
    await expect(login.error).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});