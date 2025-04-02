//Importing means we're bringing code from another file into this one
//BasePage contains common functionality we want to reuse
import BasePage from "../BasePage.js";

//This will be a very simple homePage for DemoBlaze


//What is a class? A class is a blueprint for creating objects
// "extends" BasePage means this class inhereits all the methods and properties from the BasePage
//This lets us reuse code instead of writing the same things over and over
class SimpleHomePage extends BasePage {


    /** 
        @param {import ('@playwright/test').Page} page -- Playwright page object
    This special comment tells the editor that 'page' is a Playwright page object
    It helps with code completion and error checking
        */

    //The constructor is a special method that runs when we create a new instance of this class
    //It's like the initialization procedure
    constructor(page) {
        //'Super' calls the parent class {BasePage} constructor
        //We must call this before using 'this' in the constructor
        super(page);

        // 'this' refers to the current instance of SimpleHomePage
        // We're setting properties on this specific instance

        this.baseUrl = 'https://www.demoblaze.com/';

        //I will follow this up with CSS selectors - ways to find elements on the web page
        //They're like adresses that tell the browser which elements to interact with
        this.laptopsCategory = 'a[onClick="byCat(\'notebook\')"]';
        this.productLinks = '.card-title a';
        this.cartLink = '#cartur';
        this.addToCartButton = '.btn-success';
    }


    /**
     * Go the website home page
     * Each method should do one specific thing, as the name suggests
     * 
     */


    //'async' means this function will do something that takes time
    //It allows other code to run while waiting for the browser


    //Christiaan refers to the home page as the entry page
    async goToHomePage() {

        //'await' pauses execution until the navigation() method completes
        //Without await, the code would continue before the page finishes loading

        await this.navigate('/');
        //it hits this then

        //@Ashley, so by defautlt we have a 30 second timeout per test


        console.log("Navigate to the DemoBlaze home page");
    }

    /**
         * Clicks on laptops category
         *
         * 
         */

    async clickLaptopsCategory() {
        // this.page comes from BasePage - it's the Playwright page object
        // click() is a Playwright method that clicks on an element
        await this.page.click(this.laptopsCategory);

        // waitForTimeout is a simple way to pause execution
        // Here we wait 1 second (1000ms) for the page to update after clicking
        await this.page.waitForTimeout(1000);
        console.log('Clicked on Laptops category');
    }


    /**
  * Click on a specific product by name
  * @param {string} productName - Name of the product to click
  * The @param tag explains what the parameter is for and what type it should be
  */


    async clickProduct(productName) {

        //locator() finds elements on the page
        //all() retruns all matching elements as an array
        const products = await this.page.locator(this.productLinks).all();

        //products now have all the items


        //for... of loop - iterates over each product element we found

        for (const product of products) {
            // textContent() gets the text inside the element
            const text = await product.textContent();

            //If the text matches the product name we're looking for
            // == ===
            if (text === productName) {
                //   Click on the product name we're looking for
                await product.click();
                console.log(`Clicked on product: ${productName}`);

                //Let's define the return statement
                //return is used to return a value from a function
                //In this case, we're returning the product name  
                return;
            }
        }


        //If we get here, we didn't find the product
        //throw creates an error and stops test exection
        throw new Error(`Product "${productName}" not found`);

    }


    async goToCart() {
        await this.page.click(this.cartLink);
        console.log('Clicked on Cart link');
    }


}

export default SimpleHomePage;

