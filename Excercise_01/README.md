# React Advanced - State Management Solutions

Giải pháp hoàn chỉnh cho bài tập State Management với 2 phần chính: **useReducer (Finite State Machine)** và **Redux Toolkit (Global Store)**.

## 📁 Cấu trúc Dự Án (Project Structure)

```
LAB_05/
├── src/
│   ├── features/
│   │   ├── user-profile/           # PART 1: useReducer with FSM
│   │   │   ├── userReducer.js      # Reducer logic + FSM implementation
│   │   │   ├── UserProfile.jsx     # Component using useReducer
│   │   │   └── UserProfile.css     # Component styles
│   │   │
│   │   └── cart/                   # PART 2: Redux Toolkit
│   │       ├── cartSlice.js        # Redux slice (state + reducers)
│   │       ├── cartSelectors.js    # Memoized selectors
│   │       ├── ShoppingCart.jsx    # Component using Redux
│   │       └── ShoppingCart.css    # Component styles
│   │
│   ├── store/
│   │   └── index.js               # Redux store configuration
│   │
│   ├── App.jsx                    # Main app component
│   ├── App.css
│   ├── index.js                   # Entry point
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 PART 1: useReducer với Finite State Machine Pattern

### Vấn đề được giải quyết
- **Trước**: Sử dụng nhiều `useState` riêng lẻ → rủi ro "impossible states"
  ```javascript
  // ❌ Có thể xảy ra: loading=true, data=something, error=something
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  ```

- **Sau**: Sử dụng `useReducer` với FSM → Chỉ cho phép transitions hợp lệ
  ```javascript
  // ✅ State chỉ có thể là: idle, loading, resolved, rejected
  // Không thể có trạng thái vô lý
  ```

### Finite State Machine Diagram

```
┌────────────────────────────────────────────┐
│                                            │
│    FETCH_INIT              FETCH_INIT      │
│       ↓                        ↑           │
│   ┌────────┐              ┌────────┐      │
│   │ idle   │─────────────→│loading │      │
│   └────────┘              └────────┘      │
│                              ↙  ↘         │
│                    FETCH_SUCCESS FETCH_   │
│                         ↓       FAILURE   │
│                    ┌─────────┐      ↓     │
│                    │resolved │ ┌─────────┐│
│                    └─────────┘ │rejected ││
│                                └─────────┘│
└────────────────────────────────────────────┘
```

### Các quy tắc FSM

1. **FETCH_INIT**: Chỉ từ `idle` | `resolved` | `rejected`
2. **FETCH_SUCCESS**: Chỉ từ `loading`
3. **FETCH_FAILURE**: Chỉ từ `loading`

Nếu action không hợp lệ → **trả về state cũ (no-op)**

### Cách sử dụng

```javascript
import { useReducer, useEffect } from 'react';
import {
  userReducer,
  initialState,
  fetchInit,
  fetchSuccess,
  fetchFailure,
} from './userReducer';

function UserProfile() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.status !== 'idle') return;

    dispatch(fetchInit()); // transition: idle → loading

    fetchUserData()
      .then(data => dispatch(fetchSuccess(data))) // loading → resolved
      .catch(error => dispatch(fetchFailure(error.message))); // loading → rejected
  }, [state.status]);

  if (state.status === 'loading') return <LoadingState />;
  if (state.status === 'resolved') return <SuccessState data={state.data} />;
  if (state.status === 'rejected') return <ErrorState error={state.error} />;
}
```

---

## 🛒 PART 2: Redux Toolkit với Shopping Cart

### Tính năng
- ✅ Thêm sản phẩm vào giỏ (hoặc tăng quantity)
- ✅ Giảm số lượng hoặc xóa sản phẩm
- ✅ Tính toán tổng tiền + thuế 10%
- ✅ Memoized selectors để tối ưu performance
- ✅ Immutable updates (sử dụng Immer)

### CartSlice - State Management

```javascript
// State structure
{
  items: [
    { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29.99, quantity: 2 },
  ],
  totalAmount: 1059.97
}
```

#### Reducers

**1. addItem(state, action)**
```javascript
dispatch(addItem({
  id: 1,
  name: 'Laptop',
  price: 999.99,
  quantity: 1
}));
```
- Nếu item chưa tồn tại: Thêm mới
- Nếu item đã tồn tại: Tăng quantity
- Cập nhật totalAmount

**2. removeItem(state, action)**
```javascript
dispatch(removeItem(itemId)); // id của item
```
- Giảm quantity đi 1
- Nếu quantity = 0: Xóa item khỏi giỏ
- Cập nhật totalAmount

**3. updateItemQuantity(state, action)**
```javascript
dispatch(updateItemQuantity({ id: 1, quantity: 5 }));
```
- Cập nhật quantity trực tiếp
- Nếu quantity ≤ 0: Xóa item
- Cập nhật totalAmount

**4. clearCart(state)**
```javascript
dispatch(clearCart());
```
- Reset toàn bộ giỏ về ban đầu

### Memoized Selectors - Performance Optimization

**Vấn đề**: Nếu không dùng memoized selectors
```javascript
// ❌ Tax tính lại mỗi khi component re-render
// Dù totalAmount không thay đổi
const tax = totalAmount * 0.1;
```

**Giải pháp**: Sử dụng `createSelector` từ Redux Toolkit
```javascript
// ✅ Tax chỉ tính lại khi totalAmount thay đổi
export const selectCartTax = createSelector(
  [selectTotalAmount],  // Input selector
  (totalAmount) => {    // Result selector
    return totalAmount * 0.1;
  }
);
```

#### Các Selectors có sẵn

| Selector | Mô tả | Memoized |
|----------|-------|----------|
| `selectCartItems` | Danh sách items | ✅ |
| `selectTotalAmount` | Tổng giá trước thuế | ✅ |
| `selectCartItemCount` | Tổng số lượng sản phẩm | ✅ |
| `selectCartTax` | Thuế 10% | ✅ |
| `selectCartTotal` | Tổng cộng (giá + thuế) | ✅ |
| `selectIsCartEmpty` | Kiểm tra giỏ trống | ✅ |
| `selectCartSummary` | Summary toàn bộ | ✅ |

### Cách sử dụng Redux trong Component

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './cartSlice';
import {
  selectCartItems,
  selectCartSummary,
  selectIsCartEmpty,
} from './cartSelectors';

function ShoppingCart() {
  const dispatch = useDispatch();

  // Sử dụng memoized selectors
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const isEmpty = useSelector(selectIsCartEmpty);

  const handleAddProduct = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  return (
    <div>
      {isEmpty ? <p>Cart is empty</p> : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name}: ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${summary.total}</p>
        </>
      )}
    </div>
  );
}
```

---

## 🏪 Redux Store Configuration

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Thêm các slices khác ở đây
  },
  devTools: process.env.NODE_ENV !== 'production',
});
```

---

## 🚀 Cách chạy Project

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```
Server sẽ chạy tại `http://localhost:3000`

### 3. Build cho production
```bash
npm run build
```

### 4. Preview build
```bash
npm run preview
```

---

## 📚 Các Khái Niệm Quan Trọng

### 1. Finite State Machine (FSM)
- **Định nghĩa**: Một mô hình có tập hợp hữu hạn các trạng thái, với các transitions được định nghĩa rõ ràng.
- **Lợi ích**:
  - ✅ Ngăn chặn "impossible states"
  - ✅ Code dễ debug và maintain
  - ✅ Behavior dễ dự đoán

### 2. useReducer vs useState
| Tiêu chỉ | useState | useReducer |
|---------|---------|-----------|
| Phức tạp | Đơn giản | Phức tạp |
| State | Một giá trị | Đối tượng |
| Logic | Inline | Centralized |
| Testing | Khó | Dễ (pure function) |
| Scalability | Hạn chế | Tốt |

### 3. Redux vs useReducer
| Tiêu chỉ | useReducer | Redux |
|---------|-----------|-------|
| Phạm vi | Local/Component | Global |
| Setup | Đơn giản | Phức tạp |
| DevTools | ❌ | ✅ |
| Middleware | ❌ | ✅ |
| Time-travel | ❌ | ✅ |

### 4. Memoized Selectors
- **Tác dụng**: Tránh unnecessary recalculations
- **Cách hoạt động**: 
  1. So sánh input selectors
  2. Nếu input không thay đổi → trả về result từ lần trước (cached)
  3. Nếu input thay đổi → recalculate result mới

### 5. Immutability
- **Redux Toolkit** sử dụng **Immer** internally
- Cho phép "mutate" state một cách an toàn
- Immer tự động xử lý việc tạo new object

```javascript
// Với Immer (inside RTK)
state.items.push(newItem);  // ✅ Safe
state.totalAmount = 1000;   // ✅ Safe

// Nguyên tắc: Code như là mutating, nhưng hoạt động như immutable
```

---

## 🧪 Testing Tips

### Test Reducer
```javascript
// userReducer.test.js
import { userReducer, initialState, ACTIONS } from './userReducer';

describe('userReducer FSM', () => {
  it('should transition from idle to loading', () => {
    const action = { type: ACTIONS.FETCH_INIT };
    const newState = userReducer(initialState, action);
    expect(newState.status).toBe('loading');
  });

  it('should not transition from resolved to loading with FETCH_SUCCESS', () => {
    const state = { status: 'resolved', data: {}, error: null };
    const action = { type: ACTIONS.FETCH_SUCCESS, payload: {} };
    const newState = userReducer(state, action);
    expect(newState).toEqual(state); // No change
  });
});
```

### Test Selectors
```javascript
// cartSelectors.test.js
import { selectCartTax } from './cartSelectors';

const state = {
  cart: {
    totalAmount: 100,
  },
};

it('should calculate 10% tax', () => {
  const tax = selectCartTax(state);
  expect(tax).toBe(10);
});

it('should return memoized result', () => {
  const selector = selectCartTax;
  const result1 = selector(state);
  const result2 = selector(state);
  expect(result1).toBe(result2); // Same reference
});
```

---

## 💡 Best Practices

### ✅ DO:
- ✅ Sử dụng FSM cho complex states
- ✅ Memoize các selectors tính toán
- ✅ Giữ reducer functions pure
- ✅ Separate concerns (features folder structure)
- ✅ Comment các logic phức tạp

### ❌ DON'T:
- ❌ Không mutate state directly (ngoài RTK)
- ❌ Không call selectors ngoài components
- ❌ Không set state dựa vào state cũ trong useEffect
- ❌ Không quên cleanup trong useEffect

---

## 📝 Ghi chú Quan Trọng

### FSM Logic trong userReducer.js
```javascript
// Chỉ cho phép transition hợp lệ
case ACTIONS.FETCH_SUCCESS:
  if (state.status === 'loading') {
    return { ...state, status: 'resolved', data: action.payload };
  }
  // Invalid transition - return old state
  return state;
```

### Memoized Tax Selector
```javascript
export const selectCartTax = createSelector(
  [selectTotalAmount],  // Dependency
  (totalAmount) => {
    // Chỉ chạy khi totalAmount thay đổi
    return Math.round(totalAmount * 0.1 * 100) / 100;
  }
);
```

---

## 🔗 Tài liệu Tham Khảo

- [React useReducer Hook](https://react.dev/reference/react/useReducer)
- [Redux Toolkit Official Docs](https://redux-toolkit.js.org/)
- [Reselect Library](https://github.com/reduxjs/reselect)
- [Immer Documentation](https://immerjs.github.io/immer/)
- [Finite State Machines](https://en.wikipedia.org/wiki/Finite-state_machine)

---

**Tác giả**: React Advanced Course | **Phiên bản**: 1.0.0 | **Cập nhật**: 2024
