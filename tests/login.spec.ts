import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/login';

dotenv.config({
  path:'./.env'
}); 


test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage(`${process.env.LOGIN_PAGE_URL}`);
});

test.describe('all login tests', () => {


    test('Login-Positive testing_1', async ({ page }) => {
        //valid username and valid password
        const Login = new LoginPage(page);
        await Login.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
        await expect (page).toHaveURL(`${process.env.HOME_PAGE_URL}`);
       
    });


    test('Login-Negative testing_1', async ({ page }) => {
        //invalid username and valid password
        const Login = new LoginPage(page);
        await Login.login(`${process.env.USERNAME_INVALID}`, `${process.env.PASSWORD_VALID}`);
        await expect(page.locator('[data-testid="login-password-input-error"]')).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);

    })


    test('Login-Negative testing_2', async ({ page }) => {
        //valid username and invalid password
        const Login = new LoginPage(page);
        await Login.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_INVALID}`);
        await expect(page.locator('[data-testid="login-password-input-error"]')).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    })

    test('Login-Negative testing_3', async ({ page }) => {
        //invalid username and invalid password
        const Login = new LoginPage(page);
        await Login.login(`${process.env.USERNAME_INVALID}`, `${process.env.PASSWORD_INVALID}`);
        await expect(page.locator('[data-testid="login-password-input-error"]')).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    })

    test('Login-Negative testing_4', async ({ page }) => {
        //empty username and password textfield
        const Login = new LoginPage(page);
        await Login.login('','');
        await expect(page.locator('[data-testid="login-email-input-error"]')).toHaveText(`${process.env.EMPTY_USERNAME_PASSWORD_ERROR_MESSAGE}`);

    })


})
