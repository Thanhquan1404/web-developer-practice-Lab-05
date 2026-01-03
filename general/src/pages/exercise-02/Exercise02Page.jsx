/**
 * Exercise 02 Page Wrapper
 * React Performance Optimization
 */

import React from 'react';
import { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import './features/dashboard/Dashboard.css';
import './components/common/LoadingSpinner.css';

export function Exercise02Page() {
  return (
    <div className="exercise-content">
      <div className="exercise-header">
        <h2 className="exercise-title">🚀 Performance Optimization Mastery</h2>
        <p className="exercise-description">
          Ba kỹ thuật quan trọng để tối ưu hiệu năng React:
          <br />• <strong>Task 1:</strong> useMemo + React.memo cho danh sách lớn (10,000 items)
          <br />• <strong>Task 2:</strong> useCallback để stabilize hàm callback
          <br />• <strong>Task 3:</strong> React.lazy + Suspense cho code splitting
        </p>
      </div>

      <Suspense fallback={<div className="loading-container">Loading...</div>}>
        <AppRoutes />
      </Suspense>

      <div className="learning-notes">
        <h3>💡 Key Concepts:</h3>
        <ul>
          <li><strong>useMemo:</strong> Memoize expensive computations, return values từ dependencies</li>
          <li><strong>React.memo:</strong> Memoize functional components, skip re-render nếu props không đổi</li>
          <li><strong>useCallback:</strong> Memoize functions, giữ referential equality across renders</li>
          <li><strong>Code Splitting:</strong> Lazy load components để giảm bundle size</li>
          <li><strong>Profiler:</strong> Sử dụng React DevTools để identify performance bottlenecks</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise02Page;
