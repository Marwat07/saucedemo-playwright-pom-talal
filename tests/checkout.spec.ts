import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should allow a user to place an order successfully', async ({ page }) => {
    // Add a product to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to the cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Verify the product is in the cart
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    // Proceed to checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // Fill out checkout information
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Continue to the next step
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Finish the order
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    // Verify the order confirmation message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});