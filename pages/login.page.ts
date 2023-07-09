export class LoginPage {
    public page: any;
    public username_textfield: any;
    public password_textfield: any;
    public login_button: any;
    public passwordInputError: any;
    public emailInputError: any;

    constructor(page:any) {

        this.page = page
        this.username_textfield = page.getByTestId('login-email-input');
        this.password_textfield = page.getByTestId('login-password-input');
        this.login_button = page.getByTestId('login-submit-button');
        this.passwordInputError = page.locator('[data-testid="login-password-input-error"]');
        this.emailInputError = page.locator('[data-testid="login-email-input-error"]');

    }

    async gotoLoginPage(Login_URL: String) {
        await this.page.goto(Login_URL);
        await this.page.getByTestId('uc-accept-all-button').click();
        await this.page.getByRole('link', { name: 'Zaloguj się' }).click();
    }

    async login(username: String, password: String) {
        await this.username_textfield.fill(username);
        await this.password_textfield.fill(password);
        await this.page.getByTestId('login-keep-me-signed-in-checkbox').uncheck();
        await this.login_button.click();
    }
}