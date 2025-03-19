import BasePage from './BasePage.js';

/**
 * Checkout page object for SauceDemo website
 */
class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Page selectors
        this.checkoutTitle = '.title';
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueButton = '#continue';
        this.cancelButton = '#cancel';
        this.errorMessage = '[data-test="error"]';

        // Checkout Overview selectors
        this.summaryInfoContainer = '.summary_info';
        this.finishButton = '#finish';

        // Checkout Complete selectors
        this.completeHeader = '.complete-header';
        this.backHomeButton = '#back-to-products';
    }

    /**
     * Check if user is on checkout page
     * @returns {Promise<boolean>} - True if on checkout page
     */
    async isOnCheckoutPage() {
        const title = await this.page.locator(this.checkoutTitle).textContent();
        return title === 'Checkout: Your Information';
    }

    /**
     * Fill in the checkout information
     * @param {string} firstName - First name
     * @param {string} lastName - Last name
     * @param {string} postalCode - Postal code
     */
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
    }

    /**
     * Continue to the next step in checkout
     */
    async continue() {
        await this.page.click(this.continueButton);
    }

    /**
     * Cancel the checkout and return to cart
     */
    async cancel() {
        await this.page.click(this.cancelButton);
    }

    /**
     * Get error message if present
     * @returns {Promise<string>} - Error message text
     */
    async getErrorMessage() {
        if (await this.isVisible(this.errorMessage)) {
            const text = await this.page.locator(this.errorMessage).textContent();
            return text || '';
        }
        return '';
    }

    /**
     * Check if user is on checkout overview page
     * @returns {Promise<boolean>} - True if on checkout overview page
     */
    async isOnCheckoutOverviewPage() {
        const title = await this.page.locator(this.checkoutTitle).textContent();
        return title === 'Checkout: Overview';
    }

    /**
     * Complete the purchase
     */
    async finishPurchase() {
        await this.page.click(this.finishButton);
    }

    /**
     * Check if user is on checkout complete page
     * @returns {Promise<boolean>} - True if on checkout complete page
     */
    async isOnCheckoutCompletePage() {
        const title = await this.page.locator(this.checkoutTitle).textContent();
        return title === 'Checkout: Complete!';
    }

    /**
     * Get the complete header message
     * @returns {Promise<string>} - Complete header message
     */
    async getCompleteMessage() {
        const text = await this.page.locator(this.completeHeader).textContent();
        return text || '';
    }

    /**
     * Go back to the products page after completing checkout
     */
    async backToProducts() {
        await this.page.click(this.backHomeButton);
    }
}

export default CheckoutPage; 