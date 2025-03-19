import fs from 'fs';
import path from 'path';

/**
 * Test Data Manager class for handling test data
 */
class TestDataManager {
    /**
     * Constructor for TestDataManager
     * @param {string} dataFilePath - Path to the data file
     */
    constructor(dataFilePath) {
        this.dataFilePath = dataFilePath;
        this.data = null;
    }

    /**
     * Load data from a JSON file
     * @returns {object} - The loaded data
     */
    loadData() {
        try {
            const fileData = fs.readFileSync(this.dataFilePath, 'utf8');
            this.data = JSON.parse(fileData);
            return this.data;
        } catch (error) {
            console.error(`Error loading data from ${this.dataFilePath}:`, error);
            throw error;
        }
    }

    /**
     * Get data for a specific test
     * @param {string} testName - Name of the test to get data for
     * @returns {object} - The data for the specified test
     */
    getTestData(testName) {
        if (!this.data) {
            this.loadData();
        }

        if (!this.data[testName]) {
            throw new Error(`No test data found for test: ${testName}`);
        }

        return this.data[testName];
    }

    /**
     * Get specific data field for a test
     * @param {string} testName - Name of the test
     * @param {string} fieldName - Name of the field
     * @returns {any} - The value of the field
     */
    getTestDataField(testName, fieldName) {
        const testData = this.getTestData(testName);

        if (!testData[fieldName]) {
            throw new Error(`No field '${fieldName}' found in test data for test: ${testName}`);
        }

        return testData[fieldName];
    }

    /**
     * Save data to a JSON file
     * @param {object} data - The data to save
     */
    saveData(data) {
        try {
            const dirPath = path.dirname(this.dataFilePath);

            // Create directory if it doesn't exist
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf8');
            this.data = data;
        } catch (error) {
            console.error(`Error saving data to ${this.dataFilePath}:`, error);
            throw error;
        }
    }

    /**
     * Update specific test data
     * @param {string} testName - Name of the test
     * @param {object} newData - New data for the test
     */
    updateTestData(testName, newData) {
        if (!this.data) {
            this.loadData();
        }

        this.data[testName] = { ...this.data[testName], ...newData };
        this.saveData(this.data);
    }
}

export default TestDataManager; 