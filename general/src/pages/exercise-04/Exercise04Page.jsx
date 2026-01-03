/**
 * Exercise 04 Page Wrapper
 * React Testing Library & Jest
 */

import React, { useState } from 'react';
import LoginForm from './features/auth/components/LoginForm';
import ErrorBoundary from './components/common/ErrorBoundary';
import './features/auth/components/LoginForm.module.css';
import './components/common/ErrorBoundary.module.css';

export function Exercise04Page() {
  const [testResults, setTestResults] = useState(null);
  const [showErrorExample, setShowErrorExample] = useState(false);

  const handleThrowError = () => {
    setShowErrorExample(true);
  };

  return (
    <div className="exercise-content">
      <div className="exercise-header">
        <h2 className="exercise-title">✅ Testing Mastery</h2>
        <p className="exercise-description">
          Comprehensive testing strategies cho React applications:
          <br />• <strong>Task 1:</strong> Integration testing với React Testing Library
          <br />• <strong>Task 2:</strong> Mock Server (MSW) để test async operations
          <br />• <strong>Task 3:</strong> Error Boundaries để handle errors gracefully
        </p>
      </div>

      <div className="testing-container">
        {/* Section 1: Login Form Testing */}
        <section className="demo-section">
          <h3>🔐 Task 1 & 2: LoginForm with Integration Tests</h3>
          <p className="section-description">
            Form testing with React Testing Library + Mock Service Worker (MSW)
            for mocking API calls.
          </p>

          <div className="demo-box">
            <ErrorBoundary>
              <LoginForm />
            </ErrorBoundary>
          </div>

          <div className="test-info">
            <strong>What gets tested:</strong>
            <ul>
              <li>✓ Form rendering and initial state</li>
              <li>✓ User input interactions (typing in inputs)</li>
              <li>✓ Form submission and API calls</li>
              <li>✓ Success/error message display</li>
              <li>✓ Mocking API responses with MSW</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Error Boundary Testing */}
        <section className="demo-section">
          <h3>🛡️ Task 3: Error Boundary Demo</h3>
          <p className="section-description">
            Error Boundaries catch JavaScript errors in child components
            and display a fallback UI instead of crashing the whole app.
          </p>

          <div className="demo-box">
            <div style={{ marginBottom: '20px' }}>
              <p>
                Click the button below to trigger an error in a child component.
                The Error Boundary will catch it and display a fallback UI.
              </p>
              <button
                onClick={handleThrowError}
                className="btn-danger"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                💥 Trigger Error
              </button>
            </div>

            <ErrorBoundary>
              {showErrorExample ? (
                <BuggyComponent />
              ) : (
                <div style={{ padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '6px' }}>
                  <p>✓ No errors. Component is rendering fine.</p>
                </div>
              )}
            </ErrorBoundary>
          </div>

          <div className="test-info">
            <strong>Error Boundary benefits:</strong>
            <ul>
              <li>✓ Graceful error handling</li>
              <li>✓ Prevents white screen of death</li>
              <li>✓ Better user experience</li>
              <li>✓ Error logging and recovery</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Testing Concepts */}
        <section className="demo-section">
          <h3>📚 Key Testing Concepts</h3>

          <div className="concepts-grid">
            <div className="concept-card">
              <h4>🧪 Unit Testing</h4>
              <p>Test individual functions and components in isolation.</p>
              <code>
                expect(sum(2, 3)).toBe(5);
              </code>
            </div>

            <div className="concept-card">
              <h4>🔗 Integration Testing</h4>
              <p>Test how multiple components work together.</p>
              <code>
                render(&lt;LoginForm /&gt;)
              </code>
            </div>

            <div className="concept-card">
              <h4>🎭 Mock Service Worker</h4>
              <p>Mock API calls without mocking fetch directly.</p>
              <code>
                server.use(rest.post('/login', ...))
              </code>
            </div>

            <div className="concept-card">
              <h4>⚠️ Error Boundaries</h4>
              <p>Catch errors in component tree and recover.</p>
              <code>
                componentDidCatch(error, info)
              </code>
            </div>
          </div>
        </section>
      </div>

      <div className="learning-notes">
        <h3>💡 Testing Best Practices:</h3>
        <ul>
          <li><strong>Test Behavior, Not Implementation:</strong> Focus on what users see</li>
          <li><strong>Use RTL Queries Properly:</strong> getByRole {'>'} getByTestId</li>
          <li><strong>Mock External Dependencies:</strong> APIs, timers, etc.</li>
          <li><strong>Avoid Testing Implementation Details:</strong> Test user interactions</li>
          <li><strong>Aim for Good Coverage:</strong> Meaningful tests, not just high coverage %</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Buggy Component - Used to demonstrate Error Boundary
 */
function BuggyComponent() {
  throw new Error('💥 This is a demonstration error from the child component!');
}

export default Exercise04Page;
