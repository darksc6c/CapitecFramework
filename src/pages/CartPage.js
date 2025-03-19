import BasePage from './BasePage.js';

/**
 * Cart page object for SauceDemo website
 */
class CartPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Page selectors
        this.cartTitle = '.title';
        this.cartItems = '.cart_item';
        this.cartItemName = '.inventory_item_name';
        this.cartItemPrice = '.inventory_item_price';
        this.removeButton = 'button.cart_button';
        this.checkoutButton = '#checkout';
        this.continueShoppingButton = '#continue-shopping';
    }

    /**
     * Check if user is on cart page
     * @returns {Promise<boolean>} - True if on cart page
     */
    async isOnCartPage() {
        const title = await this.page.locator(this.cartTitle).textContent();
        return title === 'Your Cart';
    }

    /**
     * Get the number of items in the cart
     * @returns {Promise<number>} - Number of items in the cart
     */
    async getCartItemCount() {
        return await this.page.locator(this.cartItems).count();
    }

    /**
     * Get all product names in the cart
     * @returns {Promise<string[]>} - List of product names in the cart
     */
    async getCartItemNames() {
        const items = await this.page.locator(this.cartItemName).allTextContents();
        return items;
    }

    /**
     * Check if a product is in the cart
     * @param {string} productName - Name of the product to check
     * @returns {Promise<boolean>} - True if the product is in the cart
     */
    async isProductInCart(productName) {
        const items = await this.getCartItemNames();
        return items.includes(productName);
    }

    /**
     * Remove a product from the cart by its name
     * @param {string} productName - Name of the product to remove
     */
    async removeProductFromCart(productName) {
        // Find the product container with the specified name
        const productLocator = this.page.locator(this.cartItems)
            .filter({ hasText: productName });

        // Click the Remove button within that product container
        await productLocator.locator(this.removeButton).click();
    }

    /**
     * Proceed to checkout
     */
    async checkout() {
        await this.page.click(this.checkoutButton);
    }

    /**
     * Continue shopping
     */
    async continueShopping() {
        await this.page.click(this.continueShoppingButton);
    }
}

export default CartPage; 