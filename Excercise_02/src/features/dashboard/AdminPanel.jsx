/**
 * TASK 3: AdminPanel Component (Lazy-Loaded)
 * 
 * This component demonstrates code splitting.
 * It won't be loaded until user navigates to /admin route.
 * 
 * Why code splitting is important:
 * ❌ Without splitting: AdminPanel bundled with main app (5MB+ bundle)
 *    - Users downloading it even if they never visit /admin
 *    - Slower initial page load
 * 
 * ✅ With splitting: AdminPanel in separate chunk (500KB)
 *    - Only downloaded when user visits /admin route
 *    - Faster initial page load
 *    - LoadingSpinner shows while downloading
 * 
 * Implementation:
 * - In AppRoutes.jsx: const AdminPanel = React.lazy(() => import('./AdminPanel'))
 * - In route: <Suspense fallback={<LoadingSpinner />}><AdminPanel /></Suspense>
 */

import React from 'react';

/**
 * AdminPanel Component
 * 
 * In production, this would include:
 * - Charts (recharts, chart.js)
 * - Analytics dashboards
 * - Admin controls
 * - Heavy dependencies
 * 
 * These heavy libraries are only loaded when user visits this route,
 * not on initial page load!
 */
export function AdminPanel() {
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p className="admin-subtitle">
          This component was lazy-loaded! Check Network tab to see separate chunk downloaded.
        </p>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>📈 Analytics</h2>
          <div className="placeholder-chart">
            <p>Chart Component (code-split)</p>
            <p className="note">
              In production, you'd use: recharts, Chart.js, or similar
            </p>
          </div>
        </section>

        <section className="admin-section">
          <h2>👥 User Management</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>john_admin</td>
                  <td>Admin</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>jane_editor</td>
                  <td>Editor</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>bob_viewer</td>
                  <td>Viewer</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>⚙️ Settings</h2>
          <div className="admin-settings">
            <label className="setting-item">
              <input type="checkbox" defaultChecked />
              Enable email notifications
            </label>
            <label className="setting-item">
              <input type="checkbox" defaultChecked />
              Enable analytics tracking
            </label>
            <label className="setting-item">
              <input type="checkbox" />
              Enable maintenance mode
            </label>
          </div>
        </section>
      </div>

      <style>{`
        .admin-panel {
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 40px;
        }

        .admin-header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
        }

        .admin-subtitle {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .admin-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }

        .admin-section {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        }

        .admin-section h2 {
          margin: 0 0 15px 0;
          font-size: 18px;
        }

        .placeholder-chart {
          background: white;
          padding: 40px;
          border-radius: 6px;
          text-align: center;
          color: #999;
        }

        .placeholder-chart .note {
          font-size: 12px;
          margin-top: 10px;
        }

        .admin-table {
          overflow-x: auto;
        }

        .admin-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .admin-table th,
        .admin-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .admin-table th {
          background: #f0f0f0;
          font-weight: 600;
        }

        .admin-table tr:hover {
          background: #fafafa;
        }

        .admin-settings {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .setting-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .setting-item:hover {
          background: white;
        }

        .setting-item input {
          margin-right: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;
