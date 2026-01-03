# 📖 Quick Start Guide

## 🎯 Objective

Folder `general` này kết hợp tất cả 4 Exercise thành một single React application, giúp bạn:
- ✅ Hệ thống hóa kiến thức React
- ✅ Hiểu relationships giữa các concepts
- ✅ Prepare cho production deployment
- ✅ Có một portfolio project hoàn chỉnh

---

## ⚡ Quick Start (30 seconds)

```bash
cd general
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) 🎉

---

## 📚 Understanding the Project

### Project Architecture

```
general/                 ← Main integrated project
├── src/
│   ├── pages/
│   │   ├── exercise-01/ ← State Management
│   │   ├── exercise-02/ ← Performance
│   │   ├── exercise-03/ ← Design System
│   │   └── exercise-04/ ← Testing
│   ├── components/
│   │   └── Navigation.jsx ← Main navigation
│   ├── styles/
│   │   ├── globals.css   ← Global styles
│   │   ├── layout.css    ← Layout
│   │   └── exercises.css ← Exercise styles
│   ├── App.jsx           ← Main app
│   └── main.jsx          ← Entry point
├── package.json          ← Dependencies
└── README.md             ← Full documentation
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component, manages exercise navigation |
| `src/components/Navigation.jsx` | Tab navigation between exercises |
| `src/pages/exercise-01/` | All Exercise 1 files (State Management) |
| `src/pages/exercise-02/` | All Exercise 2 files (Performance) |
| `src/pages/exercise-03/` | All Exercise 3 files (Design System) |
| `src/pages/exercise-04/` | All Exercise 4 files (Testing) |
| `package.json` | All dependencies from 4 exercises combined |
| `vite.config.js` | Vite configuration |
| `jest.config.js` | Jest testing configuration |

---

## 🚀 Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report

# Code Quality
npm run lint            # Run ESLint
```

---

## 🎓 Learning Path

### Day 1: Exercise 1 - State Management
- Navigate to "Exercise 1: State Management" tab
- Learn useReducer with FSM pattern
- Explore Redux Toolkit implementation
- Understand memoized selectors

**Key Concepts:**
- Finite State Machine
- Redux Toolkit
- Memoized selectors

### Day 2: Exercise 2 - Performance
- Click "Exercise 2: Performance" tab
- Study useMemo optimization
- Learn React.memo for component memoization
- Explore code splitting with React.lazy

**Key Concepts:**
- useMemo & useCallback
- React.memo
- Code splitting

### Day 3: Exercise 3 - Design System
- Switch to "Exercise 3: Design System"
- Build reusable compound components
- Master Context API
- Learn React Portals

**Key Concepts:**
- Compound Components
- Context API
- React Portals

### Day 4: Exercise 4 - Testing
- Open "Exercise 4: Testing"
- Write integration tests with RTL
- Mock APIs with MSW
- Implement Error Boundaries

**Key Concepts:**
- React Testing Library
- Jest
- Mock Service Worker
- Error Boundaries

---

## 🔍 Exploring Each Exercise

### Exercise 1: State Management

**Files Structure:**
```
exercise-01/
├── Exercise01Page.jsx (wrapper)
├── features/
│   ├── user-profile/
│   │   ├── UserProfile.jsx (useReducer)
│   │   └── userReducer.js (FSM logic)
│   └── cart/
│       ├── ShoppingCart.jsx (Redux)
│       ├── cartSlice.js (state)
│       └── cartSelectors.js (memoized)
└── store/
    └── index.js (Redux config)
```

**To Understand:**
1. Open `UserProfile.jsx` → See useReducer with FSM
2. Open `userReducer.js` → Understand state transitions
3. Open `cartSlice.js` → Redux Toolkit slice
4. Open `cartSelectors.js` → Memoized selectors

---

### Exercise 2: Performance

**Files Structure:**
```
exercise-02/
├── Exercise02Page.jsx (wrapper)
├── features/
│   └── dashboard/
│       ├── Dashboard.jsx (main)
│       ├── LargeList.jsx (useMemo)
│       └── ListItem.jsx (React.memo)
└── components/
    └── common/
        └── LoadingSpinner.jsx
```

**To Understand:**
1. Open `LargeList.jsx` → See useMemo in action
2. Open `ListItem.jsx` → Check React.memo usage
3. Check performance in React DevTools Profiler

---

### Exercise 3: Design System

**Files Structure:**
```
exercise-03/
├── Exercise03Page.jsx (wrapper)
└── components/
    └── ui/
        ├── Tabs/
        │   ├── Tabs.jsx (main)
        │   └── TabsContext.jsx (context)
        └── Modal/
            └── Modal.jsx (Portal)
```

**To Understand:**
1. Open `Tabs.jsx` → Compound component pattern
2. Open `TabsContext.jsx` → Context setup
3. Open `Modal.jsx` → React Portal usage
4. See how components compose together

---

### Exercise 4: Testing

**Files Structure:**
```
exercise-04/
├── Exercise04Page.jsx (wrapper)
├── components/
│   └── common/
│       ├── ErrorBoundary.jsx
│       └── ErrorBoundary.test.js
├── features/
│   └── auth/
│       ├── components/LoginForm.jsx
│       ├── api/authApi.js
│       └── __tests__/LoginForm.test.js
└── __tests__/
    └── mocks/
        ├── handlers.js (MSW)
        └── server.js
```

**To Understand:**
1. Open `LoginForm.test.js` → Integration tests
2. Open `handlers.js` → MSW mock handlers
3. Open `ErrorBoundary.test.js` → Error handling tests
4. Run `npm test` to see tests execute

---

## 🛠️ Common Tasks

### Add a New Component

```jsx
// src/pages/exercise-02/new-component/NewComponent.jsx
import React from 'react';
import './NewComponent.css';

export function NewComponent() {
  return <div>New Component</div>;
}

export default NewComponent;
```

### Modify Redux State

1. Open `src/pages/exercise-01/features/cart/cartSlice.js`
2. Add new reducer action
3. Use in component with `useDispatch`

### Add a New Test

1. Create `__tests__` folder in component directory
2. Create `ComponentName.test.js`
3. Write test using React Testing Library
4. Run `npm test`

---

## 📚 Resources by Exercise

### Exercise 1: State Management
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Finite State Machines](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Reselect](https://github.com/reduxjs/reselect)

### Exercise 2: Performance
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [React.memo](https://react.dev/reference/react/memo)
- [React Suspense](https://react.dev/reference/react/Suspense)

### Exercise 3: Design System
- [Compound Components](https://www.patterns.dev/posts/compound-pattern/)
- [Context API](https://react.dev/reference/react/useContext)
- [React.createPortal](https://react.dev/reference/react-dom/createPortal)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Exercise 4: Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest](https://jestjs.io/docs/getting-started)
- [Mock Service Worker](https://mswjs.io/docs/)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Change port
npm run dev -- --port 3001
```

### Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

### Build Errors

```bash
# Clear everything
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Missing Dependencies

```bash
# Reinstall all
npm install
```

---

## 📦 Deployment

Ready to deploy? Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 💡 Tips & Tricks

### View Redux State
- Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
- Open DevTools → Redux tab to inspect state

### Profile Performance
- React DevTools → Profiler tab
- Record interactions and analyze renders

### Debug Tests
```bash
npm test -- --watch
# Then press 'd' in test runner
```

### Check Bundle Size
```bash
npm install -g vite-plugin-visualizer
npm run build
# Open dist/stats.html
```

---

## 📝 Project Statistics

| Metric | Count |
|--------|-------|
| Total Exercises | 4 |
| Total Components | 15+ |
| Total Test Files | 3+ |
| Lines of Code | 2000+ |
| CSS Files | 8+ |

---

## 🎯 What You'll Learn

After completing all 4 exercises, you'll understand:

✅ Advanced state management patterns  
✅ React performance optimization  
✅ Building reusable component systems  
✅ Testing React applications  
✅ Deploying to production  
✅ Best practices for large projects  

---

## 🚀 Next Steps

1. **Complete all 4 exercises** in order
2. **Modify and experiment** with the code
3. **Write your own components** using patterns learned
4. **Deploy to production** using DEPLOYMENT_GUIDE.md
5. **Build your portfolio** around this project

---

## 📞 Getting Help

- Check README.md for full documentation
- Review comments in component files
- Check original exercise files for reference
- Consult React documentation links above

---

Happy Learning! 🎓🚀
