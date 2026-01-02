import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../api/authApi';
import styles from './LoginForm.module.css';

/**
 * LoginForm Component
 *
 * A form component for user authentication. Accepts email and password credentials,
 * sends them to the API for authentication, and displays a welcome message on success.
 *
 * User Interactions:
 * 1. User enters email and password
 * 2. User clicks Submit button
 * 3. Form makes API call to authenticate
 * 4. On success: displays "Welcome back!" message
 * 5. On error: displays error message from server
 *
 * @component
 * @example
 * <LoginForm onSuccess={(user) => console.log('Logged in:', user)} />
 */
const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * Handle form field changes
   * Updates state as user types in email/password fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (error) {
      setError(null);
    }
  };

  /**
   * Handle form submission
   * Makes API call with credentials and handles success/error states
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the auth API with email and password
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // On successful login, update state and call callback
      setIsLoggedIn(true);
      setUser(response.user);
      setFormData({ email: '', password: '' });

      // Notify parent component
      if (onSuccess) {
        onSuccess(response.user);
      }
    } catch (err) {
      // Display error message to user
      setError(err.message || 'Login failed. Please try again.');
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Success State - Show welcome message
   * Only rendered after successful login
   */
  if (isLoggedIn) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successMessage}>
          <h2>Welcome back!</h2>
          <p>You have successfully logged in as {user?.email}</p>
        </div>
      </div>
    );
  }

  /**
   * Form State - Show login form
   * Render form for user to enter credentials
   */
  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      {/* Error Alert - Displayed if login fails */}
      {error && (
        <div className={styles.errorAlert} role="alert">
          {error}
        </div>
      )}

      {/* Email Input Field */}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          disabled={isLoading}
          required
          data-testid="email-input"
        />
      </div>

      {/* Password Input Field */}
      <div className={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          disabled={isLoading}
          required
          data-testid="password-input"
        />
      </div>

      {/* Submit Button - Disabled while loading */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
        data-testid="submit-button"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  /** Callback function called on successful login with user data */
  onSuccess: PropTypes.func,
};

LoginForm.defaultProps = {
  onSuccess: null,
};

export default LoginForm;
