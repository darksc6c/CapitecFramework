/**
 * Base page class that provides common functionality for all page objects
 */
class BasePage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
    }

    /**
     * Navigate to a specific URL
     * @param {string} path - The path to navigate to (will be appended to baseUrl)
     */
    async navigate(path = '') {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    /**
     * Wait for a specified amount of time
     * @param {number} ms - Time to wait in milliseconds
     */
    async wait(ms) {
        await this.page.waitForTimeout(ms);
    }

    /**
     * Get a page title
     * @returns {Promise<string>} - The page title
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Check if an element is visible
     * @param {string} selector - The selector for the element to check
     * @returns {Promise<boolean>} - True if the element is visible
     */
    async isVisible(selector) {
        const element = this.page.locator(selector);
        return await element.isVisible();
    }

    /**
     * Take a screenshot
     * @param {string} name - Name of the screenshot
     */
    async takeScreenshot(name) {
        await this.page.screenshot({ path: `./screenshots/${name}.png` });
    }
}

export default BasePage; 