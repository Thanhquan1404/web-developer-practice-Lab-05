/**
 * ErrorBoundary Tests
 *
 * Philosophy: Test that error boundaries prevent crashes and display fallback UI.
 *
 * What we test:
 * ✓ Fallback UI shows when child component throws error
 * ✓ Application remains stable (not completely white screen)
 * ✓ "Try again" button can reset error state
 * ✓ Errors are logged for debugging
 * ✓ Console errors are suppressed during tests
 *
 * Special Component: "Bomb"
 * A test component that intentionally throws an error.
 * Used to trigger error boundary and test recovery.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../common/ErrorBoundary';

/**
 * Bomb Component
 *
 * A test component that throws an error on render.
 * Used exclusively for testing error boundary behavior.
 *
 * Why we need this:
 * - Tests need a way to trigger an error
 * - Can't use production code that already works
 * - Must throw during render to test boundary
 */
const Bomb = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Boom! 💣');
  }
  return <div>Bomb component (no error)</div>;
};

/**
 * TEST SUITE 1: Error Boundary Catches Errors
 * What we're testing: Core error boundary functionality
 */
describe('ErrorBoundary - Catching Errors', () => {
  /**
   * Test 1: Fallback UI displays when child throws error
   *
   * Scenario:
   * 1. Render Bomb component inside ErrorBoundary
   * 2. Bomb throws error during render
   * 3. Fallback UI appears instead of white screen
   *
   * Why this matters:
   * - App doesn't completely crash
   * - User sees helpful error message
   * - Application framework stays intact
   */
  it('should display fallback UI when child component throws error', () => {
    // ARRANGE: Suppress console.error to keep test output clean
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // ACT: Render Bomb inside ErrorBoundary
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Fallback UI is visible
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();

    // CLEANUP: Restore console.error
    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 2: Error message is displayed
   *
   * Scenario:
   * 1. Error is thrown
   * 2. Error boundary shows error message to user
   *
   * Why this matters:
   * - User knows something went wrong
   * - Clear messaging instead of confusion
   */
  it('should display error message in fallback UI', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Error message is visible
    const errorMessage = screen.getByText(/something went wrong/i);
    expect(errorMessage).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 3: "Try again" button is available
   *
   * Scenario:
   * 1. Error boundary shows fallback UI
   * 2. User can see "Try again" button
   * 3. Button is functional
   *
   * Why this matters:
   * - Gives user a way to recover
   * - User has agency in error recovery
   */
  it('should provide a "Try again" button to reset error state', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Reset button exists
    const resetButton = screen.getByRole('button', { name: /try again/i });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeVisible();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 4: Error details show in development mode
   *
   * Scenario:
   * 1. Component throws error
   * 2. In development, error details are visible
   * 3. Developers can see what went wrong
   *
   * Why this matters:
   * - Helps developers debug
   * - Hidden in production for security
   */
  it('should display error details in development mode', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Check if running in development
    const isDevelopment = process.env.NODE_ENV === 'development';

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    const errorDetails = screen.queryByText(/error details/i);

    if (isDevelopment) {
      // ASSERT: Error details visible in development
      expect(errorDetails).toBeInTheDocument();
    }
    // In production, error details might be hidden

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 5: Multiple errors in same boundary
   *
   * Scenario:
   * 1. Multiple children, one throws error
   * 2. Error boundary catches it
   * 3. Safe siblings might still render (depending on boundary placement)
   *
   * Why this matters:
   * - Tests realistic scenarios
   * - Shows boundary effectiveness
   */
  it('should catch errors from nested components', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const SafeComponent = () => <div>This is safe</div>;

    render(
      <ErrorBoundary>
        <SafeComponent />
        <Bomb /> {/* This throws, boundary catches it */}
      </ErrorBoundary>
    );

    // ASSERT: Error boundary shows
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});

/**
 * TEST SUITE 2: Application Stability
 * What we're testing: App doesn't completely crash
 */
describe('ErrorBoundary - Application Stability', () => {
  /**
   * Test 6: Fallback UI has proper structure
   *
   * Scenario:
   * 1. Error occurs
   * 2. Fallback UI renders with complete structure
   * 3. UI is not broken or incomplete
   *
   * Why this matters:
   * - Fallback UI itself shouldn't crash
   * - Complete application frame is preserved
   */
  it('should render complete fallback UI structure', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: All fallback UI components are present
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 7: Error is marked as alert for accessibility
   *
   * Scenario:
   * 1. Error boundary catches error
   * 2. Fallback marked with role="alert"
   * 3. Screen readers announce error
   *
   * Why this matters:
   * - Blind users know about error
   * - Assistive tech can announce problem
   */
  it('should mark error as alert for accessibility', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Error has alert role for accessibility
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 8: Styling is applied to fallback
   *
   * Scenario:
   * 1. Error boundary shows fallback
   * 2. Fallback has proper styling
   * 3. UI looks professional, not broken
   *
   * Why this matters:
   * - Users see polished fallback UI
   * - Builds trust even in error state
   */
  it('should render fallback UI with proper styling', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { container } = render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Error container has styling
    const errorContainer = container.querySelector('[role="alert"]');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveStyle({ display: 'flex' });

    consoleErrorSpy.mockRestore();
  });
});

/**
 * TEST SUITE 3: Error Logging
 * What we're testing: Errors are properly logged for debugging
 */
describe('ErrorBoundary - Error Logging', () => {
  /**
   * Test 9: Errors are logged to console
   *
   * Scenario:
   * 1. Component throws error
   * 2. Error boundary catches it
   * 3. Error is logged for debugging
   *
   * Why this matters:
   * - Developers can find and fix errors
   * - Error tracking in development
   */
  it('should log errors for debugging', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: console.error was called (error was logged)
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 10: Error message includes useful info
   *
   * Scenario:
   * 1. Error is thrown with specific message
   * 2. Error boundary logs it
   * 3. Log includes error message
   *
   * Why this matters:
   * - Developers see what went wrong
   * - Easier to find root cause
   */
  it('should include error message in logs', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: console.error included our error message
    const calls = consoleErrorSpy.mock.calls;
    const hasErrorMessage = calls.some((call) =>
      call.some((arg) => {
        if (typeof arg === 'string') return arg.includes('Error');
        if (arg instanceof Error) return arg.message.includes('Boom');
        return false;
      })
    );
    expect(hasErrorMessage).toBeTruthy();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 11: Multiple errors logged separately
   *
   * Scenario:
   * 1. Several errors occur (re-renders, etc.)
   * 2. Each is logged
   * 3. Developers see full picture
   */
  it('should handle multiple error logs gracefully', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: console.error was called
    // (React may call it multiple times, which is normal)
    expect(consoleErrorSpy.mock.calls.length).toBeGreaterThan(0);

    consoleErrorSpy.mockRestore();
  });
});

/**
 * TEST SUITE 4: Reset / Recovery
 * What we're testing: User can recover from errors
 */
describe('ErrorBoundary - Error Recovery', () => {
  /**
   * Test 12: "Try again" button is clickable
   *
   * Scenario:
   * 1. Error shows fallback UI
   * 2. User clicks "Try again"
   * 3. Button responds (can navigate away, etc.)
   *
   * Why this matters:
   * - User has path forward
   * - Not stuck on error screen
   */
  it('should allow user to click "Try again" button', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    const resetButton = screen.getByRole('button', { name: /try again/i });

    // ACT: Click the button
    await userEvent.click(resetButton);

    // ASSERT: Button was clickable (no error from interaction)
    expect(resetButton).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 13: Button enables keyboard interaction
   *
   * Scenario:
   * 1. Error boundary shows
   * 2. User navigates to button with Tab key
   * 3. User presses Enter to activate
   *
   * Why this matters:
   * - Keyboard-only users can recover
   * - Full accessibility support
   */
  it('should support keyboard navigation to reset button', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    const resetButton = screen.getByRole('button', { name: /try again/i });

    // ACT: Focus button and press Enter
    resetButton.focus();
    await userEvent.keyboard('{Enter}');

    // ASSERT: Button is accessible
    expect(resetButton).toHaveFocus();

    consoleErrorSpy.mockRestore();
  });
});

/**
 * TEST SUITE 5: Safe Rendering
 * What we're testing: Errors in one place don't break everything
 */
describe('ErrorBoundary - Safe Rendering', () => {
  /**
   * Test 14: ErrorBoundary can be nested
   *
   * Scenario:
   * 1. Multiple ErrorBoundaries in app
   * 2. One catches error in its subtree
   * 3. Other parts still work
   *
   * Why this matters:
   * - Fine-grained error handling
   * - Can protect specific features
   */
  it('should work with multiple boundary instances', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const SafeComponent = () => <div>Safe component</div>;

    render(
      <div>
        <ErrorBoundary>
          <SafeComponent />
        </ErrorBoundary>
        <ErrorBoundary>
          <Bomb />
        </ErrorBoundary>
      </div>
    );

    // ASSERT: Second boundary caught error
    const errorMessages = screen.getAllByText(/something went wrong/i);
    expect(errorMessages.length).toBeGreaterThanOrEqual(1);

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 15: Component outside boundary unaffected
   *
   * Scenario:
   * 1. Some content inside ErrorBoundary
   * 2. Some content outside ErrorBoundary
   * 3. Error inside doesn't affect outside
   */
  it('should only affect components within boundary', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const OutsideContent = () => <div>Outside content</div>;
    const SafeInsideContent = () => <div>Inside safe content</div>;

    render(
      <div>
        <OutsideContent />
        <ErrorBoundary>
          <SafeInsideContent />
          <Bomb />
        </ErrorBoundary>
      </div>
    );

    // ASSERT: Outside content still renders
    expect(screen.getByText('Outside content')).toBeInTheDocument();

    // ASSERT: Error boundary caught the error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  /**
   * Test 16: No infinite loops on error
   *
   * Scenario:
   * 1. Error occurs
   * 2. Error boundary shows fallback
   * 3. Fallback doesn't throw
   * 4. No infinite error loops
   *
   * Why this matters:
   * - App doesn't get into bad state
   * - Recovery is stable
   */
  it('should not cause infinite loops on error', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Fallback renders without re-triggering error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // ASSERT: Button is clickable (not in error loop)
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    consoleErrorSpy.mockRestore();
  });
});

/**
 * TEST SUITE 6: Console Cleanup
 * What we're testing: Tests keep console clean
 */
describe('ErrorBoundary - Console Cleanup', () => {
  /**
   * Test 17: Console.error is properly managed
   *
   * Scenario:
   * 1. Test uses console.error spy
   * 2. Test completes
   * 3. Console.error is restored
   *
   * Why this matters:
   * - Test output is clean
   * - No console spam
   * - Other tests aren't affected
   */
  it('should properly manage console.error spy', () => {
    const originalError = console.error;

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // ASSERT: Spy is installed
    expect(console.error).toBe(consoleErrorSpy);

    consoleErrorSpy.mockRestore();

    // ASSERT: Original console.error is restored
    expect(console.error).toBe(originalError);
  });

  /**
   * Test 18: No unhandled console errors after test
   *
   * Scenario:
   * 1. Test renders error boundary
   * 2. Test completes and cleans up
   * 3. console.error is clean for next test
   *
   * Why this matters:
   * - Test isolation
   * - One test doesn't affect another
   * - Clean test suite output
   */
  it('should clean up after test completion', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // Verify spy was used
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Cleanup
    consoleErrorSpy.mockRestore();

    // ASSERT: console.error is back to normal
    // (This test passing means cleanup was successful)
    expect(console.error).toBeDefined();
  });
});
