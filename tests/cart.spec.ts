import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { test } from '../fixtures';

dotenv.config({
  path: './.env'
});

test.describe.configure({ mode: 'serial' });

test.describe('cart tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage(`${process.env.LOGIN_PAGE_URL}`);
  });

  test('Add to cart', async ({ loginPage, homePage }) => {
    //user should be able to add product to cart
    await loginPage.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
    await expect(loginPage.page).toHaveURL(`${process.env.HOME_PAGE_URL}`);

    await homePage.searchProduct('perfume');
    await homePage.addToCart('Biotherm Eau Pure - EdT, 100 ml');

    await homePage.page.locator('[data-testid="minicart-icon-button"]').click();
    await expect(homePage.page.locator('//span[@class="_2pwv_"]')).toBeVisible();
  });

  test('Delete from cart', async ({ loginPage, homePage }) => {
    //user should be able to add product to cart
    await loginPage.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
    await expect(loginPage.page).toHaveURL(`${process.env.HOME_PAGE_URL}`);

    await loginPage.page.locator('[data-testid="minicart-icon-button"]').click();
    await expect(loginPage.page.locator('//span[@class="_2pwv_"]')).toBeVisible();

    await homePage.deleteFromCart();
    await expect(homePage.emptyCartTxt).toHaveText(`${process.env.EMPTY_CART}`);
  });
});