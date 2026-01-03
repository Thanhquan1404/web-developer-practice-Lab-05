# 📚 LAB 05 - React Learning Journey

## Overview

Đây là một comprehensive React learning platform kết hợp **4 bài tập (Exercise)** liên quan nhau, được thiết kế theo phương pháp từng bước (step-by-step) để giúp bạn hiểu sâu về React.

---

## 🎯 Project Structure

```
general/
├── src/
│   ├── pages/
│   │   ├── exercise-01/          # State Management
│   │   ├── exercise-02/          # Performance Optimization
│   │   ├── exercise-03/          # Design System
│   │   └── exercise-04/          # Testing
│   ├── components/
│   │   └── Navigation.jsx        # Main navigation
│   ├── styles/
│   │   ├── globals.css          # Global styles
│   │   └── layout.css           # Layout styles
│   ├── App.jsx                   # Main app
│   └── main.jsx                  # Entry point
├── package.json
├── vite.config.js
├── jest.config.js
├── .babelrc
└── index.html
```

---

## 📖 Exercise Breakdown

### ⚡ Exercise 1: State Management (useReducer + Redux Toolkit)

**Concepts:** FSM Pattern, Redux Toolkit, Memoized Selectors

**Topics:**
- `useReducer` hook với Finite State Machine (FSM) pattern
- Xử lý loading, success, error states một cách deterministic
- Redux Toolkit (`configureStore`, `createSlice`)
- Memoized selectors với `createSelector` từ `reselect`
- Immer integration trong RTK

**Practical Example:**
- Part 1: User Profile Component with FSM (useReducer)
- Part 2: Shopping Cart with Redux Toolkit

---

### 🚀 Exercise 2: Performance Optimization

**Concepts:** useMemo, useCallback, Code Splitting, React.memo

**Topics:**
- `useMemo` hook để memoize expensive computations
- `React.memo` để memoize functional components
- `useCallback` hook để stabilize function references
- `React.lazy` + `Suspense` cho code splitting
- Performance profiling

**Practical Example:**
- Task 1: Large list rendering (10,000 items) with useMemo + React.memo
- Task 2: Function stabilization with useCallback
- Task 3: Code splitting with React.lazy

---

### 🎨 Exercise 3: Design System (Compound Components & Portals)

**Concepts:** Compound Components, Context API, React Portals

**Topics:**
- Compound Component pattern
- Context API cho implicit state sharing
- React Portals (`ReactDOM.createPortal`)
- Event bubbling through portals
- Building reusable UI components

**Practical Example:**
- Task 1: Compound Tabs Component
- Task 2: Modal Component using Portals

---

### ✅ Exercise 4: Testing (Jest & React Testing Library)

**Concepts:** Integration Testing, Error Boundaries, Mock Service Worker

**Topics:**
- React Testing Library (RTL)
- Jest testing framework
- Mock Service Worker (MSW) cho API mocking
- Error Boundaries
- Writing testable components

**Practical Example:**
- Task 1: LoginForm integration tests
- Task 2: API mocking with MSW
- Task 3: Error Boundary testing

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- npm hoặc yarn

### Installation

```bash
cd general
npm install
```

### Development Server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test              # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

---

## 📚 Key Concepts

### 1. Finite State Machine (FSM)

Một cách structured để quản lý state transitions:

```javascript
States: idle → loading → resolved/rejected
```

**Benefits:**
- Prevents impossible states
- Clear state transitions
- Easier to debug

### 2. Redux Toolkit

Simplifies Redux với:
- `configureStore` - setup redux devtools automatically
- `createSlice` - combines actions + reducer
- Immer integration - mutate state safely

### 3. Memoization

Optimize React performance:
- `useMemo` - memoize values
- `React.memo` - memoize components
- `useCallback` - memoize functions

### 4. Compound Components

Flexible component API:

```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab>...</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>...</Tabs.Panel>
</Tabs>
```

### 5. React Portals

Render components outside current DOM tree:

```javascript
ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))
```

### 6. React Testing Library

Test user behavior:

```javascript
render(<LoginForm />);
userEvent.type(screen.getByRole('textbox'), 'test');
```

---

## 🎓 Learning Path

Khuyến nghị theo thứ tự sau:

1. **Exercise 1 (State Management)**
   - Learn useReducer
   - Understand Redux Toolkit
   - Practice with real components

2. **Exercise 2 (Performance)**
   - Understand memoization
   - Identify performance bottlenecks
   - Learn code splitting

3. **Exercise 3 (Design System)**
   - Build reusable components
   - Master Context API
   - Work with Portals

4. **Exercise 4 (Testing)**
   - Write integration tests
   - Mock APIs
   - Handle errors

---

## 🔧 Development Tips

### Using Redux DevTools

Cài đặt [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
để debug Redux state.

### React Profiler

Sử dụng React DevTools Profiler để measure component performance.

### Testing Best Practices

- Test behavior, not implementation
- Use semantic queries (getByRole > getByTestId)
- Mock external dependencies
- Avoid testing implementation details

---

## 📦 Deployment

### Build

```bash
npm run build
```

Tạo production-ready build trong folder `dist/`

### Deploy Options

- **Vercel** (recommended for Next.js-like projects)
- **Netlify** (easy deployment, good for static sites)
- **GitHub Pages** (free, simple)
- **AWS S3 + CloudFront**
- **Traditional hosting** (upload dist/ folder)

### Example Vercel Deployment

```bash
npm install -g vercel
vercel
```

---

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/)
- [Mock Service Worker](https://mswjs.io/)
- [Vite Documentation](https://vitejs.dev/)

---

## 📝 File Structure Details

### Exercise 1 Files

```
exercise-01/
├── Exercise01Page.jsx          # Wrapper component
├── features/
│   ├── user-profile/
│   │   ├── UserProfile.jsx     # useReducer component
│   │   ├── userReducer.js      # FSM logic
│   │   └── UserProfile.css
│   └── cart/
│       ├── ShoppingCart.jsx    # Redux component
│       ├── cartSlice.js        # RTK slice
│       ├── cartSelectors.js    # Memoized selectors
│       └── ShoppingCart.css
└── store/
    └── index.js                # Redux store config
```

### Exercise 2 Files

```
exercise-02/
├── Exercise02Page.jsx          # Wrapper component
├── features/
│   └── dashboard/
│       ├── Dashboard.jsx       # Main component
│       ├── LargeList.jsx       # useMemo example
│       └── ListItem.jsx        # React.memo example
├── components/
│   └── common/
│       ├── LoadingSpinner.jsx  # Reusable spinner
│       └── LoadingSpinner.css
└── AppRoutes.jsx              # Code splitting routes
```

### Exercise 3 Files

```
exercise-03/
├── Exercise03Page.jsx          # Wrapper component
└── components/
    └── ui/
        ├── Tabs/
        │   ├── Tabs.jsx        # Compound Tabs
        │   ├── TabsContext.jsx # Context setup
        │   └── Tabs.module.css
        └── Modal/
            ├── Modal.jsx       # Portal Modal
            └── Modal.module.css
```

### Exercise 4 Files

```
exercise-04/
├── Exercise04Page.jsx          # Wrapper component
├── components/
│   └── common/
│       ├── ErrorBoundary.jsx   # Error handling
│       └── ErrorBoundary.module.css
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.jsx
│       │   └── LoginForm.module.css
│       ├── api/
│       │   └── authApi.js
│       └── __tests__/
│           └── LoginForm.test.js
├── __tests__/
│   └── mocks/
│       ├── handlers.js         # MSW handlers
│       └── server.js           # MSW server setup
└── setupTests.js               # Jest setup
```

---

## 🤝 Contributing

Feel free to improve this learning platform!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

MIT License - feel free to use for learning purposes

---

## 👨‍💼 Author

Created for UIT Web Developer Practice LAB 05

---

## ⭐ Highlights

✅ Complete React learning journey  
✅ Professional project structure  
✅ Ready for deployment  
✅ Best practices throughout  
✅ Comprehensive documentation  
✅ All 4 exercises integrated  
✅ Production-ready configuration  

---

Happy Learning! 🚀
