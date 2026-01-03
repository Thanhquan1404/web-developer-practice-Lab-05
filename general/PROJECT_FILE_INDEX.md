# 📑 Project File Index

Complete file structure and contents overview of the `general` project.

---

## Root Level Files

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `vite.config.js` | Vite build configuration |
| `jest.config.js` | Jest testing configuration |
| `.babelrc` | Babel transpiler configuration |
| `.gitignore` | Git ignore rules |
| `index.html` | HTML entry point |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `QUICK_START.md` | Quick start guide |
| `DEPLOYMENT_GUIDE.md` | Deployment instructions |
| `PROJECT_FILE_INDEX.md` | This file - project structure |

---

## Source Code Structure

### `/src` - Main Source Folder

```
src/
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
├── components/
│   ├── Navigation.jsx      # Exercise navigation component
│   └── ...
├── pages/
│   ├── exercise-01/        # Exercise 1: State Management
│   ├── exercise-02/        # Exercise 2: Performance
│   ├── exercise-03/        # Exercise 3: Design System
│   └── exercise-04/        # Exercise 4: Testing
├── styles/
│   ├── globals.css         # Global styles
│   ├── layout.css          # Layout styles
│   └── exercises.css       # Exercise-specific styles
└── utils/
    └── (utility files)
```

---

## Exercise 1: State Management

### Location: `/src/pages/exercise-01/`

#### Main Files

| File | Description |
|------|-------------|
| `Exercise01Page.jsx` | Wrapper component for Exercise 1 |

#### Features - User Profile (useReducer + FSM)

```
features/user-profile/
├── UserProfile.jsx         # Main component using useReducer
├── userReducer.js          # FSM pattern implementation
├── UserProfile.css         # Component styling
└── (related files)
```

**Key Concepts:**
- Finite State Machine (FSM) pattern
- useReducer hook
- State transitions
- Error handling

#### Features - Shopping Cart (Redux Toolkit)

```
features/cart/
├── ShoppingCart.jsx        # Main component using Redux
├── cartSlice.js            # Redux Toolkit slice
├── cartSelectors.js        # Memoized selectors
├── ShoppingCart.css        # Component styling
└── (related files)
```

**Key Concepts:**
- Redux Toolkit configureStore
- createSlice for reducers/actions
- Memoized selectors with reselect
- Global state management

#### Store

```
store/
└── index.js                # Redux store configuration
```

**Key Concepts:**
- configureStore setup
- Redux DevTools integration
- Middleware configuration

---

## Exercise 2: Performance Optimization

### Location: `/src/pages/exercise-02/`

#### Main Files

| File | Description |
|------|-------------|
| `Exercise02Page.jsx` | Wrapper component for Exercise 2 |
| `AppRoutes.jsx` | Code splitting with React.lazy |

#### Features - Dashboard (Performance Techniques)

```
features/dashboard/
├── Dashboard.jsx           # Main dashboard component
├── LargeList.jsx          # useMemo optimization example
├── ListItem.jsx           # React.memo optimization example
├── Dashboard.css          # Styling
└── (related files)
```

**Key Concepts:**
- useMemo hook for value memoization
- useCallback hook for function memoization
- React.memo for component memoization
- Performance profiling

#### Components - Common

```
components/common/
├── LoadingSpinner.jsx     # Reusable spinner component
├── LoadingSpinner.css     # Spinner styling
└── (related files)
```

**Key Concepts:**
- Reusable components
- Loading states
- Suspense handling

---

## Exercise 3: Design System

### Location: `/src/pages/exercise-03/`

#### Main Files

| File | Description |
|------|-------------|
| `Exercise03Page.jsx` | Wrapper component for Exercise 3 |

#### Components - UI System

```
components/ui/
├── index.js                # UI components exports
│
├── Tabs/
│   ├── Tabs.jsx            # Compound Tabs component
│   ├── TabsContext.jsx     # Context for Tabs
│   └── Tabs.module.css     # Module styles
│
└── Modal/
    ├── Modal.jsx           # Modal with Portal
    └── Modal.module.css    # Module styles
```

**Key Concepts:**

#### Tabs Component:
- Compound component pattern
- Context API for state sharing
- Child component communication
- Flexible composition

#### Modal Component:
- React.createPortal for rendering
- Event bubbling through portals
- Backdrop handling
- Modal lifecycle

---

## Exercise 4: Testing

### Location: `/src/pages/exercise-04/`

#### Main Files

| File | Description |
|------|-------------|
| `Exercise04Page.jsx` | Wrapper component for Exercise 4 |
| `setupTests.js` | Jest setup and configuration |

#### Components - Common (with Tests)

```
components/common/
├── ErrorBoundary.jsx       # Error Boundary component
├── ErrorBoundary.module.css # Styling
│
└── __tests__/
    └── ErrorBoundary.test.js # Error Boundary tests
```

**Key Concepts:**
- Error Boundary class component
- Error handling and recovery
- Error logging
- Fallback UI

#### Features - Auth

```
features/auth/
├── components/
│   ├── LoginForm.jsx       # Login form component
│   └── LoginForm.module.css # Styling
│
├── api/
│   └── authApi.js          # Mock API functions
│
└── __tests__/
    └── LoginForm.test.js   # LoginForm tests
```

**Key Concepts:**
- Form handling
- Async operations
- Integration testing
- User interactions

#### Tests - Mocks

```
__tests__/mocks/
├── handlers.js             # MSW request handlers
└── server.js               # MSW server setup
```

**Key Concepts:**
- Mock Service Worker (MSW)
- API mocking
- Request handlers
- Test server configuration

---

## Styles Folder Structure

```
src/styles/
├── globals.css             # CSS variables, resets, global styles
├── layout.css              # App layout, header, footer, nav
├── exercises.css           # Exercise-specific styles
└── (module.css files in components)
```

### Global Styles (`globals.css`)

- CSS custom properties (variables)
- Global resets
- Typography styles
- Base element styles
- Form controls

### Layout Styles (`layout.css`)

- App layout structure
- Header and footer
- Navigation tabs
- Main content area
- Responsive layout

### Exercise Styles (`exercises.css`)

- Exercise content wrappers
- Tab selectors
- Demo sections
- Learning notes
- Responsive design

---

## Utils Folder

```
src/utils/
└── (utility functions and helpers)
```

Currently empty but available for:
- Helper functions
- Constants
- Custom hooks
- Utility functions shared across exercises

---

## Complete File Tree

```
general/
├── .babelrc
├── .gitignore
├── DEPLOYMENT_GUIDE.md
├── QUICK_START.md
├── PROJECT_FILE_INDEX.md
├── README.md
├── index.html
├── jest.config.js
├── package.json
├── vite.config.js
│
└── src/
    ├── App.jsx
    ├── main.jsx
    │
    ├── components/
    │   └── Navigation.jsx
    │
    ├── pages/
    │   ├── exercise-01/
    │   │   ├── Exercise01Page.jsx
    │   │   ├── features/
    │   │   │   ├── cart/
    │   │   │   │   ├── ShoppingCart.jsx
    │   │   │   │   ├── ShoppingCart.css
    │   │   │   │   ├── cartSlice.js
    │   │   │   │   └── cartSelectors.js
    │   │   │   └── user-profile/
    │   │   │       ├── UserProfile.jsx
    │   │   │       ├── UserProfile.css
    │   │   │       └── userReducer.js
    │   │   └── store/
    │   │       └── index.js
    │   │
    │   ├── exercise-02/
    │   │   ├── Exercise02Page.jsx
    │   │   ├── AppRoutes.jsx
    │   │   ├── components/
    │   │   │   └── common/
    │   │   │       ├── LoadingSpinner.jsx
    │   │   │       └── LoadingSpinner.css
    │   │   └── features/
    │   │       └── dashboard/
    │   │           ├── Dashboard.jsx
    │   │           ├── Dashboard.css
    │   │           ├── LargeList.jsx
    │   │           └── ListItem.jsx
    │   │
    │   ├── exercise-03/
    │   │   ├── Exercise03Page.jsx
    │   │   └── components/
    │   │       └── ui/
    │   │           ├── index.js
    │   │           ├── Modal/
    │   │           │   ├── Modal.jsx
    │   │           │   └── Modal.module.css
    │   │           └── Tabs/
    │   │               ├── Tabs.jsx
    │   │               ├── Tabs.module.css
    │   │               └── TabsContext.jsx
    │   │
    │   └── exercise-04/
    │       ├── Exercise04Page.jsx
    │       ├── setupTests.js
    │       ├── components/
    │       │   └── common/
    │       │       ├── ErrorBoundary.jsx
    │       │       ├── ErrorBoundary.module.css
    │       │       └── __tests__/
    │       │           └── ErrorBoundary.test.js
    │       ├── features/
    │       │   └── auth/
    │       │       ├── api/
    │       │       │   └── authApi.js
    │       │       ├── components/
    │       │       │   ├── LoginForm.jsx
    │       │       │   └── LoginForm.module.css
    │       │       └── __tests__/
    │       │           └── LoginForm.test.js
    │       └── __tests__/
    │           └── mocks/
    │               ├── handlers.js
    │               └── server.js
    │
    ├── styles/
    │   ├── globals.css
    │   ├── layout.css
    │   └── exercises.css
    │
    └── utils/
        └── (placeholder for utility files)
```

---

## File Count Summary

| Category | Count |
|----------|-------|
| JSX/JS Files | 25+ |
| CSS Files | 12+ |
| Configuration Files | 5 |
| Documentation Files | 4 |
| Test Files | 3+ |
| **Total Files** | **50+** |

---

## Key Statistics

| Metric | Value |
|--------|-------|
| Total Components | 15+ |
| Redux Slices | 1 |
| Custom Hooks | 5+ |
| CSS Modules | 6 |
| Test Suites | 3+ |
| Lines of Code | 2000+ |

---

## How to Navigate the Project

### If You Want to Learn...

**State Management:**
- Start with `src/pages/exercise-01/features/user-profile/UserProfile.jsx`
- Study `userReducer.js` for FSM pattern
- Then explore `cartSlice.js` for Redux

**Performance:**
- Check `src/pages/exercise-02/features/dashboard/LargeList.jsx`
- Look at `ListItem.jsx` for React.memo
- Review `AppRoutes.jsx` for code splitting

**Design System:**
- Visit `src/pages/exercise-03/components/ui/Tabs/Tabs.jsx`
- Check `TabsContext.jsx` for Context usage
- Explore `Modal.jsx` for Portal implementation

**Testing:**
- Open `src/pages/exercise-04/features/auth/__tests__/LoginForm.test.js`
- Review `handlers.js` for MSW mocking
- Check `ErrorBoundary.jsx` for error handling

---

## Related Documentation

- **README.md** - Full project documentation
- **QUICK_START.md** - Getting started guide
- **DEPLOYMENT_GUIDE.md** - Deployment instructions

---

## Notes

- All CSS files use CSS variables defined in `globals.css`
- Module CSS (`.module.css`) is used for component-scoped styling
- Global CSS for shared styles
- Project follows standard React folder structure
- Each exercise is self-contained in its own folder
- Reusable components in `/components` folder

---

Last Updated: January 2024  
Version: 1.0.0
