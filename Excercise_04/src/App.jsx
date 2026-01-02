/**
 * App Component - QA Testing Demo
 *
 * This application demonstrates:
 * 1. Integration Testing - LoginForm with API mocking
 * 2. Error Boundary Testing - Graceful error handling
 *
 * The app includes interactive examples and is fully tested.
 */

import React, { useState } from 'react';
import { ErrorBoundary } from './components/common';
import LoginForm from './features/auth/components/LoginForm';
import styles from './App.module.css';

/**
 * Component that intentionally throws an error
 * Used to demonstrate ErrorBoundary functionality
 */
const BombComponent = ({ active }) => {
  if (active) {
    throw new Error('💣 Component crashed!');
  }
  return <p>This component is safe</p>;
};

/**
 * Demo Section Component
 * Displays a demo with title and content
 */
const DemoSection = ({ title, children }) => (
  <section className={styles.demoSection}>
    <h2>{title}</h2>
    {children}
  </section>
);

/**
 * Main App Component
 */
const App = () => {
  const [showBomb, setShowBomb] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    console.log('User logged in:', user);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>🧪 React Testing Library & Jest Demo</h1>
        <p className={styles.subtitle}>
          Integration Testing + Error Boundaries
        </p>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* SECTION 1: LoginForm Integration Testing */}
        <DemoSection title="1️⃣ LoginForm Integration Testing">
          <div className={styles.demoContent}>
            <p className={styles.description}>
              <strong>Test Philosophy:</strong> Test what the user sees, not
              internal state.
            </p>

            <div className={styles.twoColumn}>
              <div className={styles.column}>
                <h3>Component Under Test</h3>
                <ErrorBoundary>
                  <LoginForm onSuccess={handleLoginSuccess} />
                </ErrorBoundary>

                {loggedInUser && (
                  <div className={styles.infoBox}>
                    <strong>Current User:</strong>
                    <br />
                    {loggedInUser.email}
                  </div>
                )}
              </div>

              <div className={styles.column}>
                <h3>Test Coverage</h3>
                <ul className={styles.testList}>
                  <li>✅ User can type email & password</li>
                  <li>✅ Form submits with correct data</li>
                  <li>✅ API is called correctly</li>
                  <li>✅ Success message displays</li>
                  <li>✅ Loading state works</li>
                  <li>✅ Error messages show</li>
                  <li>✅ Form field validation</li>
                  <li>✅ Keyboard navigation</li>
                  <li>✅ Screen reader support</li>
                </ul>
              </div>
            </div>

            <div className={styles.codeBox}>
              <h3>Test Credentials (Demo)</h3>
              <p>
                <strong>Email:</strong> any email (e.g., user@example.com)
              </p>
              <p>
                <strong>Password:</strong> any password (e.g., password123)
              </p>
              <p className={styles.note}>
                💡 Tests use MSW (Mock Service Worker) to intercept API calls
              </p>
            </div>
          </div>
        </DemoSection>

        {/* SECTION 2: Error Boundary Testing */}
        <DemoSection title="2️⃣ Error Boundary Testing">
          <div className={styles.demoContent}>
            <p className={styles.description}>
              <strong>Goal:</strong> Prevent "white screen of death" by catching
              errors gracefully.
            </p>

            <div className={styles.twoColumn}>
              <div className={styles.column}>
                <h3>Error Boundary Demo</h3>

                {/* Safety note */}
                <div className={styles.infoBox}>
                  <strong>⚠️ About the "Bomb":</strong>
                  <p>
                    Click "Trigger Error" to render a component that throws an
                    error. The ErrorBoundary catches it and shows a fallback UI.
                  </p>
                </div>

                {/* Bomb Demo */}
                <div className={styles.bombDemo}>
                  <ErrorBoundary>
                    <BombComponent active={showBomb} />
                  </ErrorBoundary>
                </div>

                <button
                  className={`${styles.button} ${
                    showBomb ? styles.buttonDanger : styles.buttonPrimary
                  }`}
                  onClick={() => setShowBomb(!showBomb)}
                >
                  {showBomb ? '✅ Reset Component' : '💣 Trigger Error'}
                </button>
              </div>

              <div className={styles.column}>
                <h3>Test Coverage</h3>
                <ul className={styles.testList}>
                  <li>✅ Error boundary catches errors</li>
                  <li>✅ Fallback UI displays</li>
                  <li>✅ "Try again" button works</li>
                  <li>✅ App doesn't completely crash</li>
                  <li>✅ Errors are logged</li>
                  <li>✅ Console is clean in tests</li>
                  <li>✅ Multiple boundaries work</li>
                  <li>✅ Component recovery works</li>
                  <li>✅ Accessibility maintained</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* SECTION 3: Testing Concepts */}
        <DemoSection title="📚 Testing Concepts">
          <div className={styles.conceptGrid}>
            <div className={styles.concept}>
              <h3>🎯 Arrange-Act-Assert</h3>
              <p>
                <strong>Arrange:</strong> Set up test conditions
                <br />
                <strong>Act:</strong> Perform user action
                <br />
                <strong>Assert:</strong> Check result
              </p>
            </div>

            <div className={styles.concept}>
              <h3>👤 User-Centric Testing</h3>
              <p>
                Test what users see and do, not internal implementation details.
              </p>
            </div>

            <div className={styles.concept}>
              <h3>🎪 Mock Service Worker</h3>
              <p>
                MSW intercepts fetch requests and returns mock data. Enables
                testing without a real backend.
              </p>
            </div>

            <div className={styles.concept}>
              <h3>⌨️ userEvent</h3>
              <p>
                More realistic than fireEvent. Simulates actual user
                interactions like typing and clicking.
              </p>
            </div>

            <div className={styles.concept}>
              <h3>🔍 Query Priorities</h3>
              <p>
                Prefer: getByRole → getByLabelText → getByText
                <br />
                Avoid: querySelector, testid (unless necessary)
              </p>
            </div>

            <div className={styles.concept}>
              <h3>⏳ Async Testing</h3>
              <p>
                Use findByText for async operations. Use waitFor for complex
                conditions.
              </p>
            </div>
          </div>
        </DemoSection>

        {/* SECTION 4: Running Tests */}
        <DemoSection title="🚀 How to Run Tests">
          <div className={styles.codeBox}>
            <h3>Command Line</h3>
            <pre className={styles.code}>
{`# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test LoginForm.test.js

# Run with coverage report
npm test -- --coverage

# Run only error boundary tests
npm test ErrorBoundary.test.js`}
            </pre>
          </div>
        </DemoSection>

        {/* SECTION 5: File Structure */}
        <DemoSection title="📁 File Structure">
          <div className={styles.codeBox}>
            <h3>Project Organization</h3>
            <pre className={styles.code}>
{`src/
├── setupTests.js                    (Jest setup)
├── features/
│   └── auth/
│       ├── api/
│       │   └── authApi.js
│       ├── components/
│       │   ├── LoginForm.jsx
│       │   └── LoginForm.module.css
│       └── __tests__/
│           └── LoginForm.test.js
├── components/
│   └── common/
│       ├── ErrorBoundary.jsx
│       ├── ErrorBoundary.module.css
│       └── __tests__/
│           └── ErrorBoundary.test.js
└── __tests__/
    └── mocks/
        ├── handlers.js              (MSW handlers)
        └── server.js                (MSW server)`}
            </pre>
          </div>
        </DemoSection>

        {/* SECTION 6: Dependencies */}
        <DemoSection title="📦 Testing Dependencies">
          <div className={styles.codeBox}>
            <h3>Required Packages</h3>
            <pre className={styles.code}>
{`{
  "devDependencies": {
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/user-event": "^14.x",
    "jest": "^29.x",
    "jest-environment-jsdom": "^29.x",
    "msw": "^1.x"
  },
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-error-boundary": "^4.x",
    "prop-types": "^15.x"
  }
}`}
            </pre>
          </div>
        </DemoSection>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Built with React Testing Library & Jest | Demonstrating user-centric
          testing
        </p>
      </footer>
    </div>
  );
};

export default App;
