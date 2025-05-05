import { test, expect } from '@playwright/test';
import { title } from 'process';

//What does API stand for????
//Application Programming Interface

//Let's define CRUD
//Create - new user created - POST
//Read - reading existing data / current user account - GET
//Update - Changing something, modifying existing data - PUT
//Delete - Removing data - Deleting a user account - DELETE

//Data exchange between server and interface (client) | Integration between endpoint to endpoint | Scalability

//STATUS CODES
//200 - OK
//201 - Created
//204 - No Content
//400 - Bad Request
//401 - Unauthorized
//404 - Not Found
//500 - Internal Server Error





test('GET /posts returns a list of posts', async ({ request }) => {



    const response = await request.get('https://jsonplaceholder.typicode.com/posts/2');
    expect(response.status()).toBe(200); // I expect the status code from the response to be 200 - what does that mean? OK!

    //If the expected status code is not met, the test will fail - Does that mean toBe is a soft assertion?

    const body = await response.json();

    console.log(body);

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
});


// test('GET /invalid-url returns a 404 status code', async ({ request }) => {
//     const response = await request.get('https://jsonplaceholder.typicode.com/invalid-url');
//     expect(response.status()).toBe(404);

// });



// // [] - Array
// // {} - Object

test('POST /posts create a new post', async ({ request }) => {

    const newItemIWantToAdd =
    {
        userId: "cc01",
        id: 101,
        title: "My name is Chritiaan maybe?",
        body: "This is the book I'm writing to see whether or not I can type more nonsensical nonsense as a body hahahahahaha"
    }
    // console.log (newItemIWantToAdd.id);
    //Making the request to the url and giving it some data....
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', { data: newItemIWantToAdd });

    //Check whether or not the response is relevant to what we're doing, aka 201 for creation
    expect(response.status()).toBe(201);

    //Parsing the body the json (meaning parsing the reponses to json and declaring it to a new variable called body)
    const body = await response.json();

    console.log(body);



    //Change in comments hahahaha
    //Name: Christiaan Coetzee
    //Cellphone: 0832654355

    //FIRST LINE
    expect(body.title).toBe(newItemIWantToAdd.title);
    expect(body.body).toBe(newItemIWantToAdd.body);
    expect(body.userId).toBe(newItemIWantToAdd.userId);
    expect(body.id).toBe(newItemIWantToAdd.id);

});


test('DELETE /posts deletes a post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/2');
    //expect(response.status()).toBe(404);

    //Parsing the body the json (meaning parsing the reponses to json and declaring it to a new variable called body)

    const body = await response.json();

    console.log(`The response we got from the deletion ${body.title}`);
});

test('After I deleted, lets do a quick check to see if the system restored the original 2nd entry', async ({ request }) => {
    const responseTwo = await request.get('https://jsonplaceholder.typicode.com/2');

    const body2 = await responseTwo.json();

    console.log(`Body from the get request after deletion ${body2.title}`);
});


//Let's demo the PUT request

test.only('PUT /posts updates a post', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/1', { data: { title: 'Updated Title' } });
    //expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    //expect(body.title).toBe('Updated Title');
});



