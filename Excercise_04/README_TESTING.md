# 🧪 React Testing Library & Jest - Complete Guide

**Senior QA Automation Engineer** implementation of user-centric testing for React components.

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Testing Philosophy](#testing-philosophy)
3. [TASK 1: LoginForm Integration Testing](#task-1-loginform-integration-testing)
4. [TASK 2: Error Boundary Testing](#task-2-error-boundary-testing)
5. [File Structure](#file-structure)
6. [Running Tests](#running-tests)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

This project demonstrates **professional React testing** using:

- **React Testing Library (RTL)** - User-centric testing
- **Jest** - Test runner and assertion library
- **Mock Service Worker (MSW)** - API mocking
- **@testing-library/user-event** - Realistic user interactions

### What You'll Learn

✅ How to test React components like a senior QA engineer  
✅ Integration testing with real user scenarios  
✅ Error handling and error boundaries  
✅ API mocking with MSW  
✅ Best practices for resilient tests  

---

## Testing Philosophy

### ❌ What NOT to Test

```javascript
// ❌ DON'T test internal state
expect(component.state.email).toBe('user@example.com');

// ❌ DON'T test implementation details
expect(useState).toHaveBeenCalled();

// ❌ DON'T use fragile selectors
container.querySelector('div > button');
```

### ✅ What TO Test

```javascript
// ✅ DO test what user sees
expect(screen.getByText('Welcome back!')).toBeInTheDocument();

// ✅ DO test user interactions
await userEvent.type(emailInput, 'user@example.com');

// ✅ DO use accessible queries
screen.getByRole('button', { name: /login/i });
```

---

## TASK 1: LoginForm Integration Testing

### Component Overview

The `LoginForm` component:
- Accepts email and password input
- Submits to API (`/api/auth/login`)
- Shows success message on successful login
- Displays error message on failure

### Test Structure: Arrange-Act-Assert

```javascript
it('should display success message on valid login', async () => {
  // ARRANGE: Set up component and mocks
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  
  // ACT: Perform user action
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.click(submitButton);
  
  // ASSERT: Verify outcome
  await screen.findByText(/welcome back/i);
});
```

### Test Suites Included

#### Suite 1: Successful Login ✅
- User can type email and password
- Form submits with correct data
- Success message displays
- Form fields clear after success
- Loading state shows during submission
- User data displays in success message

#### Suite 2: Error Handling ❌
- Display error on invalid credentials (401)
- Display error on server error (500)
- Handle network failures gracefully
- Clear error when user starts typing again
- Keep form values on error for retry

#### Suite 3: Accessibility ♿
- Form elements properly labeled
- Submit button is accessible
- Error message marked as alert
- Keyboard navigation works (Tab + Enter)

#### Suite 4: Edge Cases
- Prevent multiple simultaneous submissions
- Work without optional onSuccess callback
- Handle special characters in email

### Key Testing Techniques

#### 1. Using MSW (Mock Service Worker)

```javascript
// In setupTests.js
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

#### 2. Overriding Handlers Per Test

```javascript
it('should display error on invalid credentials', async () => {
  // Override default handler for this test
  server.use(errorHandlers.loginUnauthorized);
  
  render(<LoginForm />);
  // Test error scenario...
});
```

#### 3. Using userEvent (Not fireEvent)

```javascript
// ✅ GOOD: userEvent simulates realistic typing
await userEvent.type(emailInput, 'user@example.com');
await userEvent.click(submitButton);

// ❌ BAD: fireEvent doesn't trigger all events
fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
```

#### 4. Async Assertions

```javascript
// ✅ For API calls: Use findByText (waits for element)
const message = await screen.findByText(/welcome back/i);

// ✅ For complex conditions: Use waitFor
await waitFor(() => {
  expect(mockFn).toHaveBeenCalledWith(expectedData);
});

// ❌ WRONG: No waiting for async operations
const message = screen.getByText(/welcome back/i); // Fails!
```

#### 5. Mocking Callbacks

```javascript
const mockOnSuccess = jest.fn();
render(<LoginForm onSuccess={mockOnSuccess} />);

// After login...
await waitFor(() => {
  expect(mockOnSuccess).toHaveBeenCalledWith(
    expect.objectContaining({
      email: 'user@example.com',
    })
  );
});
```

### Query Priority (Best to Avoid)

```
1. getByRole()        - Best! Tests accessibility
2. getByLabelText()   - Labels are meaningful
3. getByPlaceholder() - Still good
4. getByText()        - Use for non-interactive
5. getByTestId()      - Last resort!
```

### Running LoginForm Tests

```bash
# Run all tests
npm test

# Run only LoginForm tests
npm test LoginForm.test.js

# Watch mode (re-run on save)
npm test -- --watch

# Debug mode
npm test -- --inspect-brk --runInBand
```

---

## TASK 2: Error Boundary Testing

### Component Overview

The `ErrorBoundary` component:
- Catches JavaScript errors in child components
- Displays fallback UI instead of white screen
- Provides "Try again" button for recovery
- Prevents app crashes

### The "Bomb" Component

```javascript
const Bomb = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Boom! 💣');
  }
  return <div>Safe content</div>;
};
```

Used exclusively to trigger errors for testing.

### Test Suites Included

#### Suite 1: Catching Errors ✅
- Fallback UI displays when child throws error
- Error message is visible
- "Try again" button is available
- Error details show in development mode
- Catches errors from nested components

#### Suite 2: Application Stability 🛡️
- Fallback UI has proper structure
- Error marked as alert for accessibility
- Styling applied to fallback
- Complete app frame preserved

#### Suite 3: Error Logging 📝
- Errors are logged to console
- Error message included in logs
- Multiple errors handled gracefully

#### Suite 4: Error Recovery 🔄
- "Try again" button is clickable
- Keyboard navigation works
- User can focus and activate button

#### Suite 5: Safe Rendering 🔒
- Multiple error boundaries work together
- Errors in one don't break others
- No infinite error loops

#### Suite 6: Console Cleanup 🧹
- console.error is properly mocked
- Mocks cleaned up after tests
- Test output stays clean

### Console Error Suppression

```javascript
// In setupTests.js
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});
```

**Why?** Error boundary tests log errors to console (by design). We suppress them to keep test output clean.

### Testing Error Boundary

```javascript
it('should display fallback UI when child throws', () => {
  // Suppress console for clean output
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  // Render Bomb inside boundary
  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  // Fallback UI should show
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

  consoleErrorSpy.mockRestore();
});
```

### Running Error Boundary Tests

```bash
# Run all tests
npm test

# Run only ErrorBoundary tests
npm test ErrorBoundary.test.js

# With coverage
npm test -- --coverage

# Debug errors
npm test -- --inspect-brk --runInBand ErrorBoundary.test.js
```

---

## File Structure

```
Excercise_04/
├── src/
│   ├── main.jsx                     Entry point
│   ├── App.jsx                      Demo application
│   ├── App.module.css              App styling
│   ├── setupTests.js               Jest setup (MSW, mocks)
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── index.js            Barrel export
│   │       ├── api/
│   │       │   └── authApi.js      API calls
│   │       ├── components/
│   │       │   ├── LoginForm.jsx
│   │       │   └── LoginForm.module.css
│   │       └── __tests__/
│   │           └── LoginForm.test.js    ✅ 60+ tests
│   │
│   ├── components/
│   │   └── common/
│   │       ├── index.js
│   │       ├── ErrorBoundary.jsx
│   │       ├── ErrorBoundary.module.css
│   │       └── __tests__/
│   │           └── ErrorBoundary.test.js ✅ 40+ tests
│   │
│   └── __tests__/
│       └── mocks/
│           ├── handlers.js         MSW handlers
│           └── server.js           MSW server
│
├── jest.config.js                  Jest configuration
├── .babelrc.js                     Babel configuration
├── package.json                    Dependencies
├── index.html                      HTML entry point
└── README_TESTING.md              This file
```

---

## Running Tests

### Installation

```bash
# Install dependencies
npm install

# Or if using yarn
yarn install
```

### Run All Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (re-run on changes)
npm test -- --watch

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test LoginForm.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should display success"
```

### Debug Tests

```bash
# Debug mode with inspect
npm test -- --inspect-brk --runInBand

# Then open chrome://inspect in Chrome DevTools
```

### Interactive Mode

```bash
# Start watch mode
npm test -- --watch

# Then press:
# a = run all tests
# f = run failed tests
# p = filter by filename
# t = filter by test name
# q = quit
```

---

## Best Practices

### 1. Use Semantic Queries

```javascript
// ✅ GOOD: Tests what user sees/interacts with
screen.getByRole('button', { name: /login/i });
screen.getByLabelText(/email address/i);
screen.getByText(/welcome back/i);

// ❌ BAD: Tests implementation details
screen.getByTestId('submit-btn');
container.querySelector('.login-form button');
```

### 2. Prefer userEvent Over fireEvent

```javascript
// ✅ GOOD: Simulates realistic user interaction
await userEvent.type(input, 'text');
await userEvent.click(button);
await userEvent.keyboard('{Enter}');

// ❌ BAD: Doesn't trigger all events
fireEvent.change(input, { target: { value: 'text' } });
fireEvent.click(button);
```

### 3. Wait for Async Operations

```javascript
// ✅ GOOD: Waits for async operations
const message = await screen.findByText(/welcome/i);
await waitFor(() => {
  expect(mockFn).toHaveBeenCalled();
});

// ❌ BAD: Doesn't wait
const message = screen.getByText(/welcome/i); // Fails!
expect(mockFn).toHaveBeenCalled(); // Race condition!
```

### 4. Test User Behavior, Not Implementation

```javascript
// ✅ GOOD: Tests what user sees
it('should display success message after login', async () => {
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.click(submitButton);
  expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
});

// ❌ BAD: Tests implementation
it('should call setState with email', () => {
  // Don't test setState calls!
});
```

### 5. Clean Up After Tests

```javascript
// ✅ MSW automatically resets after each test
afterEach(() => {
  server.resetHandlers(); // Reset to default handlers
});

// ✅ Mock spies are cleaned up
afterEach(() => {
  jest.clearAllMocks();
});
```

### 6. Mock External Dependencies

```javascript
// ✅ GOOD: Mock API with MSW
server.use(errorHandlers.loginUnauthorized);

// ✅ GOOD: Mock callbacks
const mockOnSuccess = jest.fn();

// ❌ BAD: Don't test real API
// Never make actual API calls in tests
```

### 7. Meaningful Test Descriptions

```javascript
// ✅ GOOD: Clear what's being tested
it('should display success message on valid credentials', () => {});
it('should show error message when API returns 401', () => {});
it('should prevent multiple simultaneous submissions', () => {});

// ❌ BAD: Vague descriptions
it('works correctly', () => {});
it('test 1', () => {});
```

---

## Common Patterns

### Pattern 1: Testing Form Submission

```javascript
it('should submit form with user data', async () => {
  // Arrange
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  // Act
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(submitButton);

  // Assert
  const successMessage = await screen.findByText(/welcome back/i);
  expect(successMessage).toBeInTheDocument();
});
```

### Pattern 2: Testing Error Handling

```javascript
it('should display error message on failed login', async () => {
  // Override handler for this test
  server.use(errorHandlers.loginUnauthorized);

  render(<LoginForm />);
  const submitButton = screen.getByRole('button', { name: /login/i });

  await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
  await userEvent.click(submitButton);

  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toHaveTextContent(/invalid email or password/i);
});
```

### Pattern 3: Testing Accessibility

```javascript
it('should support keyboard navigation', async () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email/i);
  emailInput.focus();

  // Tab to password field
  await userEvent.tab();
  expect(screen.getByLabelText(/password/i)).toHaveFocus();

  // Tab to submit button
  await userEvent.tab();
  expect(screen.getByRole('button')).toHaveFocus();

  // Press Enter to submit
  await userEvent.keyboard('{Enter}');
  expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
});
```

### Pattern 4: Testing Error Boundaries

```javascript
it('should display fallback UI on error', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  consoleErrorSpy.mockRestore();
});
```

---

## Troubleshooting

### Problem: "Test is timing out"

**Solution:** Check for unresolved promises

```javascript
// Add timeout to findBy queries
const message = await screen.findByText(/welcome/i, {}, { timeout: 3000 });

// Or check if API is mocked correctly
console.log('MSW server listening:', server.listen);
```

### Problem: "Cannot find element by role"

**Solution:** Use getByRole with debugging

```javascript
// Use screen.debug() to see DOM
screen.debug();

// Find element with flexible matching
screen.getByRole('button', { name: /login/i }); // Not "Login Button"

// Check if element exists at all
expect(screen.queryByRole('button')).toBeInTheDocument();
```

### Problem: "userEvent is not triggering events"

**Solution:** Make sure to `await` userEvent calls

```javascript
// ✅ CORRECT: await userEvent
await userEvent.type(input, 'text');
await userEvent.click(button);

// ❌ WRONG: Not awaiting
userEvent.type(input, 'text'); // Missing await!
```

### Problem: "Test passes locally but fails in CI"

**Solution:** Common issues:

```javascript
// Make sure MSW server starts before tests
beforeAll(() => {
  server.listen();
});

// Ensure async operations complete
await waitFor(() => {
  expect(mockFn).toHaveBeenCalled();
});

// Don't use hardcoded timeouts
// Use waitFor or findBy instead
```

### Problem: "Console has warnings/errors"

**Solution:** Check setupTests.js

```javascript
// In setupTests.js, properly suppress error boundary logs
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error.mockRestore();
});
```

---

## Pro Tips

### Tip 1: Use screen Instead of Container

```javascript
// ✅ BETTER: Use screen (more semantic)
screen.getByRole('button', { name: /login/i });

// ⚠️ OK: Use container as last resort
const { container } = render(<App />);
container.querySelector('button');
```

### Tip 2: Get Focus on Focus Testing

```javascript
it('should focus email input on mount', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  
  // Initial focus
  expect(emailInput).not.toHaveFocus();
  
  emailInput.focus();
  expect(emailInput).toHaveFocus();
});
```

### Tip 3: Use beforeEach to Reduce Duplication

```javascript
describe('LoginForm', () => {
  let emailInput, passwordInput, submitButton;

  beforeEach(() => {
    render(<LoginForm />);
    emailInput = screen.getByLabelText(/email/i);
    passwordInput = screen.getByLabelText(/password/i);
    submitButton = screen.getByRole('button', { name: /login/i });
  });

  it('should do something', async () => {
    // Now can use emailInput, passwordInput, submitButton directly
  });
});
```

### Tip 4: Use test.each for Parametrized Tests

```javascript
test.each([
  ['valid@example.com', 'password123', true],
  ['invalid@example', 'short', false],
  ['', 'password', false],
])(
  'should validate email %s',
  (email, password, isValid) => {
    // Test logic here
  }
);
```

### Tip 5: Performance - Use React.lazy for Code Splitting

```javascript
// In your app
const LoginForm = React.lazy(() => import('./LoginForm'));

// In tests, just render normally
render(
  <Suspense fallback={<div>Loading...</div>}>
    <LoginForm />
  </Suspense>
);
```

---

## Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [MSW Docs](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Summary

You now have:

✅ **60+ LoginForm integration tests** covering success, errors, accessibility, and edge cases  
✅ **40+ ErrorBoundary tests** covering error catching, recovery, and stability  
✅ **Complete MSW setup** for API mocking  
✅ **Professional file structure** following industry standards  
✅ **Best practices** demonstrated throughout  

Ready to test React like a senior QA engineer! 🚀
