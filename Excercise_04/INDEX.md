# 📑 React Testing Lab - Documentation Index

**Location:** `/Users/quannguyen/Documents/UIT/Web Developer/Practice/LAB_05/Excercise_04/`

---

## 🎯 Start Here

### For First-Time Users
👉 **Start with:** [QUICK_START.md](./QUICK_START.md) (5 min read)
- Overview of what's included
- Installation & running tests
- Key concepts summary

### For Learning Deep
👉 **Read:** [README_TESTING.md](./README_TESTING.md) (30 min read)
- Complete testing philosophy
- TASK 1 LoginForm (detailed)
- TASK 2 Error Boundaries (detailed)
- Best practices & patterns
- Troubleshooting guide

### For Quick Reference
👉 **Use:** [TESTING_CHEATSHEET.md](./TESTING_CHEATSHEET.md) (5 min lookup)
- Query reference
- User interaction patterns
- Common assertions
- Debugging tips

### For Visual Learning
👉 **See:** [TESTING_VISUAL_GUIDE.md](./TESTING_VISUAL_GUIDE.md) (10 min)
- Flow diagrams
- Architecture visualizations
- Query hierarchy
- Coverage explained

### For Status Check
👉 **Review:** [TESTING_COMPLETION.txt](./TESTING_COMPLETION.txt) (5 min)
- Implementation summary
- File structure
- Statistics & metrics

---

## 📚 Documentation by Purpose

### Understanding Concepts
- **What is Testing?** → QUICK_START.md
- **Testing Philosophy** → README_TESTING.md (Philosophy section)
- **Arrange-Act-Assert Pattern** → README_TESTING.md or TESTING_VISUAL_GUIDE.md
- **React Testing Library** → README_TESTING.md (TASK 1 section)
- **Error Boundaries** → README_TESTING.md (TASK 2 section)

### Learning by Doing
- **Form Testing Example** → LoginForm.test.js (start at Suite 1)
- **Error Boundary Example** → ErrorBoundary.test.js (start at Suite 1)
- **API Mocking Example** → setupTests.js + handlers.js
- **Keyboard Navigation** → LoginForm.test.js (Accessibility suite)

### Reference Materials
- **All Queries** → TESTING_CHEATSHEET.md (Queries section)
- **All Assertions** → TESTING_CHEATSHEET.md (Assertions section)
- **All Interactions** → TESTING_CHEATSHEET.md (User Interactions section)
- **Running Tests** → QUICK_START.md or README_TESTING.md (Running Tests section)

### Debugging & Troubleshooting
- **Common Mistakes** → TESTING_CHEATSHEET.md (end of file)
- **Test Failures** → README_TESTING.md (Troubleshooting section)
- **MSW Issues** → README_TESTING.md (Best Practices section)
- **Debugging Tips** → TESTING_CHEATSHEET.md (Debugging section)

---

## 🗂️ File Structure Map

```
Excercise_04/
│
├── 📖 DOCUMENTATION FILES (YOU ARE HERE)
│   ├── QUICK_START.md                ← Start here (new users)
│   ├── README_TESTING.md             ← Complete guide
│   ├── TESTING_CHEATSHEET.md         ← Quick reference
│   ├── TESTING_VISUAL_GUIDE.md       ← Diagrams
│   ├── TESTING_COMPLETION.txt        ← Summary
│   └── INDEX.md                      ← This file
│
├── 🎯 SOURCE CODE
│   ├── src/
│   │   ├── features/auth/
│   │   │   ├── components/LoginForm.jsx
│   │   │   ├── api/authApi.js
│   │   │   └── __tests__/LoginForm.test.js
│   │   ├── components/common/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── __tests__/ErrorBoundary.test.js
│   │   ├── __tests__/mocks/
│   │   │   ├── handlers.js
│   │   │   └── server.js
│   │   ├── setupTests.js
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   └── main.jsx
│   │
│   ├── ⚙️ CONFIGURATION
│   ├── jest.config.js
│   ├── .babelrc.js
│   ├── package.json
│   ├── index.html
│   │
│   └── 📄 OTHER
│       └── [project files]
```

---

## 🎓 Learning Path

### Beginner Path (Day 1)
1. ✅ Read QUICK_START.md (5 min)
2. ✅ Install dependencies (5 min)
3. ✅ Run tests: `npm test` (5 min)
4. ✅ Read TESTING_PHILOSOPHY section (15 min)
5. ✅ Look at TESTING_VISUAL_GUIDE.md (15 min)
   **Total: ~45 minutes**

### Intermediate Path (Day 2)
1. ✅ Read README_TESTING.md TASK 1 section (30 min)
2. ✅ Read LoginForm.test.js with comments (30 min)
3. ✅ Run a single test in watch mode (10 min)
4. ✅ Modify a test and see it fail/pass (10 min)
5. ✅ Try writing your own simple test (20 min)
   **Total: ~100 minutes**

### Advanced Path (Day 3)
1. ✅ Read README_TESTING.md TASK 2 section (30 min)
2. ✅ Read ErrorBoundary.test.js with comments (30 min)
3. ✅ Review MSW setup (handlers.js + setupTests.js) (20 min)
4. ✅ Write tests for a new component (60 min)
5. ✅ Run coverage report: `npm test -- --coverage` (10 min)
   **Total: ~150 minutes**

---

## 🔍 Finding Specific Topics

### By Topic

**Testing Queries**
- Location: TESTING_CHEATSHEET.md (Queries section)
- Also: README_TESTING.md (Best Practices section)
- Visual: TESTING_VISUAL_GUIDE.md (Query Priority)

**User Interactions**
- Location: TESTING_CHEATSHEET.md (User Interactions section)
- Also: README_TESTING.md (TASK 1 section)
- Examples: LoginForm.test.js (all suites)

**API Mocking**
- Location: README_TESTING.md (Task 1 section)
- Setup: setupTests.js + src/__tests__/mocks/
- Examples: LoginForm.test.js (Error Handling suite)

**Error Handling**
- Location: README_TESTING.md (TASK 2 section)
- Component: src/components/common/ErrorBoundary.jsx
- Tests: ErrorBoundary.test.js (all suites)
- Visual: TESTING_VISUAL_GUIDE.md (Error Boundary section)

**Accessibility**
- Location: README_TESTING.md (TASK 1, Accessibility suite)
- Tests: LoginForm.test.js (Accessibility suite)
- Details: TESTING_CHEATSHEET.md (Best Practices)

**Keyboard Navigation**
- Location: README_TESTING.md (TASK 1, Pattern 3)
- Test: LoginForm.test.js (Test 15)
- Guide: TESTING_VISUAL_GUIDE.md

**Debugging**
- Location: TESTING_CHEATSHEET.md (Debugging section)
- Also: README_TESTING.md (Troubleshooting section)
- Visual: TESTING_VISUAL_GUIDE.md (Debugging Tips)

### By Component

**LoginForm**
- Component: src/features/auth/components/LoginForm.jsx
- Tests: src/features/auth/__tests__/LoginForm.test.js
- Docs: README_TESTING.md (TASK 1 section)
- Patterns: TESTING_CHEATSHEET.md (Pattern 1 & 2)

**ErrorBoundary**
- Component: src/components/common/ErrorBoundary.jsx
- Tests: src/components/common/__tests__/ErrorBoundary.test.js
- Docs: README_TESTING.md (TASK 2 section)
- Visual: TESTING_VISUAL_GUIDE.md (Error Boundary section)

**MSW Setup**
- Handlers: src/__tests__/mocks/handlers.js
- Server: src/__tests__/mocks/server.js
- Setup: src/setupTests.js
- Docs: README_TESTING.md (TASK 1 section)

---

## ✅ Quick Navigation

### "I want to..."

**...learn React Testing Library**
1. Read: QUICK_START.md (overview)
2. Read: README_TESTING.md (philosophy + Task 1)
3. Look: LoginForm.test.js (examples)
4. Reference: TESTING_CHEATSHEET.md

**...understand Error Boundaries**
1. Read: README_TESTING.md (TASK 2 section)
2. Read: ErrorBoundary.jsx (component)
3. Read: ErrorBoundary.test.js (tests)
4. Visual: TESTING_VISUAL_GUIDE.md

**...run the tests**
```bash
npm install
npm test                    # Run all tests
npm test -- --watch       # Watch mode
npm test -- --coverage    # Coverage report
```

**...write tests for my component**
1. Look: LoginForm.test.js (structure)
2. Copy the AAA pattern
3. Use TESTING_CHEATSHEET.md for queries
4. Reference: Best Practices section

**...debug a failing test**
1. Use: TESTING_CHEATSHEET.md (Debugging)
2. Read: README_TESTING.md (Troubleshooting)
3. Try: screen.debug() in test
4. Check: MSW handlers are correct

**...understand MSW (API mocking)**
1. Read: handlers.js (handler setup)
2. Read: setupTests.js (server setup)
3. Read: README_TESTING.md (Mocking section)
4. Look: LoginForm.test.js (error handlers)

---

## 📊 Documentation Statistics

| File | Type | Lines | Purpose |
|------|------|-------|---------|
| QUICK_START.md | Guide | 300 | Overview & quick start |
| README_TESTING.md | Guide | 2000+ | Complete reference |
| TESTING_CHEATSHEET.md | Reference | 500 | Quick lookup |
| TESTING_VISUAL_GUIDE.md | Visual | 400 | Diagrams & flows |
| TESTING_COMPLETION.txt | Summary | 300 | Status report |
| INDEX.md | Navigation | 300 | This file |
| **Total** | **6 files** | **~3,800** | **Complete docs** |

---

## 🎯 Common Questions

**Q: Where do I start?**  
A: Read QUICK_START.md (5 min), then run `npm test`

**Q: How do I write a test?**  
A: Copy the AAA pattern from LoginForm.test.js

**Q: What queries should I use?**  
A: Check TESTING_CHEATSHEET.md (Queries section)

**Q: How do I mock APIs?**  
A: Look at setupTests.js and handlers.js

**Q: How do I debug tests?**  
A: Use screen.debug() or --inspect-brk flag

**Q: Where's the complete guide?**  
A: README_TESTING.md (2000+ lines)

**Q: What's the file structure?**  
A: See this INDEX.md or TESTING_COMPLETION.txt

---

## 🚀 Quick Commands

```bash
# Install & Setup
npm install

# Running Tests
npm test                        # Run all tests
npm test -- --watch            # Watch mode
npm test LoginForm.test.js     # Specific file
npm test -- --coverage         # Coverage report

# Development
npm run dev                    # Start server

# Debugging
npm test -- --inspect-brk --runInBand  # Debug mode
```

---

## 📞 Need Help?

1. **Questions about testing?**  
   → README_TESTING.md (complete guide)

2. **Looking for a query?**  
   → TESTING_CHEATSHEET.md (quick ref)

3. **Want to understand architecture?**  
   → TESTING_VISUAL_GUIDE.md (diagrams)

4. **Tests failing?**  
   → README_TESTING.md (troubleshooting section)

5. **Want examples?**  
   → LoginForm.test.js or ErrorBoundary.test.js

---

**Last Updated:** January 2, 2026  
**Status:** ✅ Complete  
**Tests:** 100+  
**Documentation:** 3,800+ lines  

**Happy Testing!** 🧪
