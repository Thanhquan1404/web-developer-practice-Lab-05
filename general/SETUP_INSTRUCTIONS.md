# ✅ Installation & Setup Instructions

## Project Created Successfully! 🎉

Folder **`general`** đã được tạo thành công với tất cả 4 Exercise được tích hợp chuyên nghiệp.

---

## 📁 Folder Location

```
/Users/quannguyen/Documents/UIT/Web Developer/Practice/LAB_05/general/
```

---

## 🚀 Getting Started (3 Steps)

### Step 1: Navigate to Project

```bash
cd /Users/quannguyen/Documents/UIT/Web\ Developer/Practice/LAB_05/general
```

### Step 2: Install Dependencies

```bash
npm install
```

Điều này sẽ cài đặt tất cả dependencies từ `package.json` (kết hợp từ 4 Exercise).

### Step 3: Start Development Server

```bash
npm run dev
```

Server sẽ chạy tại **[http://localhost:3000](http://localhost:3000)**

---

## 📊 What Was Created

### Project Structure

```
general/
├── 📄 README.md                    # Full documentation
├── 📄 QUICK_START.md              # Quick start guide
├── 📄 DEPLOYMENT_GUIDE.md         # Deployment instructions
├── 📄 INTEGRATION_SUMMARY.md       # How exercises are combined
├── 📄 PROJECT_FILE_INDEX.md       # Complete file listing
│
├── 📋 Configuration Files
│   ├── package.json               # All dependencies combined
│   ├── vite.config.js            # Vite configuration
│   ├── jest.config.js            # Jest testing config
│   ├── .babelrc                  # Babel config
│   ├── .gitignore                # Git ignore rules
│   └── index.html                # HTML entry point
│
└── 📁 src/
    ├── App.jsx                   # Main app with navigation
    ├── main.jsx                  # Entry point
    │
    ├── components/
    │   └── Navigation.jsx        # Tab navigation for 4 exercises
    │
    ├── pages/
    │   ├── exercise-01/          # State Management (useReducer + Redux)
    │   │   ├── Exercise01Page.jsx
    │   │   ├── features/
    │   │   ├── store/
    │   │   └── ...
    │   │
    │   ├── exercise-02/          # Performance (useMemo, useCallback)
    │   │   ├── Exercise02Page.jsx
    │   │   ├── features/
    │   │   ├── components/
    │   │   └── ...
    │   │
    │   ├── exercise-03/          # Design System (Compound Components, Portals)
    │   │   ├── Exercise03Page.jsx
    │   │   ├── components/ui/
    │   │   └── ...
    │   │
    │   └── exercise-04/          # Testing (RTL, Jest, MSW, Error Boundaries)
    │       ├── Exercise04Page.jsx
    │       ├── components/
    │       ├── features/
    │       ├── __tests__/
    │       └── ...
    │
    └── styles/
        ├── globals.css           # CSS variables & global styles
        ├── layout.css            # App layout styles
        └── exercises.css         # Exercise wrapper styles
```

---

## 📚 Understanding the Project

### 4 Integrated Exercises

| # | Exercise | Focus | Location |
|---|----------|-------|----------|
| 1 | **State Management** | useReducer (FSM) + Redux Toolkit | `src/pages/exercise-01/` |
| 2 | **Performance** | useMemo, useCallback, Code Splitting | `src/pages/exercise-02/` |
| 3 | **Design System** | Compound Components, Context, Portals | `src/pages/exercise-03/` |
| 4 | **Testing** | React Testing Library, Jest, MSW | `src/pages/exercise-04/` |

### Navigation

- Click on **4 tab buttons** in the header
- Each tab loads a different exercise
- All exercises run in the **same application**

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run tests once
npm run test:watch      # Watch mode for tests
npm run test:coverage   # Coverage report

# Code Quality
npm run lint            # Run ESLint
```

---

## 📖 Documentation Files

### For Quick Start
👉 **Read:** [QUICK_START.md](./QUICK_START.md)
- 30-second quick start
- Basic project overview
- Common tasks

### For Detailed Info
👉 **Read:** [README.md](./README.md)
- Complete documentation
- Exercise details
- Key concepts
- Resources

### For Deployment
👉 **Read:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Vercel deployment
- Netlify deployment
- AWS deployment
- Docker setup

### For Understanding Integration
👉 **Read:** [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- How 4 exercises are combined
- Architecture diagram
- Data flow
- Integration benefits

### For File Reference
👉 **Read:** [PROJECT_FILE_INDEX.md](./PROJECT_FILE_INDEX.md)
- Complete file listing
- File descriptions
- File statistics

---

## 🎯 Next Steps

### Option 1: Learn & Explore
```bash
cd general
npm install
npm run dev

# Open browser → http://localhost:3000
# Click through each exercise tab
# Read comments in source files
# Explore each component
```

### Option 2: Run Tests
```bash
cd general
npm install
npm test

# See tests from Exercise 4 running
# Tests use Mock Service Worker (MSW)
# Press 'w' to watch mode
```

### Option 3: Build for Production
```bash
cd general
npm install
npm run build

# Creates optimized build in 'dist/' folder
# Ready for deployment
```

### Option 4: Deploy
```bash
# See DEPLOYMENT_GUIDE.md for detailed instructions

# Vercel (recommended)
npm install -g vercel
vercel

# Or Netlify
npm install -g netlify-cli
netlify deploy

# Or GitHub Pages
# Configure and push to GitHub
```

---

## 🔍 Project Overview

### What's Inside

✅ **45+ Source Files**
- JSX/JS files: 25+
- CSS files: 12+
- Test files: 3+
- Config files: 5

✅ **Complete Exercise 1: State Management**
- User Profile with useReducer (FSM pattern)
- Shopping Cart with Redux Toolkit
- Redux store with configureStore
- Memoized selectors with reselect

✅ **Complete Exercise 2: Performance Optimization**
- Dashboard with 10,000 items
- useMemo for optimization
- React.memo for components
- useCallback for functions
- Code splitting with React.lazy

✅ **Complete Exercise 3: Design System**
- Compound Tabs component
- Context API for implicit state sharing
- Modal with React.createPortal
- Event bubbling through portals

✅ **Complete Exercise 4: Testing**
- React Testing Library integration tests
- Jest test framework
- Mock Service Worker (MSW) for API mocking
- Error Boundary implementation
- Test file examples

✅ **Professional Setup**
- Vite for fast development
- ESLint for code quality
- Babel for transpiling
- Git configuration
- Production-ready build

---

## 💡 Key Features

### Single Application
- All 4 exercises in ONE app
- Tab-based navigation
- No folder switching needed

### Unified Dependencies
- Single `package.json`
- All 4 exercises' dependencies combined
- Optimized bundle size

### Professional Structure
- Follows React best practices
- Properly organized folders
- Reusable components and styles

### Production Ready
- Optimized build process
- Testing configuration
- Deployment guides included
- Error handling setup

### Comprehensive Documentation
- README.md - Full documentation
- QUICK_START.md - Quick reference
- DEPLOYMENT_GUIDE.md - Deploy instructions
- INTEGRATION_SUMMARY.md - How it's combined
- PROJECT_FILE_INDEX.md - File reference

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Dependencies Issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Failed
```bash
npm run build -- --debug
# Check error messages
```

### Tests Not Found
```bash
npm test -- --listTests
# Shows all available tests
```

---

## 📦 Requirements

- **Node.js:** >= 16
- **npm:** >= 8
- **Modern Browser** (Chrome, Firefox, Safari, Edge)

---

## ✨ Highlights

🎓 **Educational**
- Learn 4 React topics in one project
- See how concepts work together
- Real-world project structure

🚀 **Production Ready**
- Optimized for performance
- Configured for testing
- Ready to deploy

📚 **Well Documented**
- Multiple README files
- Code comments
- Examples for each concept

🎯 **Professional**
- Follows best practices
- Clean code structure
- Deployable immediately

---

## 🔗 Important Links

- **React Documentation:** https://react.dev
- **Redux Toolkit:** https://redux-toolkit.js.org
- **React Testing Library:** https://testing-library.com
- **Vite:** https://vitejs.dev
- **Jest:** https://jestjs.io

---

## 📞 Support

Having issues? Check:
1. **QUICK_START.md** - For quick answers
2. **README.md** - For detailed explanations
3. **Source code comments** - In each file
4. **Official docs** - Links above

---

## 🎉 You're All Set!

Everything is ready to go. Just run:

```bash
cd /Users/quannguyen/Documents/UIT/Web\ Developer/Practice/LAB_05/general
npm install
npm run dev
```

Then open your browser to **http://localhost:3000** 

Happy Learning! 🚀📚

---

**Created:** January 2, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Development & Deployment
