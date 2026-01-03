/**
 * setupTests.js
 *
 * Jest configuration file that runs before all tests.
 * Sets up:
 * - MSW server for API mocking
 * - Custom test utilities
 * - Global test environment
 *
 * Reference: https://jestjs.io/docs/configuration#setupfilesafterenv-array
 */

import '@testing-library/jest-dom';
import { server } from './mocks/server';

/**
 * Start MSW server before all tests
 * This enables API mocking for the entire test suite
 */
beforeAll(() => {
  server.listen({
    // Log unhandled requests (helps debug)
    onUnhandledRequest: 'warn',
  });
});

/**
 * Reset handlers after each test
 * Ensures each test starts with a clean state
 */
afterEach(() => {
  server.resetHandlers();
});

/**
 * Stop MSW server after all tests complete
 * Cleans up resources
 */
afterAll(() => {
  server.close();
});

/**
 * Suppress console.error logs for specific patterns
 * Useful for hiding React error boundary warnings during tests
 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Suppress Error Boundary console errors during tests
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Error') ||
        args[0].includes('Consider adding an error boundary'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
