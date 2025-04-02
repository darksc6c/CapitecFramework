/*

What are fixtures?
Fixtures are a way to SET UP (TEARDOWN) and provide REUSABLE OBJECTS to your tests. 
Think of them as a "preparation" step that happens before your tests run.

//Starting the file here*
*/

//Fixtures are a Playwright concept that help make tests cleaner
//They provide reusable objects and setup/teardown for tests

//Import base test objects from Playwright
// 'base' is the standard Playwright test runner
import { test as base } from '@playwright/test'

import { SimpleHomePage, SimpleProductPage, SimpleCartPage } from '../pages/index.js'

//**
// Simple Fixtures for our basic demo
// Fixtures automate the creation of the page objects we need
//
//  */


// extend adds our custom fixtures to the base test object
export const test = base.extend({

    //Simple Home Page Fixture
    homePage: async ({ page }, use) => {
        const homePage = new SimpleHomePage(page);
        await use(homePage);

    },

    //Simple Product Page Fixture
    productPage: async ({ page }, use) => {
        const productPage = new SimpleProductPage(page);
        await use(productPage);
    },

    //Simple Cart Page Fixture  
    cartPage: async ({ page }, use) => {

        const cartPage = new SimpleCartPage(page);
        await use(cartPage);
    }

})

//Export the fixtures so they can be used in tests
export { expect } from '@playwright/test'


