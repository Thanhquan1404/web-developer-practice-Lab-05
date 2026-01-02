/**
 * Main App Component
 * 
 * Thiết lập Provider cho Redux store
 * Render UserProfile (Part 1) và ShoppingCart (Part 2)
 */

import { Provider } from 'react-redux';
import store from './store';
import UserProfile from './features/user-profile/UserProfile';
import { ShoppingCart } from './features/cart/ShoppingCart';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>React Advanced - State Management</h1>
          <p className="subtitle">useReducer FSM + Redux Toolkit Shopping Cart</p>

          <nav className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Part 1: useReducer (FSM)
            </button>
            <button
              className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              Part 2: Redux Toolkit (Cart)
            </button>
          </nav>
        </header>

        <main className="app-main">
          {activeTab === 'profile' && (
            <section className="tab-content">
              <UserProfile />
            </section>
          )}

          {activeTab === 'cart' && (
            <section className="tab-content">
              <ShoppingCart />
            </section>
          )}
        </main>

        <footer className="app-footer">
          <p>
            <strong>Key Concepts:</strong>
            <br />
            • FSM Pattern: State transitions are strictly enforced
            <br />• Memoized Selectors: Performance optimization for derived state
            <br />• Immutability: Using Immer in RTK for safe mutations
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
