import BasePage from './BasePage.js';

/**
 * Login page object for SauceDemo website
 */
class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Page selectors
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    /**
     * Navigate to the login page
     */
    async goto() {
        await this.navigate('/');
    }

    /**
     * Login with the specified credentials
     * @param {string} username - Username to login with
     * @param {string} password - Password to login with
     */
    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    /**
     * Get the error message text if present
     * @returns {Promise<string>} - The error message text
     */
    async getErrorMessage() {
        if (await this.isVisible(this.errorMessage)) {
            const text = await this.page.locator(this.errorMessage).textContent();
            return text || '';
        }
        return '';
    }


    /**
     * Check if user is on login page
     * @returns {Promise<boolean>} - True if on login page
     */
    async isOnLoginPage() {
        return await this.isVisible(this.loginButton);
    }
}

export default LoginPage; 