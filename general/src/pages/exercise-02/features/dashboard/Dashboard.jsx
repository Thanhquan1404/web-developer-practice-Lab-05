/**
 * TASK 1 & 2: Dashboard Component
 * 
 * Demonstrates:
 * 1. useMemo - Expensive sorting calculation
 * 2. React.memo - Component memoization
 * 3. useCallback - Function stabilization (TASK 2)
 * 
 * Performance Challenge:
 * - 10,000 items need to be sorted
 * - Theme toggle should NOT trigger re-sort or item re-renders
 * - This requires proper memoization at every level
 */

import React, { useState, useCallback, useMemo } from 'react';
import LargeList from './LargeList';
import './Dashboard.css';

/**
 * Generate mock items for testing
 * Creates 10,000 items with random data
 */
function generateMockItems(count = 10000) {
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]} ${Math.floor(i / 6)}`,
    price: Math.random() * 1000,
  }));
}

export function Dashboard() {
  // UI State
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [sortKey, setSortKey] = useState('id');

  // Data State: Memoized items (never changes in this demo)
  const mockItems = useMemo(() => generateMockItems(10000), []);

  /**
   * TASK 2: useCallback - Stabilize function reference
   * 
   * Problem:
   * ❌ Without useCallback:
   *    const handleDelete = (id) => { ... }
   *    Every render creates NEW function → React.memo sees "new prop"
   *    → ListItems re-render even with React.memo!
   * 
   * Solution:
   * ✅ With useCallback:
   *    Function reference stays the same between renders
   *    → React.memo sees "same prop reference"
   *    → ListItems DON'T re-render!
   * 
   * Dependency array: []
   * - Empty because handleDelete doesn't depend on any state
   * - Function is created once and reused forever
   * 
   * Verification:
   * - Open browser console
   * - Click "Toggle Theme" button
   * - Check console logs:
   *   • WITHOUT useCallback: You'll see "🔄 ListItem X rendered" logs (BAD)
   *   • WITH useCallback: Console will be quiet after first render (GOOD)
   */
  const handleDeleteItem = useCallback((itemId) => {
    console.log(`🗑️ Item ${itemId} deleted`);
    // In real app: Update state or call API
  }, []); // Empty dependency array = function never changes

  /**
   * Render Logic
   */
  const containerClass = isDarkTheme ? 'dashboard dark-theme' : 'dashboard light-theme';

  return (
    <div className={containerClass}>
      {/* Header */}
      <header className="dashboard-header">
        <h1>🚀 Performance Optimization Demo</h1>
        <p className="subtitle">
          10,000 items + useMemo + React.memo + useCallback = Smooth 60 FPS
        </p>
      </header>

      {/* Controls */}
      <div className="dashboard-controls">
        <div className="control-group">
          <label htmlFor="theme-toggle" className="control-label">
            Theme:
          </label>
          <button
            id="theme-toggle"
            className="control-button theme-button"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
          >
            {isDarkTheme ? '🌙 Dark' : '☀️ Light'}
          </button>
          <p className="control-hint">
            Toggle theme rapidly. List won't lag thanks to memoization!
          </p>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select" className="control-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="control-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <p className="control-hint">
            Changing sort triggers re-sorting. Sorting is cached by useMemo.
          </p>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="performance-info">
        <h3>📊 Performance Optimization Techniques Used:</h3>
        <ul>
          <li>
            <strong>useMemo:</strong> Sorting 10,000 items is cached, only runs when 
            items or sortKey changes, NOT on theme toggle!
          </li>
          <li>
            <strong>React.memo:</strong> Each ListItem checks if props changed. 
            No change = no re-render!
          </li>
          <li>
            <strong>useCallback:</strong> handleDeleteItem function reference is stable, 
            preventing ListItem re-renders!
          </li>
        </ul>

        <h3>🔍 How to Verify in DevTools:</h3>
        <ol>
          <li>Open Chrome DevTools → Profiler tab</li>
          <li>Press red circle to start recording</li>
          <li>Click "Toggle Theme" button rapidly (3-4 times)</li>
          <li>Stop recording</li>
          <li>
            Result: You'll see gray bars (no render) for ListItems, 
            not yellow/green (would indicate re-render)
          </li>
        </ol>
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        <LargeList
          items={mockItems}
          sortKey={sortKey}
          onDeleteItem={handleDeleteItem}
        />
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          📈 Without these optimizations, toggling theme would cause 1000ms+ lag. 
          With memoization, it stays under 16ms (60 FPS)!
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
