/**
 * TASK 3: AppRoutes Component
 * 
 * Demonstrates React.lazy and Suspense for Code Splitting
 * 
 * How Code Splitting Works:
 * 1. React.lazy(() => import('...')) → Lazy loads component
 * 2. Suspense boundary wraps lazy component
 * 3. While loading: Shows fallback (LoadingSpinner)
 * 4. When ready: Renders actual component (AdminPanel)
 * 
 * Bundle Impact:
 * ❌ Without splitting:
 *    - Main bundle: 5MB (includes AdminPanel)
 *    - All downloaded on initial page load
 * 
 * ✅ With splitting:
 *    - Main bundle: 400KB
 *    - AdminPanel chunk: 300KB
 *    - AdminPanel chunk only downloaded when user visits /admin
 *    - Initial page load 10x faster!
 * 
 * In real app, use:
 * - BrowserRouter with routes
 * - React Router for navigation
 * - Multiple lazy-loaded route components
 */

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner'
import Dashboard from './features/dashboard/Dashboard'
import AdminPanel from './features/dashboard/AdminPanel'

/**
 * Lazy Load Heavy Components
 * 
 * These imports create separate chunks:
 * - Main chunk: Contains Dashboard (lightweight)
 * - Admin chunk: Contains AdminPanel (heavy, downloads on demand)
 * 
 * Each import() returns a Promise that resolves to the module
 * React handles the async loading with Suspense
 */

/**
 * AppRoutes Component
 * 
 * Demonstrates routing with code splitting
 * In production, use React Router or similar
 */
export function AppRoutes() {
  const [currentRoute, setCurrentRoute] = React.useState('dashboard');

  return (
    <div className="app-routes">
      {/* Navigation */}
      <nav className="routes-nav">
        <button
          className={currentRoute === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentRoute('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={currentRoute === 'admin' ? 'active' : ''}
          onClick={() => setCurrentRoute('admin')}
        >
          ⚙️ Admin Panel (Code-Split)
        </button>
      </nav>

      {/* Routes */}
      <main className="routes-content">
        {currentRoute === 'dashboard' && (
          <Dashboard />
        )}

        {currentRoute === 'admin' && (
          /**
           * Suspense Boundary
           * 
           * How it works:
           * 1. When user clicks "Admin Panel" button, currentRoute changes
           * 2. This renders <AdminPanel /> which is lazy-loaded
           * 3. While AdminPanel is downloading, Suspense shows fallback
           * 4. Once downloaded, Suspense renders actual AdminPanel
           * 
           * Fallback options:
           * - LoadingSpinner: Animated loading indicator
           * - Could also be: Skeleton screen, placeholder, spinner
           * 
           * Benefits:
           * - User sees "Loading..." instead of blank/broken page
           * - AdminPanel heavy dependencies not loaded until needed
           * - Better time-to-interactive for initial page load
           */
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPanel />
          </Suspense>
        )}
      </main>

      <style>{`
        .app-routes {
          min-height: 100vh;
        }

        .routes-nav {
          display: flex;
          gap: 10px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-bottom: 2px solid #667eea;
        }

        .routes-nav button {
          padding: 10px 20px;
          border: 2px solid transparent;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .routes-nav button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .routes-nav button.active {
          background: white;
          color: #667eea;
          border-color: white;
        }

        .routes-content {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AppRoutes;
