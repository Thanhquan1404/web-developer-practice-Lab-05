/**
 * MSW (Mock Service Worker) Handlers
 *
 * This file sets up mock HTTP handlers for API calls during tests.
 * MSW intercepts all fetch/axios requests and responds with mock data.
 *
 * Benefits:
 * - No need to mock fetch directly
 * - Works like a real server
 * - Easy to set different responses per test
 * - Great for integration testing
 */

import { rest } from 'msw';

/**
 * Default handlers for common API endpoints
 * These are used by default in all tests unless overridden
 */
export const handlers = [
  // Login endpoint - successful response
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const body = await req.json();

    // Simulate successful login for test credentials
    if (body.email && body.password) {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            id: '123',
            email: body.email,
            name: body.email.split('@')[0],
          },
          token: 'mock-jwt-token',
        })
      );
    }

    // Return error if credentials missing
    return res(
      ctx.status(400),
      ctx.json({
        message: 'Invalid credentials',
      })
    );
  }),
];

/**
 * Error handlers for testing error scenarios
 * Use these in individual tests to override default behavior
 */
export const errorHandlers = {
  // API returns 401 Unauthorized
  loginUnauthorized: rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Invalid email or password',
      })
    );
  }),

  // API returns 500 Server Error
  loginServerError: rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: 'Server error. Please try again later.',
      })
    );
  }),

  // Request timeout / network error
  loginNetworkError: rest.post('/api/auth/login', (req, res, ctx) => {
    return res.networkError('Failed to connect');
  }),
};
