/**
 * App.jsx
 * 
 * Demo Application - Compound Components + React Portals
 * 
 * Demonstrates:
 * 1. TASK 1: Compound Tabs Component
 *    - Context API for implicit state management
 *    - Static properties for child components
 *    - Flexible composition
 * 
 * 2. TASK 2: Modal with React Portals
 *    - Rendering outside current DOM tree
 *    - Event bubbling through React hierarchy
 *    - Backdrop interaction
 */

import React, { useState } from 'react';
import Tabs from './components/ui/Tabs/Tabs';
import Modal from './components/ui/Modal/Modal';
import './App.css';

/**
 * ============================================
 * DEMO APP COMPONENT
 * ============================================
 */

function App() {
  /**
   * State cho Modal
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  /**
   * Handlers
   */
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTabChange = (index) => {
    console.log(`Tab changed to index: ${index}`);
    setActiveTab(index);
  };

  /**
   * Event bubbling demo
   * Click handler ở parent App component
   * Để chứng minh event bubble từ Modal render portal
   */
  const handleAppClick = (e) => {
    console.log('👆 Event bubbled to App component!', e.target.tagName);
  };

  return (
    <div className="app-container" onClick={handleAppClick}>
      <header className="app-header">
        <h1>🎨 Design System Components</h1>
        <p>Compound Components + React Portals</p>
      </header>

      <main className="app-main">
        {/* ================================ */}
        {/* TASK 1: COMPOUND TABS COMPONENT */ }
        {/* ================================ */}
        <section className="demo-section">
          <h2>📑 Task 1: Compound Tabs Component</h2>
          <p className="section-description">
            Demonstrates Compound Component Pattern with Context API.
            State (activeTabIndex) được quản lý implicit bằng Context.
          </p>

          {/* Demo Tabs - Basic Usage */}
          <div className="demo-box">
            <h3>Basic Tabs</h3>
            <Tabs initialIndex={0} onTabChange={handleTabChange}>
              <Tabs.List>
                <Tabs.Tab index={0}>📱 React</Tabs.Tab>
                <Tabs.Tab index={1}>🎨 Design</Tabs.Tab>
                <Tabs.Tab index={2}>⚙️ Performance</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel index={0}>
                <div className="tab-content">
                  <h4>React Basics</h4>
                  <p>
                    React is a JavaScript library for building user interfaces with
                    reusable components. It uses Virtual DOM for efficient updates.
                  </p>
                  <ul>
                    <li>Component-based architecture</li>
                    <li>Declarative UI</li>
                    <li>Efficient DOM updates</li>
                  </ul>
                </div>
              </Tabs.Panel>

              <Tabs.Panel index={1}>
                <div className="tab-content">
                  <h4>Design Systems</h4>
                  <p>
                    A Design System is a comprehensive guide to visual language and
                    reusable components that scale across projects.
                  </p>
                  <ul>
                    <li>Consistency</li>
                    <li>Scalability</li>
                    <li>Maintainability</li>
                  </ul>
                </div>
              </Tabs.Panel>

              <Tabs.Panel index={2}>
                <div className="tab-content">
                  <h4>Performance Optimization</h4>
                  <p>
                    Optimizing React apps involves memoization, code splitting, and
                    careful state management.
                  </p>
                  <ul>
                    <li>React.memo, useMemo, useCallback</li>
                    <li>Code splitting with React.lazy</li>
                    <li>Bundle size optimization</li>
                  </ul>
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>

          {/* Demo Tabs - Advanced: Flexible Layout */}
          <div className="demo-box">
            <h3>Flexible Layout (Custom Markup Between Components)</h3>
            <p>
              ✨ Chèn thêm markup tùy ý giữa Tabs.List, Tabs.Panel mà không làm hỏng logic
            </p>

            <Tabs initialIndex={0}>
              <Tabs.List>
                <Tabs.Tab index={0}>🏠 Home</Tabs.Tab>
                <Tabs.Tab index={1}>📚 Documentation</Tabs.Tab>
                <Tabs.Tab index={2}>💬 Support</Tabs.Tab>
              </Tabs.List>

              {/* Custom markup */}
              <hr style={{ margin: '0', border: 'none', borderTop: '1px solid #eee' }} />

              <Tabs.Panel index={0}>
                <div className="tab-content">
                  <h4>Welcome Home 👋</h4>
                  <p>
                    This is the home tab. Notice the custom &lt;hr&gt; element above
                    doesn't break the component!
                  </p>
                </div>
              </Tabs.Panel>

              <Tabs.Panel index={1}>
                <div className="tab-content">
                  <h4>📖 Documentation</h4>
                  <p>Read the full API documentation and guides here.</p>
                </div>
              </Tabs.Panel>

              <Tabs.Panel index={2}>
                <div className="tab-content">
                  <h4>💬 Get Support</h4>
                  <p>Contact our support team for help.</p>
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <h4>💡 Compound Pattern Benefits:</h4>
            <ul>
              <li>✅ <strong>No Prop Drilling:</strong> State via Context</li>
              <li>✅ <strong>Flexible Composition:</strong> Arrange components freely</li>
              <li>✅ <strong>Custom Markup:</strong> Insert HTML between components</li>
              <li>✅ <strong>Clean API:</strong> Tabs.Tab, Tabs.Panel, Tabs.List</li>
              <li>✅ <strong>Encapsulation:</strong> Internal state stays private</li>
            </ul>
          </div>
        </section>

        {/* ================================ */}
        {/* TASK 2: MODAL WITH PORTALS */}
        {/* ================================ */}
        <section className="demo-section">
          <h2>🪟 Task 2: Modal with React Portals</h2>
          <p className="section-description">
            Demonstrates React Portals for rendering outside DOM constraints.
            Event bubbling works through React tree despite Portal rendering.
          </p>

          {/* Constraint Container */}
          <div className="demo-box constraint-demo">
            <h3>🎯 Constraint Container (overflow: hidden)</h3>
            <p>
              ⚠️ Modal được render ở đây bằng Portals. Nếu không dùng Portals,
              nó sẽ bị cắt mất bởi overflow: hidden
            </p>

            <button className="button-primary" onClick={handleOpenModal}>
              🪟 Open Modal (Fixed Position, Full Screen)
            </button>

            {/* Nested Card with overflow */}
            <div className="card-overflow">
              <h4>Card with overflow: hidden</h4>
              <p>
                Modal nằm ngoài card này (ở document.body) nhưng
                React event vẫn bubble đến App component!
              </p>
              <button className="button-secondary" onClick={handleOpenModal}>
                Open Modal from Nested Card
              </button>
            </div>
          </div>

          {/* Modal Component (Using Portals) */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            closeOnEscape={true}
            closeOnBackdropClick={true}
          >
            <Modal.Header>
              🎨 Modal with React Portals
            </Modal.Header>

            <Modal.Body>
              <h4>Event Bubbling Demo 📡</h4>
              <p>
                Mặc dù modal được render ở <code>#modal-root</code> (ngoài React tree),
                event vẫn bubble lên App component!
              </p>
              <p>
                <strong>👉 Hãy check console khi click vào modal content.</strong>
              </p>

              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={(e) => {
                    console.log('✅ Button inside Modal clicked!');
                    console.log('   This event bubbled through React hierarchy');
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Click Me - Check Console!
                </button>
              </div>

              <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
                <h5>Portal Information:</h5>
                <ul>
                  <li><strong>Rendered into:</strong> #modal-root (outside React tree)</li>
                  <li><strong>Position:</strong> Fixed (full screen overlay)</li>
                  <li><strong>Event Bubbling:</strong> ✅ Still works via React fiber</li>
                  <li><strong>Z-index:</strong> 1000+ (above all content)</li>
                  <li><strong>Close on Esc:</strong> ✅ Enabled</li>
                  <li><strong>Close on Backdrop Click:</strong> ✅ Enabled</li>
                </ul>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>

          {/* Info Box */}
          <div className="info-box">
            <h4>💡 Portals Benefits:</h4>
            <ul>
              <li>✅ <strong>Escape DOM Constraints:</strong> overflow: hidden, z-index</li>
              <li>✅ <strong>Event Bubbling:</strong> Works through React tree</li>
              <li>✅ <strong>Fixed Positioning:</strong> Relative to viewport, not parent</li>
              <li>✅ <strong>Nested Modals:</strong> Multiple portals work seamlessly</li>
              <li>✅ <strong>Accessibility:</strong> Focus management, ARIA attributes</li>
            </ul>
          </div>
        </section>

        {/* ================================ */}
        {/* KEY CONCEPTS EXPLANATION */}
        {/* ================================ */}
        <section className="demo-section concepts">
          <h2>📚 Key Concepts</h2>

          <div className="concept-grid">
            <div className="concept-card">
              <h4>🧩 Compound Components</h4>
              <p>
                Một parent component cung cấp context/state cho các child components.
                Child components tự organize nhưng share state thông qua Context.
              </p>
              <strong>Benefits:</strong> Flexible, no prop drilling, clean API
            </div>

            <div className="concept-card">
              <h4>🌳 Context API</h4>
              <p>
                Cho phép pass state thông qua component tree mà không cần props
                tại mỗi level. Giải quyết prop drilling problem.
              </p>
              <strong>Use Case:</strong> Theme, Auth, Global UI State
            </div>

            <div className="concept-card">
              <h4>🪟 React Portals</h4>
              <p>
                Render React component ở một node khác trong DOM tree.
                Event vẫn bubble qua React fiber tree mặc dù DOM khác.
              </p>
              <strong>Use Case:</strong> Modals, Tooltips, Notifications
            </div>

            <div className="concept-card">
              <h4>📍 Static Properties</h4>
              <p>
                Attach child components như static properties của parent.
                Cho phép: {'<Tabs.List>'}, {'<Tabs.Tab>'}, {'<Tabs.Panel>'}
              </p>
              <strong>Pattern:</strong> Compound Component Pattern
            </div>
          </div>
        </section>
      </main>
      {/* Portal Root - Sẽ được tạo tự động nếu không tồn tại */}
     <div id="modal-root" style={{ display: 'none' }} />

      <footer className="app-footer">
        <p>🚀 Design System Components - Advanced React Patterns</p>
        <p>Compound Components + Context API + React Portals</p>
      </footer>
    </div>
  );
}

export default App;
