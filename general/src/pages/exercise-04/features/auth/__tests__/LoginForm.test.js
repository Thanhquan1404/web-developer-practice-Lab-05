/**
 * LoginForm Integration Tests
 *
 * Philosophy: Test user behavior and outcomes, NOT internal implementation.
 * 
 * What we test:
 * ✓ User can enter email and password
 * ✓ Form submits with correct data
 * ✓ Success message shows after login
 * ✓ Error messages display on failure
 * ✓ Loading state during API call
 * ✓ Button disabled during submission
 *
 * What we DON'T test:
 * ✗ Component state directly
 * ✗ Internal function calls
 * ✗ React internal behavior
 *
 * Tools:
 * - React Testing Library: User-focused testing
 * - userEvent: Realistic user interactions
 * - MSW: API mocking
 * - Jest: Test runner and assertions
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../mocks/server';
import { errorHandlers } from '../mocks/handlers';
import LoginForm from '../../features/auth/components/LoginForm';

/**
 * TEST SUITE 1: Happy Path - Successful Login
 * What we're testing: User successfully logs in with valid credentials
 */
describe('LoginForm - Successful Login', () => {
  /**
   * Test 1: User can enter email and password
   *
   * Scenario:
   * 1. User types email into email field
   * 2. User types password into password field
   * 3. Verify values are in the input fields
   *
   * Why this matters:
   * - Input handling is the foundation of the form
   * - If this breaks, nothing else will work
   */
  it('should allow user to type email and password', async () => {
    // ARRANGE: Render the form
    render(<LoginForm />);

    // ACT: Get input fields and type values
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Use userEvent for realistic typing (better than fireEvent)
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    // ASSERT: Verify values in inputs
    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  /**
   * Test 2: Form submits with valid credentials
   *
   * Scenario:
   * 1. User fills in email and password
   * 2. User clicks submit button
   * 3. Verify API was called with correct data
   *
   * Why this matters:
   * - Form submission is the core functionality
   * - We need to verify the API receives correct data
   */
  it('should display success message on valid login', async () => {
    // ARRANGE: Create a mock callback to track success
    const mockOnSuccess = jest.fn();
    render(<LoginForm onSuccess={mockOnSuccess} />);

    // Get form elements using accessibility queries (best practice)
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: User fills and submits form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: "Welcome back!" message appears
    // Use findByText (async) instead of getByText (sync) because the message
    // appears after the async API call completes
    const welcomeMessage = await screen.findByText(/welcome back/i);
    expect(welcomeMessage).toBeInTheDocument();

    // ASSERT: Success callback was called with user data
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'user@example.com',
        })
      );
    });
  });

  /**
   * Test 3: Form clears after successful login
   *
   * Scenario:
   * 1. User logs in
   * 2. Verify form fields are cleared
   *
   * Why this matters:
   * - Shows successful form reset
   * - Prevents sensitive data from staying in form
   */
  it('should clear form fields after successful login', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Fill and submit form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // Wait for success message to ensure submission is complete
    await screen.findByText(/welcome back/i);

    // ASSERT: Form fields are empty (cleared after success)
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  /**
   * Test 4: Submit button shows loading state
   *
   * Scenario:
   * 1. User clicks submit
   * 2. Button text changes to "Logging in..."
   * 3. Button is disabled during request
   *
   * Why this matters:
   * - User feedback that action is processing
   * - Prevents double-submission
   */
  it('should show loading state while submitting', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Start filling form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    // ACT: Click submit
    await userEvent.click(submitButton);

    // ASSERT: Button shows loading text immediately
    expect(submitButton).toHaveTextContent(/logging in/i);

    // ASSERT: Button is disabled during request
    expect(submitButton).toBeDisabled();

    // ASSERT: Text changes back after request completes
    await screen.findByText(/welcome back/i);
  });

  /**
   * Test 5: Inputs are disabled during loading
   *
   * Scenario:
   * 1. User starts submitting form
   * 2. Input fields become disabled
   * 3. Prevents editing while request in flight
   */
  it('should disable inputs while loading', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Fill form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    // ACT: Submit
    await userEvent.click(submitButton);

    // ASSERT: Inputs are disabled during loading
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();

    // Wait for completion
    await screen.findByText(/welcome back/i);
  });

  /**
   * Test 6: User data displays in success message
   *
   * Scenario:
   * 1. User logs in
   * 2. Success message shows their email address
   *
   * Why this matters:
   * - Confirms the server data is being used
   * - User confirmation of which account they logged into
   */
  it('should display user email in success message', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const testEmail = 'john@example.com';

    // ACT: Login
    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: Email shows in success message
    await screen.findByText(new RegExp(testEmail));
  });
});

/**
 * TEST SUITE 2: Error Scenarios
 * What we're testing: How the form handles various error cases
 */
describe('LoginForm - Error Handling', () => {
  /**
   * Test 7: Display error when API returns 401
   *
   * Scenario:
   * 1. User submits form
   * 2. API returns 401 Unauthorized
   * 3. Error message displays
   *
   * Why this matters:
   * - Tests error handling for invalid credentials
   * - Ensures user knows why login failed
   */
  it('should display error message on invalid credentials', async () => {
    // ARRANGE: Override default handler to return 401 error
    server.use(errorHandlers.loginUnauthorized);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Submit form
    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(submitButton);

    // ASSERT: Error message displays
    // Use findByRole with alert to get error message
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent(/invalid email or password/i);
  });

  /**
   * Test 8: Display error on server error
   *
   * Scenario:
   * 1. API returns 500 Server Error
   * 2. User-friendly error message displays
   */
  it('should display error message on server error', async () => {
    server.use(errorHandlers.loginServerError);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Submit form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: Server error message displays
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent(/server error/i);
  });

  /**
   * Test 9: Display error on network failure
   *
   * Scenario:
   * 1. Network request fails
   * 2. Generic error message displays
   */
  it('should handle network errors gracefully', async () => {
    server.use(errorHandlers.loginNetworkError);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Submit form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: Error message displays (could be generic or specific)
    await waitFor(() => {
      const errorAlert = screen.queryByRole('alert');
      expect(errorAlert).toBeInTheDocument();
    });
  });

  /**
   * Test 10: Error clears when user starts typing again
   *
   * Scenario:
   * 1. Error displays
   * 2. User starts typing in email field
   * 3. Error message is cleared
   *
   * Why this matters:
   * - Better UX: error doesn't persist if user retries
   * - Encourages user to fix and retry
   */
  it('should clear error message when user starts typing', async () => {
    server.use(errorHandlers.loginUnauthorized);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Submit with wrong credentials
    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(submitButton);

    // Wait for error to appear
    await screen.findByRole('alert');

    // ACT: User clears and retypes email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'correct@example.com');

    // ASSERT: Error message is gone
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  /**
   * Test 11: Form doesn't reset on error
   *
   * Scenario:
   * 1. User submits form
   * 2. API returns error
   * 3. Form fields keep user's input (for correction)
   *
   * Why this matters:
   * - User doesn't lose typed data on error
   * - Better UX for retry
   */
  it('should keep form values on error for user to retry', async () => {
    server.use(errorHandlers.loginUnauthorized);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // ACT: Submit form
    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);
    await userEvent.click(submitButton);

    // Wait for error
    await screen.findByRole('alert');

    // ASSERT: Form values are still there
    expect(emailInput).toHaveValue(testEmail);
    expect(passwordInput).toHaveValue(testPassword);
  });
});

/**
 * TEST SUITE 3: Accessibility & User Experience
 * What we're testing: Form is accessible to all users
 */
describe('LoginForm - Accessibility', () => {
  /**
   * Test 12: Form elements are properly labeled
   *
   * Why this matters:
   * - Screen reader users need labels
   * - Semantic HTML is a foundation of accessibility
   */
  it('should have proper labels for all inputs', () => {
    render(<LoginForm />);

    // ASSERT: All inputs have associated labels
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  /**
   * Test 13: Submit button is accessible
   *
   * Why this matters:
   * - Button should be keyboard accessible
   * - Should have clear, descriptive text
   */
  it('should have accessible submit button', () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /login/i });

    // ASSERT: Button exists and is visible
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeVisible();
  });

  /**
   * Test 14: Error message is marked as alert
   *
   * Why this matters:
   * - Screen readers will announce errors
   * - Users know it's an important message
   */
  it('should mark error message as alert for screen readers', async () => {
    server.use(errorHandlers.loginUnauthorized);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Trigger error
    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(submitButton);

    // ASSERT: Error has proper ARIA role
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveAttribute('role', 'alert');
  });

  /**
   * Test 15: Keyboard navigation works
   *
   * Why this matters:
   * - Keyboard-only users can operate the form
   * - User can tab through fields and submit with Enter
   */
  it('should support keyboard navigation (Tab and Enter)', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);

    // ACT: Type in email field
    emailInput.focus();
    await userEvent.type(emailInput, 'user@example.com');

    // Tab to password field
    await userEvent.tab();
    const passwordInput = screen.getByLabelText(/password/i);

    // ASSERT: Password field has focus
    expect(passwordInput).toHaveFocus();

    // Type password
    await userEvent.type(passwordInput, 'password123');

    // Tab to submit button
    await userEvent.tab();
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ASSERT: Submit button has focus
    expect(submitButton).toHaveFocus();

    // Press Enter to submit
    await userEvent.keyboard('{Enter}');

    // ASSERT: Form submitted (success message appears)
    await screen.findByText(/welcome back/i);
  });
});

/**
 * TEST SUITE 4: Edge Cases & Special Scenarios
 * What we're testing: Unusual but important scenarios
 */
describe('LoginForm - Edge Cases', () => {
  /**
   * Test 16: Multiple submission attempts
   *
   * Scenario:
   * 1. User clicks submit multiple times
   * 2. Only one API call is made
   */
  it('should prevent multiple submissions while loading', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Fill form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Click submit
    await userEvent.click(submitButton);

    // Try to click again while loading (button is disabled)
    await userEvent.click(submitButton);

    // ASSERT: Welcome message appears (form only submitted once)
    // If it was submitted twice, we'd see two success messages
    const welcomeMessages = await screen.findAllByText(/welcome back/i);
    expect(welcomeMessages.length).toBe(1);
  });

  /**
   * Test 17: onSuccess callback is optional
   *
   * Scenario:
   * 1. Component renders without onSuccess prop
   * 2. Form still works
   * 3. No errors
   */
  it('should work without onSuccess callback', async () => {
    // Render without onSuccess prop
    const { rerender } = render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // ACT: Submit form
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: Success message still appears
    await screen.findByText(/welcome back/i);
  });

  /**
   * Test 18: Special characters in email
   *
   * Scenario:
   * 1. User enters email with special characters
   * 2. Form accepts and submits it
   */
  it('should handle special characters in email', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const specialEmail = 'john+test.name@example.co.uk';

    // ACT: Submit with special email
    await userEvent.type(emailInput, specialEmail);
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // ASSERT: Login succeeds
    await screen.findByText(new RegExp(specialEmail));
  });
});
