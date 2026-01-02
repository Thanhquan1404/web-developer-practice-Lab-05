/**
 * USAGE EXAMPLES & DOCUMENTATION
 * 
 * File này chứa các ví dụ chi tiết về cách sử dụng
 * cả useReducer (Part 1) và Redux (Part 2)
 */

// ============================================================
// PART 1: useReducer với FSM Pattern
// ============================================================

/**
 * SCENARIO 1: Basic Usage
 * 
 * Khởi tạo component với useReducer
 */
import { useReducer, useEffect } from 'react';
import {
  userReducer,
  initialState,
  fetchInit,
  fetchSuccess,
  fetchFailure,
} from './features/user-profile/userReducer';

function Example1_BasicUsage() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Chỉ fetch khi state là idle
    if (state.status !== 'idle') return;

    // Transition: idle → loading
    dispatch(fetchInit());

    // Simulate API call
    setTimeout(() => {
      try {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        };
        // Transition: loading → resolved
        dispatch(fetchSuccess(userData));
      } catch (error) {
        // Transition: loading → rejected
        dispatch(fetchFailure(error.message));
      }
    }, 2000);
  }, [state.status]);

  return (
    <div>
      <p>Status: {state.status}</p>
      {state.status === 'loading' && <p>Loading...</p>}
      {state.status === 'resolved' && <p>Data: {JSON.stringify(state.data)}</p>}
      {state.status === 'rejected' && <p>Error: {state.error}</p>}
    </div>
  );
}

/**
 * SCENARIO 2: FSM Transition Testing
 * 
 * Demonstrating FSM rules
 */
function Example2_FSMTransitions() {
  // Test invalid transition
  const state1 = { status: 'resolved', data: {}, error: null };

  // ❌ Cố gắng transition từ resolved → loading với FETCH_SUCCESS (invalid)
  const action = { type: 'FETCH_SUCCESS', payload: {} };
  const newState = userReducer(state1, action);
  console.log(newState === state1); // true - no change, FSM blocked it!

  // ✅ Valid transition: resolved → loading với FETCH_INIT
  const validAction = { type: 'FETCH_INIT' };
  const nextState = userReducer(state1, validAction);
  console.log(nextState.status); // 'loading' - transition allowed
}

/**
 * SCENARIO 3: Error Recovery & Retry
 * 
 * Khi có lỗi, user có thể retry
 */
function Example3_ErrorRecovery() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const handleRetry = () => {
    // FSM allows: rejected → loading (via FETCH_INIT)
    dispatch(fetchInit());

    // Then fetch data again...
  };

  return (
    <>
      {state.status === 'rejected' && (
        <button onClick={handleRetry}>Retry</button>
      )}
    </>
  );
}

// ============================================================
// PART 2: Redux Toolkit - Shopping Cart
// ============================================================

/**
 * SCENARIO 1: Add Item to Cart
 */
import { useDispatch } from 'react-redux';
import { addItem } from './features/cart/cartSlice';

function Example4_AddItem() {
  const dispatch = useDispatch();

  const handleAddLaptop = () => {
    dispatch(addItem({
      id: 1,
      name: 'Laptop Dell',
      price: 999.99,
      quantity: 1,
    }));
  };

  const handleAddSameLaptop = () => {
    // Nếu item đã tồn tại, quantity sẽ tăng lên 2
    dispatch(addItem({
      id: 1,
      name: 'Laptop Dell',
      price: 999.99,
      quantity: 1,
    }));
  };

  return (
    <div>
      <button onClick={handleAddLaptop}>Add Laptop (1st time)</button>
      <button onClick={handleAddSameLaptop}>Add Laptop (2nd time)</button>
    </div>
  );
}

/**
 * SCENARIO 2: Remove Item from Cart
 */
import { removeItem } from './features/cart/cartSlice';

function Example5_RemoveItem() {
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    // - Nếu quantity > 1: giảm quantity đi 1
    // - Nếu quantity = 1: xóa item khỏi giỏ
    dispatch(removeItem(itemId));
  };

  return (
    <button onClick={() => handleRemoveItem(1)}>Remove Item #1</button>
  );
}

/**
 * SCENARIO 3: Using Memoized Selectors
 */
import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTax,
  selectCartSummary,
} from './features/cart/cartSelectors';

function Example6_Selectors() {
  // Sử dụng memoized selectors
  const items = useSelector(selectCartItems);
  const tax = useSelector(selectCartTax);
  const summary = useSelector(selectCartSummary);

  // Tax chỉ recalculate khi totalAmount thay đổi
  // Dù component re-render bao nhiêu lần
  return (
    <div>
      <p>Items in cart: {summary.itemCount}</p>
      <p>Tax (10%): ${tax}</p>
      <p>Total: ${summary.total}</p>
    </div>
  );
}

/**
 * SCENARIO 4: Complete Shopping Cart Flow
 */
function Example7_CompleteFlow() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const isEmpty = useSelector((state) => state.cart.items.length === 0);

  // 1. User add product
  const handleAddProduct = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  // 2. User adjust quantity
  const handleAdjustQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItem(itemId));
    } else {
      dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  // 3. User checkout
  const handleCheckout = () => {
    if (!isEmpty) {
      console.log('Checkout with:', summary);
      // API call...
    }
  };

  return (
    <div>
      {isEmpty ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleAdjustQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </li>
            ))}
          </ul>
          <p>Subtotal: ${summary.subtotal}</p>
          <p>Tax: ${summary.tax}</p>
          <p>Total: ${summary.total}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

/**
 * SCENARIO 5: Selector Performance Monitoring
 * 
 * Làm thế nào để biết selector có recalculate không?
 */
function Example8_SelectorPerformance() {
  let callCount = 0;

  // Custom selector để monitor
  const selectCartTaxWithLogging = createSelector(
    [selectTotalAmount],
    (totalAmount) => {
      callCount++;
      console.log(`Tax recalculated ${callCount} times`);
      return totalAmount * 0.1;
    }
  );

  const tax = useSelector(selectCartTaxWithLogging);

  return <p>Tax: ${tax} (calculated {callCount} times)</p>;
}

/**
 * SCENARIO 6: Advanced Selector - Item by ID
 */
import { useCallback } from 'react';

function Example9_SelectItemById() {
  const selectItemById = useCallback(
    (itemId) =>
      createSelector(
        [(state) => state.cart.items],
        (items) => items.find((item) => item.id === itemId)
      ),
    []
  );

  const item = useSelector(selectItemById(1)); // Get item with id=1

  return <div>{item?.name}: ${item?.price}</div>;
}

// ============================================================
// ADVANCED PATTERNS
// ============================================================

/**
 * PATTERN 1: Combining Multiple Selectors
 */
function Example10_CombineSelectors() {
  const cartSummary = useSelector((state) => ({
    itemCount: selectCartItemCount(state),
    total: selectCartTotal(state),
    isEmpty: selectIsCartEmpty(state),
  }));

  return (
    <div>
      Items: {cartSummary.itemCount}
      Total: ${cartSummary.total}
    </div>
  );
}

/**
 * PATTERN 2: FSM with async/await
 */
async function Example11_FSMAsync() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUserProfile = async () => {
    dispatch(fetchInit());

    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      dispatch(fetchSuccess(userData));
    } catch (error) {
      dispatch(fetchFailure(error.message));
    }
  };

  return <button onClick={loadUserProfile}>Load Profile</button>;
}

/**
 * PATTERN 3: Conditional Rendering based on FSM State
 */
function Example12_ConditionalRendering() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const renderByState = {
    idle: () => <p>Press load to fetch data</p>,
    loading: () => <p>Loading...</p>,
    resolved: () => <UserProfileDisplay data={state.data} />,
    rejected: () => (
      <div>
        <p>Error: {state.error}</p>
        <button onClick={() => dispatch(fetchInit())}>Retry</button>
      </div>
    ),
  };

  return <div>{renderByState[state.status]?.()}</div>;
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * FSM Pattern Benefits:
 * ✅ Prevents impossible states
 * ✅ Makes transitions explicit
 * ✅ Easier to test and debug
 * ✅ More maintainable code
 * 
 * Redux + Memoized Selectors Benefits:
 * ✅ Global state management
 * ✅ Performance optimization (memoization)
 * ✅ Predictable state updates
 * ✅ Great DevTools support
 * ✅ Middleware support for async operations
 */

export {
  Example1_BasicUsage,
  Example2_FSMTransitions,
  Example3_ErrorRecovery,
  Example4_AddItem,
  Example5_RemoveItem,
  Example6_Selectors,
  Example7_CompleteFlow,
  Example8_SelectorPerformance,
  Example9_SelectItemById,
  Example10_CombineSelectors,
  Example11_FSMAsync,
  Example12_ConditionalRendering,
};
