/**
 * Exercise 03 Page Wrapper
 * Design System: Compound Components & React Portals
 */

import React, { useState } from 'react';
import Tabs from './components/ui/Tabs/Tabs';
import Modal from './components/ui/Modal/Modal';
import './components/ui/Modal/Modal.module.css';
import './components/ui/Tabs/Tabs.module.css';

export function Exercise03Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleTabChange = (index) => {
    console.log(`Tab changed to index: ${index}`);
    setActiveTab(index);
  };

  const handleAppClick = (e) => {
    console.log('👆 Event bubbled to Exercise03Page!', e.target.tagName);
  };

  return (
    <div className="exercise-content" onClick={handleAppClick}>
      <div className="exercise-header">
        <h2 className="exercise-title">🎨 Design System Mastery</h2>
        <p className="exercise-description">
          Xây dựng reusable components sử dụng hai pattern quan trọng:
          <br />• <strong>Task 1:</strong> Compound Components với Context API
          <br />• <strong>Task 2:</strong> React Portals cho modals và overlays
        </p>
      </div>

      <section className="demo-section">
        <h3>📑 Compound Tabs Component Demo</h3>
        <p className="section-description">
          Flexible component composition pattern. Parent manages state implicitly,
          children components receive context without prop drilling.
        </p>

        <div className="demo-box">
          <Tabs initialIndex={0} onTabChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Tab index={0}>🎯 Compound Pattern</Tabs.Tab>
              <Tabs.Tab index={1}>🌐 Portals</Tabs.Tab>
              <Tabs.Tab index={2}>💻 Interactive</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel index={0}>
              <div className="tab-content">
                <h4>Compound Component Pattern</h4>
                <p>
                  Allows creating flexible, composable components where parent and children
                  components share state implicitly through Context API.
                </p>
                <ul>
                  <li>✅ Better API design - more intuitive</li>
                  <li>✅ Implicit state sharing - no prop drilling</li>
                  <li>✅ Maximum flexibility - children can be arranged</li>
                  <li>✅ Better separation of concerns</li>
                </ul>
              </div>
            </Tabs.Panel>

            <Tabs.Panel index={1}>
              <div className="tab-content">
                <h4>React Portals</h4>
                <p>
                  Portals provide a first-class way to render children into a DOM node
                  that exists outside the DOM hierarchy of the parent component.
                </p>
                <ul>
                  <li>✅ Escape CSS overflow/stacking context</li>
                  <li>✅ Modals above everything else</li>
                  <li>✅ Cleaner DOM structure</li>
                  <li>✅ Event bubbling still works</li>
                </ul>
              </div>
            </Tabs.Panel>

            <Tabs.Panel index={2}>
              <div className="tab-content">
                <h4>Try Interactive Demo</h4>
                <p>
                  Click the button below to open a modal using React Portals.
                  Notice how events still bubble to this component!
                </p>
                <button
                  className="btn-demo"
                  onClick={handleOpenModal}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  📭 Open Modal
                </button>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </section>

      {/* Modal with Portal */}
      {isModalOpen && (
        <Modal
          title="🎉 Modal via Portal"
          onClose={handleCloseModal}
          className="modal-demo"
        >
          <p>
            This modal is rendered using React.createPortal() into a separate DOM node
            (#modal-root), but it still receives events from the parent!
          </p>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Try clicking inside and notice the logs in console showing event bubbling.
          </p>
          <button
            onClick={handleCloseModal}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Close Modal
          </button>
        </Modal>
      )}

      <div className="learning-notes">
        <h3>💡 Key Design Patterns:</h3>
        <ul>
          <li><strong>Compound Components:</strong> Parent-child components with implicit state sharing</li>
          <li><strong>Context API:</strong> Avoids prop drilling by sharing context among components</li>
          <li><strong>React.createPortal:</strong> Render component outside DOM hierarchy</li>
          <li><strong>Higher-order Components (HOC):</strong> Advanced pattern for code reuse</li>
          <li><strong>Render Props:</strong> Alternative for sharing logic between components</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise03Page;
