import { test, expect } from '../src/fixtures/testFixtures.js';

test.describe('End-to-End Shopping Tests', () => {
    test.beforeEach(async ({ loginPage, testData }) => {
        // Navigate to login page
        await loginPage.goto();

        // Login with standard user
        const { username, password } = testData.getTestData('loginTests').validUser;
        await loginPage.login(username, password);
    });

    test('should complete a purchase successfully', async ({
        productsPage,
        cartPage,
        checkoutPage,
        testData
    }) => {
        // Get test data
        const productName = testData.getTestData('productTests').singleProduct;
        const { firstName, lastName, postalCode } = testData.getTestData('checkoutTests').validUserInfo;

        // Add product to cart
        await productsPage.addProductToCart(productName);

        // Verify cart count is updated
        const cartCount = await productsPage.getCartCount();
        expect(cartCount).toBe(1);

        // Go to cart
        await productsPage.goToCart();

        // Verify product is in cart
        const isProductInCart = await cartPage.isProductInCart(productName);
        expect(isProductInCart).toBeTruthy();

        // Proceed to checkout
        await cartPage.checkout();

        // Verify on checkout page
        const isOnCheckoutPage = await checkoutPage.isOnCheckoutPage();
        expect(isOnCheckoutPage).toBeTruthy();

        // Fill checkout information
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        await checkoutPage.continue();

        // Verify on checkout overview page
        const isOnOverviewPage = await checkoutPage.isOnCheckoutOverviewPage();
        expect(isOnOverviewPage).toBeTruthy();

        // Complete purchase
        await checkoutPage.finishPurchase();

        // Verify on checkout complete page
        const isOnCompletePage = await checkoutPage.isOnCheckoutCompletePage();
        expect(isOnCompletePage).toBeTruthy();

        // Verify success message
        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toContain('Thank you');
    });

    test('should allow removing items from cart', async ({ productsPage, cartPage, testData }) => {
        // Get test data
        const productName = testData.getTestData('productTests').singleProduct;

        // Add product to cart
        await productsPage.addProductToCart(productName);

        // Go to cart
        await productsPage.goToCart();

        // Verify product is in cart
        let isProductInCart = await cartPage.isProductInCart(productName);
        expect(isProductInCart).toBeTruthy();

        // Remove product from cart
        await cartPage.removeProductFromCart(productName);

        // Verify cart is empty
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(0);
    });

    test('should validate checkout information', async ({
        productsPage,
        cartPage,
        checkoutPage,
        testData
    }) => {
        // Get test data
        const productName = testData.getTestData('productTests').singleProduct;
        const { firstName, lastName, postalCode } = testData.getTestData('checkoutTests').invalidUserInfo;

        // Add product to cart
        await productsPage.addProductToCart(productName);

        // Go to cart
        await productsPage.goToCart();

        // Proceed to checkout
        await cartPage.checkout();

        // Attempt to continue with empty info
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        await checkoutPage.continue();

        // Verify error message
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Error');
    });
}); 