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


        console.log("Navigate to the DemoBlaze home page");
    }

    /**
         * Clicks on laptops category
         *
         * 
         */

    async clicksLaptopsCategory() {
        //this.page comes from BasePage - It's the playwright page object
        //click() is a playwright method that clicks on an element

        await this.page.click(this.laptopsCategory)

        await this.page.waitForTimeout(1000);

        console.log('Clicked on Laptops category');


    }

    async goToCart() {
        await this.page.click(this.cartur);
    }



}

