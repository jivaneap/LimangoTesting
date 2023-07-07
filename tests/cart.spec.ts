import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/home';



dotenv.config({
  path: './.env'
});

test.describe.configure({ mode: 'serial' });

test.describe('all login tests', () => {


  test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage(`${process.env.LOGIN_PAGE_URL}`);
  });


  test('Add to cart', async ({ page }) => {
    //user should be able to add product to cart

    const Login = new LoginPage(page)
    await Login.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
    await expect(page).toHaveURL(`${process.env.HOME_PAGE_URL}`);

    const Home = new HomePage(page);
    await Home.searchProduct('perfume');
    await Home.addToCart('Biotherm Eau Pure - EdT, 100 ml');

    await page.locator('[data-testid="minicart-icon-button"]').click();
    await expect(page.locator('//span[@class="_2pwv_"]')).toBeVisible();
  });

  test('Delete from cart', async ({ page }) => {
    //user should be able to add product to cart

    const Login = new LoginPage(page)
    await Login.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
    await expect(page).toHaveURL(`${process.env.HOME_PAGE_URL}`);

    const Home = new HomePage(page);
    await page.locator('[data-testid="minicart-icon-button"]').click();
    await expect(page.locator('//span[@class="_2pwv_"]')).toBeVisible();

    await Home.deleteFromCart();
    await expect(Home.emptyCartTxt).toHaveText(`${process.env.EMPTY_CART}`);
  });

});