import BasePage from './BasePage.js';

/**
 * Products page object for SauceDemo website
 */
class ProductsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Page selectors
        this.productsTitle = '.title';
        this.inventoryItem = '.inventory_item';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
        this.addToCartButton = 'button.btn_inventory';
        this.shoppingCartBadge = '.shopping_cart_badge';
        this.shoppingCartLink = '.shopping_cart_link';
        this.sortDropdown = 'select.product_sort_container';
    }

    /**
     * Check if user is on products page
     * @returns {Promise<boolean>} - True if on products page
     */
    async isOnProductsPage() {
        const title = await this.page.locator(this.productsTitle).textContent();
        return title === 'Products';
    }

    /**
     * Get the number of products displayed on the page
     * @returns {Promise<number>} - Number of products
     */
    async getProductCount() {
        return await this.page.locator(this.inventoryItem).count();
    }

    /**
     * Get all product names
     * @returns {Promise<string[]>} - List of product names
     */
    async getProductNames() {
        const products = await this.page.locator(this.itemName).allTextContents();
        return products;
    }

    /**
     * Add a product to cart by its name
     * @param {string} productName - Name of the product to add to cart
     */
    async addProductToCart(productName) {
        // Find the product container with the specified name
        const productLocator = this.page.locator(this.inventoryItem)
            .filter({ hasText: productName });

        // Click the Add to Cart button within that product container
        await productLocator.locator(this.addToCartButton).click();
    }

    /**
     * Get the number of items in the cart
     * @returns {Promise<number>} - Number of items in the cart
     */
    async getCartCount() {
        if (await this.isVisible(this.shoppingCartBadge)) {
            const count = await this.page.locator(this.shoppingCartBadge).textContent();
            return parseInt(count || '0', 10);
        }
        return 0;
    }

    /**
     * Navigate to the shopping cart
     */
    async goToCart() {
        await this.page.click(this.shoppingCartLink);
    }

    /**
     * Sort products by the provided option
     * @param {string} option - Sort option ('az', 'za', 'lohi', 'hilo')
     */
    async sortProducts(option) {
        await this.page.waitForSelector(this.sortDropdown, { timeout: 5000 });
        await this.page.selectOption(this.sortDropdown, option);
    }
}

export default ProductsPage; 