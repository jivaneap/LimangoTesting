exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.username_textfield = page.getByTestId('login-email-input');
        this.password_textfield = page.getByTestId('login-password-input');
        this.login_button = page.getByTestId('login-submit-button');

    }

    async gotoLoginPage(Login_URL) {
        await this.page.goto(Login_URL);
        await this.page.getByTestId('uc-accept-all-button').click();
        await this.page.getByRole('link', { name: 'Zaloguj się' }).click();
    }

    async login(username, password) {
        await this.username_textfield.fill(username);
        await this.password_textfield.fill(password);
        await this.page.getByTestId('login-keep-me-signed-in-checkbox').uncheck();
        await this.login_button.click();
    }
}