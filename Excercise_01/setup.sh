#!/bin/bash

# ============================================================
# LAB 5: REACT ADVANCED STATE MANAGEMENT
# Installation & Setup Guide
# ============================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  React Advanced - State Management Lab Setup              ║"
echo "╚════════════════════════════════════════════════════════════╝"

# ============================================================
# STEP 1: Check Prerequisites
# ============================================================

echo ""
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm: $NPM_VERSION"

# ============================================================
# STEP 2: Install Dependencies
# ============================================================

echo ""
echo "📦 Installing dependencies..."
echo "   This may take a few minutes..."

npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# ============================================================
# STEP 3: Verify Installation
# ============================================================

echo ""
echo "🔍 Verifying installation..."

if [ -d "node_modules" ]; then
    echo "✅ node_modules directory created"
fi

if [ -f "node_modules/react/package.json" ]; then
    REACT_VERSION=$(node -e "console.log(require('./node_modules/react/package.json').version)")
    echo "✅ React: $REACT_VERSION"
fi

if [ -f "node_modules/@reduxjs/toolkit/package.json" ]; then
    RTK_VERSION=$(node -e "console.log(require('./node_modules/@reduxjs/toolkit/package.json').version)")
    echo "✅ Redux Toolkit: $RTK_VERSION"
fi

# ============================================================
# STEP 4: Display Project Structure
# ============================================================

echo ""
echo "📁 Project Structure:"
echo ""
tree -L 3 -I 'node_modules' 2>/dev/null || find . -type f -name "*.jsx" -o -name "*.js" -o -name "*.css" | head -20

# ============================================================
# STEP 5: Next Steps
# ============================================================

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    SETUP COMPLETE! ✅                      ║"
echo "╚════════════════════════════════════════════════════════════╝"

echo ""
echo "🚀 NEXT STEPS:"
echo ""
echo "   1. Start development server:"
echo "      $ npm run dev"
echo ""
echo "   2. Open browser:"
echo "      http://localhost:3000"
echo ""
echo "   3. Explore the application:"
echo "      - Part 1: useReducer with FSM"
echo "      - Part 2: Redux Toolkit Shopping Cart"
echo ""
echo "   4. Check documentation:"
echo "      - README.md - Full documentation"
echo "      - USAGE_EXAMPLES.js - Code examples"
echo "      - QUICK_REFERENCE.js - Quick reference"
echo "      - SOLUTION_SUMMARY.js - Solution overview"
echo ""
echo "📚 Learning Resources:"
echo "   - https://react.dev/reference/react/useReducer"
echo "   - https://redux-toolkit.js.org/"
echo "   - https://github.com/reduxjs/reselect"
echo ""
echo "💡 Tips:"
echo "   - Open Redux DevTools (extension) to see state changes"
echo "   - Use React DevTools to debug components"
echo "   - Check the QUICK_REFERENCE.js for debugging tips"
echo ""
echo "Happy coding! 🎉"
