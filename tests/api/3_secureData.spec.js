import { test, expect } from '@playwright/test';




test('GET /secure-data requires valid token', async ({ request }) => {
    // This test demonstrates authentication using the Auth header
    // We'll test three scenarios: no token, invalid token, valid token

    //Test 1: No Authentication 
    let response = await request.get('http://localhost:3000/secure-data');

    //We expect a 401 unauthorized token
    expect(response.status()).toBe(401);

    //Test 2: Invalid Auth token
    let response2 = await request.get('http://localhost:3000/secure-data', { headers: { 'Authorization': 'Bearer wrong-token' } });

    //We expect a 403 forbidden response (we authenticated it but don't have access)
    expect(response2.status()).toBe(403);

    //Test 3: Valid Auth token
    let response3 = await request.get('http://localhost:3000/secure-data', { headers: { 'Authorization': 'Bearer my-secret-token' } });

    expect(response3.status()).toBe(200);



});