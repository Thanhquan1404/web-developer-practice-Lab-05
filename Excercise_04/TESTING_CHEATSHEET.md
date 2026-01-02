# 🚀 Quick Reference - React Testing Library Cheat Sheet

## Most Used Queries

### By Role (Best Practice)
```javascript
// Buttons, links
screen.getByRole('button', { name: /click me/i });
screen.getByRole('link', { name: /home/i });

// Forms
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('checkbox', { name: /remember me/i });
screen.getByRole('combobox'); // select dropdown

// Table
screen.getByRole('table');
screen.getByRole('row');
screen.getByRole('columnheader');

// Alert
screen.getByRole('alert');
screen.getByRole('status');
```

### By Label
```javascript
screen.getByLabelText(/email address/i);
screen.getByLabelText(/password/i);
```

### By Text
```javascript
screen.getByText(/welcome back/i);
screen.getByText('Exact text match');
```

### By Placeholder
```javascript
screen.getByPlaceholderText(/enter email/i);
```

### By Test ID (Last Resort)
```javascript
screen.getByTestId('custom-element');
```

## Async Queries

```javascript
// Wait for element to appear (Best for API calls)
const element = await screen.findByText(/welcome/i);

// Wait for condition
await waitFor(() => {
  expect(mockFn).toHaveBeenCalled();
});

// Get element if it exists now (no waiting)
const element = screen.queryByText(/welcome/i);
expect(element).not.toBeInTheDocument();
```

## User Interactions

```javascript
// Typing
await userEvent.type(input, 'text');
await userEvent.type(input, 'test@example.com');

// Clicking
await userEvent.click(button);
await userEvent.dblClick(element); // Double click

// Keyboard
await userEvent.keyboard('{Enter}');
await userEvent.keyboard('{Escape}');
await userEvent.keyboard('{Tab}');

// Selection
await userEvent.selectOptions(select, 'option1');

// Hover
await userEvent.hover(element);
await userEvent.unhover(element);

// Upload
await userEvent.upload(input, file);

// Tab navigation
await userEvent.tab(); // Tab to next
await userEvent.tab({ shift: true }); // Shift+Tab backward
```

## Assertions

### DOM Assertions
```javascript
// Visibility
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeHidden();

// Input values
expect(input).toHaveValue('expected value');
expect(checkbox).toBeChecked();

// Attributes
expect(button).toBeDisabled();
expect(button).toBeEnabled();
expect(element).toHaveAttribute('role', 'alert');
expect(element).toHaveClass('active');

// Text content
expect(element).toHaveTextContent('expected text');
expect(element).toHaveTextContent(/regexp/i);

// Styles
expect(element).toHaveStyle('color: red');
expect(element).toHaveStyle({ color: 'red' });

// Focus
expect(input).toHaveFocus();

// Form validation
expect(input).toBeRequired();
expect(input).toBeInvalid();
```

### Mock Assertions
```javascript
// Called
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);

// Called with
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg1');

// Call count
expect(mockFn).toHaveBeenCalledTimes(3);
expect(mockFn.mock.calls.length).toBe(3);
```

## Test Structure

```javascript
describe('Component Name', () => {
  // Setup before each test
  beforeEach(() => {
    render(<MyComponent />);
  });

  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case
  it('should do something', async () => {
    // ARRANGE
    const button = screen.getByRole('button');
    
    // ACT
    await userEvent.click(button);
    
    // ASSERT
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });
});
```

## MSW Setup

### Handler Override Per Test
```javascript
it('should handle error', async () => {
  // Override handler for this test only
  server.use(errorHandlers.notFound);
  
  render(<MyComponent />);
  // Test error handling...
});
```

### Default Handlers (Applied to All Tests)
```javascript
// setupTests.js
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // Reset to defaults
afterAll(() => server.close());
```

## Common Patterns

### Testing Form Submit
```javascript
it('should submit form', async () => {
  render(<LoginForm />);
  
  await userEvent.type(
    screen.getByLabelText(/email/i),
    'user@example.com'
  );
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});
```

### Testing Error Display
```javascript
it('should show error', async () => {
  server.use(errorHandlers.loginFailed);
  
  render(<LoginForm />);
  // ... fill form ...
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(await screen.findByRole('alert')).toHaveTextContent(/error/i);
});
```

### Testing Keyboard Navigation
```javascript
it('should support keyboard', async () => {
  render(<LoginForm />);
  
  const email = screen.getByLabelText(/email/i);
  email.focus();
  
  await userEvent.tab();
  expect(screen.getByLabelText(/password/i)).toHaveFocus();
  
  await userEvent.keyboard('{Enter}');
  // ... verify submission ...
});
```

### Testing Error Boundary
```javascript
it('should show fallback UI', () => {
  const spy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <ComponentThatThrows />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i))
    .toBeInTheDocument();

  spy.mockRestore();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# Specific file
npm test LoginForm.test.js

# Specific test pattern
npm test -- --testNamePattern="should login"

# Debug
npm test -- --inspect-brk --runInBand
```

## Debugging

### Print DOM
```javascript
screen.debug(); // Prints entire DOM
screen.debug(element); // Print specific element
```

### Query Helper
```javascript
// See all available roles
screen.logTestingPlaygroundURL(); // Copy to testing-playground.com
```

### Console in Tests
```javascript
// Log values
console.log('Email input:', emailInput.value);

// Check mock calls
console.log('Mock calls:', mockFn.mock.calls);
```

## Best Practices Checklist

- ✅ Use `await` with async queries (findBy, userEvent)
- ✅ Test user behavior, not implementation
- ✅ Use semantic queries (getByRole, getByLabelText)
- ✅ Prefer userEvent over fireEvent
- ✅ Keep tests focused (one thing per test)
- ✅ Use meaningful test descriptions
- ✅ Clean up after tests (beforeEach/afterEach)
- ✅ Mock external dependencies (API, services)
- ✅ Test accessibility (roles, labels, focus)
- ✅ Use data-testid only as last resort

## Common Mistakes

❌ Not awaiting async operations
```javascript
// WRONG
const element = screen.getByText(/welcome/i);

// RIGHT
const element = await screen.findByText(/welcome/i);
```

❌ Testing implementation details
```javascript
// WRONG
expect(component.state.isLoading).toBe(false);

// RIGHT
expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
```

❌ Using unstable selectors
```javascript
// WRONG
container.querySelector('div > button:nth-child(2)');

// RIGHT
screen.getByRole('button', { name: /submit/i });
```

❌ Not mocking external calls
```javascript
// WRONG - Makes real API call
// Don't do this in tests!

// RIGHT - Use MSW
server.use(handlers.successResponse);
```

---

**Ready to write resilient tests!** 🧪
