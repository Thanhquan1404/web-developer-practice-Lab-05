/**
 * App.jsx - Main Application
 * 
 * Integration of all Performance Optimization Techniques:
 * 1. Task 1: useMemo + React.memo for large lists
 * 2. Task 2: useCallback for function stabilization
 * 3. Task 3: React.lazy + Suspense for code splitting
 */

import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';

/**
 * App Component
 * 
 * Entry point that demonstrates all three optimization techniques:
 * - Task 1: Dashboard with 10,000 items using useMemo + React.memo
 * - Task 2: Function stabilization with useCallback
 * - Task 3: Code splitting with React.lazy + Suspense
 */
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🚀 React Performance Optimization Lab</h1>
        <p className="app-subtitle">
          Memoization + Code Splitting = Lightning-fast React Apps
        </p>
      </header>

      <AppRoutes />
    </div>
  );
}

export default App;
