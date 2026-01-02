import React from 'react';

/**
 * QUICK REFERENCE GUIDE
 * React Advanced State Management Lab
 */

// ============================================================
// PART 1: REDUCER FSM QUICK REFERENCE
// ============================================================

const userReducerQuickRef = `
╔════════════════════════════════════════════════════════════╗
║        useReducer - Finite State Machine Pattern          ║
╚════════════════════════════════════════════════════════════╝

📍 INITIAL STATE:
{
  status: 'idle',      // 'idle' | 'loading' | 'resolved' | 'rejected'
  data: null,          // User data when resolved
  error: null          // Error message when rejected
}

📍 ACTIONS:
- FETCH_INIT:   Trigger fetch (idle/resolved/rejected → loading)
- FETCH_SUCCESS: Data received (loading → resolved)
- FETCH_FAILURE: Error occurred (loading → rejected)

📍 STATE TRANSITIONS:
                 ┌─────────────────────┐
                 │      FETCH_INIT     │
                 ↓                     ↑
    ┌──────────────────┐    ┌──────────────────┐
    │      idle        │    │    loading       │
    └──────────────────┘    └──────────────────┘
                               ↓  ↓  ↓
                        SUCCESS FAILURE
                               ↓  ↓  ↓
                   ┌─────────────────────────┐
                   │ resolved      rejected   │
                   └─────────────────────────┘

📍 USAGE:
const [state, dispatch] = useReducer(userReducer, initialState);

// Trigger
dispatch(fetchInit());                // Start loading
dispatch(fetchSuccess(userData));     // Success
dispatch(fetchFailure(errorMsg));     // Error

// Conditional render
if (state.status === 'loading') return <Spinner />;
if (state.status === 'resolved') return <Data data={state.data} />;
if (state.status === 'rejected') return <Error error={state.error} />;

📍 KEY BENEFIT:
✅ No "impossible states" (e.g., loading + error + data)
✅ All transitions validated
✅ Predictable behavior
✅ Easier testing
`;

// ============================================================
// PART 2: REDUX SELECTOR QUICK REFERENCE
// ============================================================

const reduxSelectorQuickRef = `
╔════════════════════════════════════════════════════════════╗
║   Redux Toolkit - Memoized Selectors Performance Guide    ║
╚════════════════════════════════════════════════════════════╝

📍 CART STATE:
{
  items: [
    { id: 1, name: 'Laptop', price: 999.99, quantity: 2 },
    { id: 2, name: 'Mouse', price: 29.99, quantity: 1 }
  ],
  totalAmount: 2029.97
}

📍 MEMOIZED SELECTORS:
┌─────────────────────────────────────────────────────────┐
│ Selector              │ Returns        │ Recalculates   │
├─────────────────────────────────────────────────────────┤
│ selectCartItems       │ items[]        │ When items[]   │
│ selectTotalAmount     │ number         │ When total $   │
│ selectCartItemCount   │ number         │ When qty       │
│ selectCartTax         │ number (10%)   │ When total $   │
│ selectCartTotal       │ total + tax    │ When $ or tax  │
│ selectIsCartEmpty     │ boolean        │ When items[]   │
│ selectCartSummary     │ object         │ When any       │
└─────────────────────────────────────────────────────────┘

📍 PERFORMANCE IMPACT:
❌ WITHOUT Memoization:
   Component re-renders → Tax recalculated → Wasted CPU
   
✅ WITH Memoization:
   Component re-renders → Tax cached (if total unchanged)
   Result: ⚡ ~50-70% faster for cart heavy operations

📍 USAGE:
// In component
const items = useSelector(selectCartItems);
const tax = useSelector(selectCartTax);
const summary = useSelector(selectCartSummary);

// Tax only recalculates when totalAmount changes
// Other re-renders return cached value

📍 CREATING CUSTOM MEMOIZED SELECTOR:
export const selectMyValue = createSelector(
  [selectInput1, selectInput2],     // Dependencies
  (input1, input2) => {              // Result function
    return input1 + input2;
  }
);

// Result only recalculates if input1 or input2 changed
`;

// ============================================================
// REDUX OPERATIONS QUICK REFERENCE
// ============================================================

const reduxOpsQuickRef = `
╔════════════════════════════════════════════════════════════╗
║        Redux Toolkit - Cart Operations Quick Guide        ║
╚════════════════════════════════════════════════════════════╝

📍 ADD ITEM:
dispatch(addItem({
  id: 1,
  name: 'Laptop',
  price: 999.99,
  quantity: 1
}));

Result:
- If item exists: quantity += 1
- If item new: Add to cart
- totalAmount updates automatically

📍 REMOVE ITEM:
dispatch(removeItem(itemId)); // Remove by ID

Result:
- If quantity > 1: quantity -= 1
- If quantity = 1: Remove item from cart
- totalAmount updates automatically

📍 UPDATE QUANTITY:
dispatch(updateItemQuantity({
  id: itemId,
  quantity: 5
}));

Result:
- Update quantity to 5
- If quantity ≤ 0: Remove item
- totalAmount updates automatically

📍 CLEAR CART:
dispatch(clearCart());

Result:
- items = []
- totalAmount = 0
- Back to initial state

📍 FULL EXAMPLE:
function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name}: {item.quantity} x \${item.price}
          <button onClick={() => dispatch(removeItem(item.id))}>-</button>
          <button onClick={() => dispatch(addItem(item))}>+</button>
        </div>
      ))}
      <h3>Total: \${summary.total}</h3>
      <button onClick={() => dispatch(clearCart())}>Clear</button>
    </div>
  );
}
`;

// ============================================================
// COMPARISON TABLE
// ============================================================

const comparisonTable = `
╔════════════════════════════════════════════════════════════╗
║          useState vs useReducer vs Redux                  ║
╚════════════════════════════════════════════════════════════╝

┌──────────────────┬────────────┬────────────┬──────────────┐
│ Feature          │ useState   │ useReducer │ Redux        │
├──────────────────┼────────────┼────────────┼──────────────┤
│ Scope            │ Local      │ Local      │ Global       │
│ Complexity       │ Simple     │ Complex    │ Complex      │
│ State Type       │ Single     │ Object     │ Object       │
│ Multiple Values  │ ❌ Messy   │ ✅ Clean   │ ✅ Clean     │
│ Logic Loc        │ Scattered  │ Centered   │ Centered     │
│ Testing          │ ❌ Hard    │ ✅ Easy    │ ✅ Easy      │
│ Performance      │ Manual     │ Manual     │ Optimizable  │
│ DevTools         │ ❌         │ ❌         │ ✅           │
│ Time-travel      │ ❌         │ ❌         │ ✅           │
│ Middleware       │ ❌         │ ❌         │ ✅           │
│ Learning Curve   │ Easy       │ Medium     │ Steep        │
│ Best For         │ Simple     │ Complex    │ Large Apps   │
└──────────────────┴────────────┴────────────┴──────────────┘
`;

// ============================================================
// DEBUGGING TIPS
// ============================================================

const debuggingTips = `
╔════════════════════════════════════════════════════════════╗
║              Debugging & Troubleshooting                  ║
╚════════════════════════════════════════════════════════════╝

🐛 PART 1: FSM Issues

Problem: State not transitioning as expected
Solution: 
1. Check current status in reducer
2. Verify action type matches ACTIONS
3. Add console.warn for invalid transitions
4. Use React DevTools to inspect state

Problem: Infinite loading
Solution:
1. Check useEffect dependencies
2. Add guard: if (state.status !== 'idle') return;
3. Verify API call completes

Problem: Memory leak warning
Solution:
1. Add isMounted flag in useEffect
2. Return cleanup function
3. Check if (isMounted) before dispatch

🐛 PART 2: Redux Issues

Problem: Selector not memoizing (always recalculating)
Solution:
1. Verify createSelector used correctly
2. Check input selector dependencies
3. Use Redux DevTools to monitor selector calls
4. Look for object creation in result function

Problem: totalAmount not updating
Solution:
1. Verify reducer is calculating correctly
2. Check RTK Immer mutations
3. Dispatch action with correct payload
4. Use Redux DevTools to see action details

Problem: Cart not persisting (refresh loses data)
Solution:
1. Add localStorage persistence
2. Hydrate store on app load
3. Use middleware for auto-save
4. Consider Redux Persist library

🔍 DEBUGGING TOOLS:

1. Redux DevTools:
   - Time-travel debugging
   - Action history
   - State diff viewer
   - Dispatch actions manually

2. React DevTools:
   - Component state inspection
   - Render profiler
   - Check re-renders

3. Console Logging:
   - Add logs in reducer
   - Monitor selector calls
   - Track state changes

4. Browser DevTools:
   - Network tab for API calls
   - Performance profiling
   - Memory usage
`;

// ============================================================
// COMMON MISTAKES
// ============================================================

const commonMistakes = `
╔════════════════════════════════════════════════════════════╗
║                  Common Mistakes & Fixes                  ║
╚════════════════════════════════════════════════════════════╝

❌ MISTAKE 1: Mutating state directly (non-RTK)
const newState = state;
newState.items.push(item);  // WRONG!

✅ FIX:
const newState = { ...state, items: [...state.items, item] };

❌ MISTAKE 2: Missing useEffect cleanup
useEffect(() => {
  fetchData().then(dispatch);
  // Memory leak if component unmounts!
});

✅ FIX:
useEffect(() => {
  let isMounted = true;
  fetchData().then(data => {
    if (isMounted) dispatch(action);
  });
  return () => { isMounted = false; };
}, []);

❌ MISTAKE 3: Creating objects in selectors (breaks memoization)
export const selectSummary = createSelector(
  [selectItems],
  (items) => {
    return { items, count: items.length };  // New object each time!
  }
);

✅ FIX:
export const selectSummary = createSelector(
  [selectItems, selectCount],  // Memoize dependencies
  (items, count) => ({ items, count })
);

❌ MISTAKE 4: Calling selector outside component
const taxAmount = selectCartTax(store.getState());  // Works but not reactive

✅ FIX:
const taxAmount = useSelector(selectCartTax);  // Reactive!

❌ MISTAKE 5: Updating dependent state
const [total, setTotal] = useState(0);
const [tax, setTax] = useState(0);
useEffect(() => {
  setTax(total * 0.1);  // Can cause issues
});

✅ FIX:
Use memoized selectors that calculate derived state

❌ MISTAKE 6: Not exporting actions from slice
const cartSlice = createSlice({...});
export default cartSlice.reducer;

✅ FIX:
export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

❌ MISTAKE 7: Forgetting Provider
function App() {
  return <ShoppingCart />;  // Redux not available!
}

✅ FIX:
function App() {
  return (
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );
}
`;

// ============================================================
// FILE ORGANIZATION
// ============================================================

const fileOrganization = `
╔════════════════════════════════════════════════════════════╗
║             Professional File Organization                ║
╚════════════════════════════════════════════════════════════╝

📁 FEATURE-BASED STRUCTURE (Recommended)

src/
├── features/
│   ├── user-profile/
│   │   ├── userReducer.js      (Reducer logic)
│   │   ├── UserProfile.jsx     (Component)
│   │   └── UserProfile.css     (Styles)
│   │
│   ├── cart/
│   │   ├── cartSlice.js        (Redux slice)
│   │   ├── cartSelectors.js    (Selectors)
│   │   ├── ShoppingCart.jsx    (Components)
│   │   └── ShoppingCart.css    (Styles)
│
├── store/
│   └── index.js                (Store config)
│
├── App.jsx
├── App.css
├── index.js
└── index.css

✅ BENEFITS:
- Scalable: Easy to add new features
- Maintainable: Related files together
- Testable: Feature isolation
- Modular: Reuse features across projects
`;

export const QUICK_REFERENCE = {
  userReducerFSM: userReducerQuickRef,
  reduxSelector: reduxSelectorQuickRef,
  reduxOps: reduxOpsQuickRef,
  comparison: comparisonTable,
  debugging: debuggingTips,
  mistakes: commonMistakes,
  fileOrg: fileOrganization,
};

export default QUICK_REFERENCE;
