/**
 * Exercise 01 Page Wrapper
 * State Management with useReducer (FSM) & Redux Toolkit
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UserProfile from './features/user-profile/UserProfile';
import { ShoppingCart } from './features/cart/ShoppingCart';
import './features/user-profile/UserProfile.css';
import './features/cart/ShoppingCart.css';

export function Exercise01Page() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Provider store={store}>
      <div className="exercise-content">
        <div className="exercise-header">
          <h2 className="exercise-title">⚡ State Management Mastery</h2>
          <p className="exercise-description">
            Học hai cách quản lý state mạnh mẽ:
            <br />• <strong>Part 1:</strong> useReducer với Finite State Machine (FSM) pattern
            <br />• <strong>Part 2:</strong> Redux Toolkit cho quản lý state global
          </p>
        </div>

        <div className="tab-selector">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            📋 Part 1: FSM Pattern (useReducer)
          </button>
          <button
            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            🛒 Part 2: Redux Toolkit (Shopping Cart)
          </button>
        </div>

        <div className="tab-content-wrapper">
          {activeTab === 'profile' && (
            <section className="tab-pane active">
              <UserProfile />
            </section>
          )}

          {activeTab === 'cart' && (
            <section className="tab-pane active">
              <ShoppingCart />
            </section>
          )}
        </div>

        <div className="learning-notes">
          <h3>💡 Key Learnings:</h3>
          <ul>
            <li><strong>FSM Pattern:</strong> Ensures state transitions are deterministic and prevents impossible states</li>
            <li><strong>Redux Toolkit:</strong> Simplifies Redux with less boilerplate code</li>
            <li><strong>Memoized Selectors:</strong> Optimize performance by memoizing selector computations</li>
            <li><strong>Immer:</strong> RTK uses Immer to allow "mutating" state immutably</li>
          </ul>
        </div>
      </div>
    </Provider>
  );
}

export default Exercise01Page;
