/**
 * Auth API module
 *
 * Handles all authentication-related API calls.
 * In production, this would communicate with a real backend.
 * In tests, this will be mocked using MSW or jest.mock.
 */

/**
 * Login user with email and password
 *
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Response containing user data
 * @throws {Error} If login fails
 */
export const loginUser = async ({ email, password }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};
