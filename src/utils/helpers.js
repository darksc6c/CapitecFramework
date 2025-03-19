/**
 * Generate a random string of specified length
 * @param {number} length - Length of the string to generate
 * @returns {string} - Random string
 */
export function generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

/**
 * Generate a random email address
 * @returns {string} - Random email address
 */
export function generateRandomEmail() {
    const username = generateRandomString(8);
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    return `${username}@${randomDomain}`;
}

/**
 * Format a date in the specified format
 * @param {Date} date - Date to format
 * @param {string} format - Format string
 * @returns {string} - Formatted date string
 */
export function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * Wait for a specified amount of time
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>} - Promise that resolves after the specified time
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a timestamp string
 * @returns {string} - Timestamp string
 */
export function getTimestamp() {
    return formatDate(new Date(), 'YYYY-MM-DD_HH-mm-ss');
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - Value to check
 * @returns {boolean} - True if the value is empty
 */
export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true;
    }

    return false;
}

/**
 * Convert a price string to a number
 * @param {string} priceString - Price string (e.g. "$29.99")
 * @returns {number} - Price as a number
 */
export function priceToNumber(priceString) {
    if (!priceString) return 0;

    // Remove currency symbol and any other non-numeric characters except decimal point
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString);
} 