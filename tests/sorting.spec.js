import { test, expect } from '../src/fixtures/testFixtures.js';
import { priceToNumber } from '../src/utils/helpers.js';
import faker from 'faker';
import { formatDate } from '../src/utils/helpers.js';
import { generateRandomString } from '../src/utils/helpers.js';
imr

test.describe('Product Sorting Tests', () => {
    test.beforeEach(async ({ page, loginPage, testData }) => {
        // Navigate to login page
        await loginPage.goto();

        // Login with standard user
        const { username, password } = testData.getTestData('loginTests').validUser;
        await loginPage.login(username, password);

        // Ensure we're on the products page
        await page.waitForURL('**/inventory.html');
    });

    test('should sort products by name (A to Z)', async ({ page, productsPage }) => {
        // Sort products A to Z (this is default, but set explicitly for clarity)
        await productsPage.sortProducts('az');

        // Get product names
        const productNames = await productsPage.getProductNames();

        // Verify products are sorted alphabetically
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);
    });

    test('should sort products by name (Z to A)', async ({ page, productsPage }) => {
        // Sort products Z to A
        await productsPage.sortProducts('za');

        // Get product names
        const productNames = await productsPage.getProductNames();

        // Verify products are sorted in reverse alphabetical order
        const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(productNames).toEqual(sortedNames);
    });

    test('should sort products by price (low to high)', async ({ page, productsPage }) => {
        // Sort products by price low to high
        await productsPage.sortProducts('lohi');

        // Get all prices
        const priceElements = await page.locator('.inventory_item_price').allTextContents();
        const prices = priceElements.map(price => priceToNumber(price));

        // Verify prices are sorted low to high
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by price (high to low)', async ({ page, productsPage }) => {
        // Sort products by price high to low
        await productsPage.sortProducts('hilo');

        // Get all prices
        const priceElements = await page.locator('.inventory_item_price').allTextContents();
        const prices = priceElements.map(price => priceToNumber(price));

        // Verify prices are sorted high to low
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });
}); 