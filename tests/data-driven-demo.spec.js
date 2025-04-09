import { test, expect } from '../src/fixtures/testFixtures';
import productData from '../src/data/products.js';



for (const laptop of productData.laptops) {
    test(`Shopping flow with ${laptop.name}`, async ({ homePage, productPage, cartPage, page }) => {

        //Step 1: Go to the home page
        await homePage.goToHomePage();

        //Step 2: Click on Laptops Category
        await homePage.clickLaptopsCategory();
        await page.waitForTimeout(2000);

        //Step 3
        await homePage.clickProduct(laptop.name);
        await page.waitForTimeout(2000);

        //Verify we're on the right page
        const title = await productPage.getProductTitle();
        expect(title).toContain(laptop.name);

        console.log(laptop);

        //Step 4: Add to the cart
        await productPage.addToCart();
        await page.waitForTimeout(2000);

        //Step 5: Go to cart
        await homePage.goToCart();
        await page.waitForTimeout(10000);

        //Step 7: Verify product is in cart
        //We check if our product is in the cart
        const isInCart = await cartPage.hasProduct(laptop.name);
        await page.waitForTimeout(1000);
        expect(isInCart).toBeTruthy();

    });
}



