@echo off
REM ============================================================
REM LAB 5: REACT ADVANCED STATE MANAGEMENT
REM Installation & Setup Guide (Windows)
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ========================================================
echo   React Advanced - State Management Lab Setup
echo ========================================================
echo.

REM ============================================================
REM STEP 1: Check Prerequisites
REM ============================================================

echo Checking prerequisites...
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [X] Node.js is not installed
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js: %NODE_VERSION%

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [X] npm is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm: %NPM_VERSION%

REM ============================================================
REM STEP 2: Install Dependencies
REM ============================================================

echo.
echo Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if errorlevel 1 (
    echo [X] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully

REM ============================================================
REM STEP 3: Display Next Steps
REM ============================================================

echo.
echo ========================================================
echo              SETUP COMPLETE! [OK]
echo ========================================================
echo.
echo NEXT STEPS:
echo.
echo   1. Start development server:
echo      npm run dev
echo.
echo   2. Open browser:
echo      http://localhost:3000
echo.
echo   3. Explore the application:
echo      - Part 1: useReducer with FSM
echo      - Part 2: Redux Toolkit Shopping Cart
echo.
echo DOCUMENTATION:
echo   - README.md - Full documentation
echo   - USAGE_EXAMPLES.js - Code examples
echo   - QUICK_REFERENCE.js - Quick reference
echo   - SOLUTION_SUMMARY.js - Solution overview
echo.
echo Happy coding! [=============]
echo.

pause
