Test downstream

# Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright to demonstrate best practices for E2E testing.

## Framework Architecture

This framework is built using the Page Object Model (POM) design pattern and includes several key components:

### Key Components

- **Page Objects**: Encapsulate page-specific elements and actions
- **Test Data Management**: Centralized test data handling
- **Test Fixtures**: Custom fixtures for easy access to page objects and data
- **Configuration Management**: Environment-specific settings
- **Utility Functions**: Reusable helper functions
- **Reporting**: Enhanced test reporting

## Directory Structure

```
├── config/                 # Configuration files
├── node_modules/           # Dependencies
├── playwright-report/      # Test reports
├── screenshots/            # Failure screenshots
├── src/                    # Framework source code
│   ├── data/               # Test data
│   ├── fixtures/           # Test fixtures
│   ├── helpers/            # Helper utilities
│   ├── pages/              # Page object models
│   ├── reports/            # Custom reporting utilities
│   └── utils/              # Utility functions
├── tests/                  # Test files
├── tests-examples/         # Example tests from Playwright
├── package.json            # Project dependencies
├── playwright.config.js    # Playwright configuration
└── README.md               # Project documentation
```

## Page Object Model

The framework uses the Page Object Model (POM) design pattern to create an abstraction layer for UI pages. Each page object:

- Encapsulates the page structure
- Provides methods for interacting with page elements
- Isolates test code from page implementation details

### Base Page Class

The `BasePage` class provides common functionality for all page objects:

- Navigation methods
- Waiting utilities
- Element interaction methods
- Screenshot capture

### Page Object Examples

- `LoginPage`: Handles login form interactions
- `ProductsPage`: Manages product listing and sorting
- `CartPage`: Shopping cart interactions
- `CheckoutPage`: Checkout process interactions

## Test Data Management

The framework provides a centralized approach to test data management:

- JSON-based test data storage
- Methods for retrieving specific test data
- Support for dynamic data generation

## Test Fixtures

Custom fixtures that extend Playwright's test fixtures:

- Automatic initialization of page objects
- Test data access
- Authentication helpers

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in a specific file
npx playwright test login.spec.js

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui

# Run tests in debug mode
npx playwright test --debug
```

## Configuration

The framework can be configured via environment variables:

- `BASE_URL`: The base URL for tests (default: https://www.saucedemo.com)
- `HEADLESS`: Run in headless mode (default: true)
- `SLOWMO`: Slow down test execution in milliseconds (default: 0)

## Example Tests

The framework includes example tests for the [SauceDemo](https://www.saucedemo.com) website:

1. **Login Tests**: Demonstrates authentication scenarios
2. **Shopping Tests**: End-to-end purchase workflow
3. **Sorting Tests**: Product sorting functionality

## Extending The Framework

To add new tests:

1. Create page objects for new pages if needed
2. Add test data for your test cases
3. Create test files in the `tests` directory
4. Use the provided fixtures in your tests

## Best Practices

- One page object per page/component
- Keep page objects small and focused
- Use descriptive method names
- Isolate test data from test logic
- Make tests independent of each other
- Add meaningful assertions
- Use proper waiting strategies 




If errors:

npm config set strict-ssl false
 
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
 
