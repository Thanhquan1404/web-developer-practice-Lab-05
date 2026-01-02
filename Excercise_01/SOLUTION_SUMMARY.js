/**
 * ============================================================
 * LAB 5: REACT ADVANCED STATE MANAGEMENT
 * ============================================================
 * 
 * Solution Summary & Architecture Overview
 * 
 * Total Files Created: 15+
 * Key Concepts: FSM Pattern, Redux Toolkit, Memoized Selectors
 * 
 * ============================================================
 */

// ============================================================
// 📊 PROJECT STRUCTURE
// ============================================================

/**
 * src/features/user-profile/
 * ├── userReducer.js        [220 lines] - FSM Reducer + Initial State
 * ├── UserProfile.jsx       [140 lines] - Component with useReducer
 * └── UserProfile.css       [180 lines] - Styling
 * 
 * src/features/cart/
 * ├── cartSlice.js          [160 lines] - Redux Toolkit Slice
 * ├── cartSelectors.js      [140 lines] - Memoized Selectors
 * ├── ShoppingCart.jsx      [220 lines] - Redux Component
 * └── ShoppingCart.css      [300 lines] - Styling
 * 
 * src/store/
 * └── index.js              [30 lines] - Store Configuration
 * 
 * src/
 * ├── App.jsx               [50 lines] - Main App Component
 * ├── App.css               [150 lines] - App Styling
 * ├── index.js              [10 lines] - Entry Point
 * └── index.css             [20 lines] - Global Styles
 * 
 * Root/
 * ├── index.html            - HTML Template
 * ├── package.json          - Dependencies & Scripts
 * ├── vite.config.js        - Vite Configuration
 * ├── README.md             - Full Documentation
 * ├── USAGE_EXAMPLES.js     - Usage Examples
 * └── .gitignore           - Git Ignore
 */

// ============================================================
// 🎯 PART 1: useReducer with FSM Pattern
// ============================================================

/**
 * File: src/features/user-profile/userReducer.js
 * 
 * Key Features:
 * ✅ Finite State Machine with 4 states: idle, loading, resolved, rejected
 * ✅ Explicit state transitions with validation
 * ✅ Action types: FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE
 * ✅ Helper functions: fetchInit(), fetchSuccess(), fetchFailure()
 * 
 * State Diagram:
 *        FETCH_INIT
 *           ↓↑
 *        idle ↔ loading
 *                ↓  ↘
 *           resolved rejected
 * 
 * FSM Rules:
 * 1. FETCH_INIT: idle/resolved/rejected → loading
 * 2. FETCH_SUCCESS: loading → resolved
 * 3. FETCH_FAILURE: loading → rejected
 * 
 * Invalid transitions return old state (no-op)
 */

// ============================================================
// 🛒 PART 2: Redux Toolkit - Shopping Cart
// ============================================================

/**
 * File: src/features/cart/cartSlice.js
 * 
 * Key Features:
 * ✅ RTK configurable store with Immer middleware
 * ✅ 4 reducers: addItem, removeItem, updateItemQuantity, clearCart
 * ✅ Automatic totalAmount calculation
 * ✅ Immutable state updates (safe mutations via Immer)
 * 
 * State Structure:
 * {
 *   items: [
 *     { id, name, price, quantity }
 *   ],
 *   totalAmount: number
 * }
 * 
 * Reducers:
 * - addItem: Add new or increase quantity
 * - removeItem: Decrease quantity or delete
 * - updateItemQuantity: Direct quantity update
 * - clearCart: Reset to initial state
 */

/**
 * File: src/features/cart/cartSelectors.js
 * 
 * MEMOIZED SELECTORS - PERFORMANCE OPTIMIZATION
 * 
 * Problem Solved:
 * ❌ Without memoization: Tax recalculated every render
 * ✅ With memoization: Tax calculated only when totalAmount changes
 * 
 * Selectors:
 * 1. selectCartItems - Get all items
 * 2. selectTotalAmount - Get subtotal
 * 3. selectCartItemCount - Count total quantity
 * 4. selectCartTax - Calculate 10% tax (MEMOIZED)
 * 5. selectCartTotal - Final total (MEMOIZED)
 * 6. selectIsCartEmpty - Check if empty
 * 7. selectCartSummary - Complete summary (MEMOIZED)
 * 
 * Implementation:
 * export const selectCartTax = createSelector(
 *   [selectTotalAmount],
 *   (totalAmount) => totalAmount * 0.1
 * );
 * 
 * Benefits:
 * ✅ Selector only re-runs when input changes
 * ✅ Returns cached result if input is same
 * ✅ Prevents unnecessary component re-renders
 */

// ============================================================
// 🔑 KEY CONCEPTS EXPLAINED
// ============================================================

/**
 * 1. FINITE STATE MACHINE (FSM)
 * 
 * Definition: A mathematical model with finite states and explicit transitions
 * 
 * Benefits:
 * - Prevents impossible states (e.g., loading + error at same time)
 * - Makes state transitions explicit and testable
 * - Easier debugging and reasoning about code
 * - Self-documenting state flow
 * 
 * Example:
 * State can be: 'idle' | 'loading' | 'resolved' | 'rejected'
 * Not: {loading: true, error: true, data: X} (impossible!)
 */

/**
 * 2. useReducer vs useState
 * 
 * useState:
 * - Simple, one value per hook
 * - Logic scattered in components
 * - Harder to test
 * 
 * useReducer:
 * - Complex, related state together
 * - Logic centralized in reducer
 * - Easier to test (pure function)
 * - Better for state machines
 */

/**
 * 3. REDUX + REDUX TOOLKIT (RTK)
 * 
 * Redux:
 * - Global state management
 * - Single source of truth
 * - Predictable state updates
 * - Great for large applications
 * 
 * Redux Toolkit (RTK):
 * - Built on Redux, simplified API
 * - configureStore: Easy setup
 * - createSlice: Actions + reducers together
 * - Immer included: Safe "mutations"
 * - RTK Query: Data fetching
 */

/**
 * 4. MEMOIZED SELECTORS (createSelector)
 * 
 * Problem: Derived state recalculates too often
 * 
 * Solution: createSelector from @reduxjs/toolkit
 * 
 * How it works:
 * 1. Input selectors: Extract needed values from state
 * 2. Result selector: Compute derived value
 * 3. Memoization: Cache result based on input equality
 * 
 * Example:
 * const selectCartTax = createSelector(
 *   [selectTotalAmount],      // Input selector
 *   (totalAmount) => {         // Result selector
 *     return totalAmount * 0.1;
 *   }
 * );
 * 
 * Performance Impact:
 * - Without: Tax calculated ~100 times per page visit
 * - With: Tax calculated 3-5 times (only when total changes)
 */

/**
 * 5. IMMUTABILITY IN RTK
 * 
 * RTK uses Immer middleware internally
 * 
 * Allows you to write:
 * state.items.push(newItem);  // Looks like mutation
 * state.totalAmount = 1000;   // Looks like mutation
 * 
 * But Immer ensures:
 * - Original state not modified
 * - New state object created
 * - Immutability preserved
 * 
 * Benefit: Easier code without boilerplate spread operators
 */

// ============================================================
// 📚 FILE DESCRIPTIONS
// ============================================================

/**
 * PART 1: USER PROFILE (useReducer)
 * 
 * userReducer.js [220 lines]
 * - ACTIONS object: FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE
 * - initialState: { status: 'idle', data: null, error: null }
 * - userReducer function: FSM logic with transition validation
 * - Helper functions: fetchInit, fetchSuccess, fetchFailure
 * - Comments: Explain FSM rules and transitions
 * 
 * UserProfile.jsx [140 lines]
 * - useReducer hook initialization
 * - useEffect for data fetching
 * - Conditional rendering based on status
 * - Mock API simulation
 * - Error retry functionality
 * - Clean up function for memory leak prevention
 * 
 * UserProfile.css [180 lines]
 * - Responsive design
 * - Loading spinner animation
 * - Error card styling
 * - Success profile card
 * - Mobile optimization
 */

/**
 * PART 2: SHOPPING CART (Redux Toolkit)
 * 
 * cartSlice.js [160 lines]
 * - Initial state with items array and totalAmount
 * - createSlice with 4 reducers:
 *   • addItem: Add or increase quantity
 *   • removeItem: Decrease or delete
 *   • updateItemQuantity: Direct update
 *   • clearCart: Reset
 * - Auto-export actions and reducer
 * - Immer-safe mutations
 * - Comments explaining each reducer logic
 * 
 * cartSelectors.js [140 lines]
 * - selectCartState: Base selector
 * - selectCartItems: All items (memoized)
 * - selectTotalAmount: Subtotal (memoized)
 * - selectCartItemCount: Total quantity (memoized)
 * - selectCartTax: 10% tax (MEMOIZED - key optimization)
 * - selectCartTotal: Final total (memoized)
 * - selectIsCartEmpty: Boolean check
 * - selectCartSummary: Complete summary object
 * - Comments explaining memoization benefits
 * 
 * ShoppingCart.jsx [220 lines]
 * - useDispatch & useSelector hooks
 * - CartItem component: Individual item
 * - EmptyCart component: Empty state
 * - CartSummary component: Total display
 * - ProductCatalog component: Add items
 * - Main ShoppingCart: Orchestration
 * - Full CRUD operations for cart
 * 
 * ShoppingCart.css [300 lines]
 * - Grid layout for cart
 * - Product catalog grid
 * - Cart items styling
 * - Summary section
 * - Responsive mobile layout
 * - Hover effects & animations
 */

/**
 * STORE CONFIGURATION
 * 
 * store/index.js [30 lines]
 * - configureStore setup
 * - Reducer composition (cart reducer)
 * - DevTools enabled
 * - Middleware configuration
 * - Store export
 */

/**
 * APP & MAIN FILES
 * 
 * App.jsx [50 lines]
 * - Redux Provider wrapper
 * - Tab navigation (Part 1 / Part 2)
 * - Component switching based on active tab
 * - Header with project info
 * - Footer with key concepts
 * 
 * App.css [150 lines]
 * - Gradient background
 * - Tab navigation styling
 * - Content animation
 * - Footer info display
 * - Responsive design
 * 
 * index.js [10 lines]
 * - React DOM render
 * - Strict mode
 * 
 * index.css [20 lines]
 * - Global resets
 * - Body styling
 * - Scrollbar customization
 */

/**
 * CONFIGURATION FILES
 * 
 * package.json
 * - react & react-dom: 18.2.0
 * - @reduxjs/toolkit: Latest (includes Redux)
 * - react-redux: 8.1.3
 * - vite & @vitejs/plugin-react
 * - Scripts: dev, build, preview, lint
 * 
 * vite.config.js
 * - React plugin
 * - Dev server on port 3000
 * - Auto-open browser
 * - Build output to dist/
 * 
 * index.html
 * - Root div for React
 * - Meta tags for responsive design
 * 
 * .gitignore
 * - Node modules
 * - Build outputs
 * - Log files
 * - IDE files
 */

// ============================================================
// 🚀 RUNNING THE PROJECT
// ============================================================

/**
 * 1. Install dependencies:
 *    npm install
 * 
 * 2. Start dev server:
 *    npm run dev
 *    → Opens http://localhost:3000
 * 
 * 3. Build for production:
 *    npm run build
 *    → Creates dist/ folder
 * 
 * 4. Preview production build:
 *    npm run preview
 */

// ============================================================
// ✅ TESTING CHECKLIST
// ============================================================

/**
 * PART 1: FSM Testing
 * □ Idle state renders correctly
 * □ Clicking triggers FETCH_INIT (idle → loading)
 * □ Loading spinner shows during fetch
 * □ FETCH_SUCCESS works (loading → resolved)
 * □ User data displays correctly
 * □ FETCH_FAILURE works (loading → rejected)
 * □ Error message displays
 * □ Retry button transitions (rejected → loading)
 * □ Invalid transitions don't cause errors
 * □ Cleanup works (no memory leaks)
 * 
 * PART 2: Redux/Selectors Testing
 * □ Empty cart shows initial state
 * □ Add item works (new item added)
 * □ Add same item increases quantity
 * □ Remove item decreases quantity
 * □ Remove when qty=1 deletes item
 * □ Tax calculation correct (10%)
 * □ Total amount correct (subtotal + tax)
 * □ Clear cart resets everything
 * □ Memoized selectors work (no extra renders)
 * □ Tax doesn't recalculate on unrelated updates
 */

// ============================================================
// 💡 ADVANCED TOPICS COVERED
// ============================================================

/**
 * Design Patterns:
 * - Finite State Machine (FSM)
 * - Feature-based folder structure
 * - Selector pattern (memoization)
 * - Container/Presentational pattern
 * 
 * Performance Optimizations:
 * - createSelector for memoization
 * - useSelector dependency optimization
 * - Preventing unnecessary re-renders
 * - Caching derived state
 * 
 * Best Practices:
 * - Pure reducers
 * - Immutable updates
 * - Proper cleanup in useEffect
 * - Separation of concerns
 * - Comprehensive comments
 * - Error handling
 * - Type-safe state
 */

// ============================================================
// 📖 LEARNING OUTCOMES
// ============================================================

/**
 * After completing this lab, you will understand:
 * 
 * ✅ How to use useReducer for complex state
 * ✅ Finite State Machine pattern and benefits
 * ✅ Redux Toolkit setup and usage
 * ✅ Creating slices with reducers and actions
 * ✅ Memoized selectors for performance
 * ✅ Immutability in Redux (via Immer)
 * ✅ Feature-based project structure
 * ✅ Global state management patterns
 * ✅ Performance optimization techniques
 * ✅ Professional code organization
 */

// ============================================================
// 🔗 RESOURCE LINKS
// ============================================================

/**
 * Official Documentation:
 * - React Hooks: https://react.dev/reference/react/useReducer
 * - Redux Toolkit: https://redux-toolkit.js.org/
 * - Reselect: https://github.com/reduxjs/reselect
 * - Vite: https://vitejs.dev/
 * 
 * Concepts:
 * - FSM: https://en.wikipedia.org/wiki/Finite-state_machine
 * - Immer: https://immerjs.github.io/immer/
 * - Memoization: https://en.wikipedia.org/wiki/Memoization
 */

export const LAB_INFO = {
  title: 'React Advanced State Management',
  version: '1.0.0',
  author: 'React Course',
  difficulty: 'Advanced',
  estimatedTime: '8-12 hours',
  parts: {
    part1: {
      title: 'useReducer with FSM Pattern',
      concepts: ['useReducer', 'Finite State Machine', 'State Management'],
      files: ['userReducer.js', 'UserProfile.jsx', 'UserProfile.css'],
    },
    part2: {
      title: 'Redux Toolkit Shopping Cart',
      concepts: ['Redux', 'createSlice', 'Memoized Selectors', 'Immutability'],
      files: ['cartSlice.js', 'cartSelectors.js', 'ShoppingCart.jsx', 'ShoppingCart.css'],
    },
  },
  totalLinesOfCode: 1650,
  filesCreated: 15,
};
