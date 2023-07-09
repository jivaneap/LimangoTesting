import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { test } from '../fixtures';

dotenv.config({
    path: './.env'
});

test.describe('login tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage(`${process.env.LOGIN_PAGE_URL}`);
    });

    test('Login-Positive testing_1', async ({ loginPage }) => {
        //valid username and valid password
        await loginPage.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_VALID}`);
        await expect(loginPage.page).toHaveURL(`${process.env.HOME_PAGE_URL}`);
    });

    test('Login-Negative testing_1', async ({ loginPage }) => {
        //invalid username and valid password
        await loginPage.login(`${process.env.USERNAME_INVALID}`, `${process.env.PASSWORD_VALID}`);
        await expect(loginPage.passwordInputError).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    });

    test('Login-Negative testing_2', async ({ loginPage }) => {
        //valid username and invalid password
        await loginPage.login(`${process.env.USERNAME_VALID}`, `${process.env.PASSWORD_INVALID}`);
        await expect(loginPage.passwordInputError).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    });

    test('Login-Negative testing_3', async ({ loginPage }) => {
        //invalid username and invalid password
        await loginPage.login(`${process.env.USERNAME_INVALID}`, `${process.env.PASSWORD_INVALID}`);
        await expect(loginPage.passwordInputError).toHaveText(`${process.env.INVALID_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    });

    test('Login-Negative testing_4', async ({ loginPage }) => {
        //empty username and password textfield
        await loginPage.login('', '');
        await expect(loginPage.emailInputError).toHaveText(`${process.env.EMPTY_USERNAME_PASSWORD_ERROR_MESSAGE}`);
    });
});
