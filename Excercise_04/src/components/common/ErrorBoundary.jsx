import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styles from './ErrorBoundary.module.css';

/**
 * Fallback UI Component
 * Displayed when an error is caught
 *
 * @param {Object} props
 * @param {Error} props.error - The error that was thrown
 * @param {Function} props.resetErrorBoundary - Function to reset error boundary
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Show error details in development */}
        {process.env.NODE_ENV === 'development' && (
          <details className={styles.errorDetails}>
            <summary>Error details (Development only)</summary>
            <pre className={styles.errorStack}>{error.message}</pre>
          </details>
        )}

        <button
          onClick={resetErrorBoundary}
          className={styles.resetButton}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

/**
 * Error handler function
 * Called when an error is caught
 *
 * @param {Error} error - The error that was thrown
 * @param {Object} errorInfo - Info about error (componentStack, etc.)
 */
const errorHandler = (error, errorInfo) => {
  // In production, you would send this to error tracking service
  // like Sentry, LogRocket, etc.
  console.error('Error caught by ErrorBoundary:', error);
  console.error('Error info:', errorInfo);
};

/**
 * ErrorBoundary Component
 * Wraps child components to catch and handle errors gracefully
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to wrap
 */
const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
      onReset={() => {
        // Called when user clicks "Try again" button
        // You can use this to reset app state if needed
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
export { ErrorFallback };
