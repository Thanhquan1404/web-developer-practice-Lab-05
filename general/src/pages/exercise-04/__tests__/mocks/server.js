/**
 * MSW (Mock Service Worker) Server Setup
 *
 * This sets up the MSW server for Node.js environment (testing).
 * Used in setupTests.js to enable API mocking across all tests.
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Create MSW server instance with default handlers
 * Server is started/stopped in setupTests.js
 */
export const server = setupServer(...handlers);
