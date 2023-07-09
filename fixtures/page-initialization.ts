import { test as base } from '@playwright/test';
import { HomePage } from '../pages';
import { LoginPage } from '../pages/login.page';

interface Pages {
    loginPage: LoginPage;
    homePage: HomePage;
}

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
});