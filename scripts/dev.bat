@echo off
REM Tamanaa Company Limited - Development Server
REM Simple batch script for starting dev server

echo === Starting Tamanaa Rice Processing Development Server ===
echo.

REM Clean cache first
if exist .next (
    echo Cleaning .next cache...
    rmdir /s /q .next 2>nul
    echo [OK] Cache cleaned
    echo.
)

REM Check for environment file
if not exist .env.local (
    echo [WARN] .env.local not found!
    echo The app will run with mock data only.
    echo Run 'npm run setup' to configure environment variables.
    echo.
)

REM Start development server
echo Starting Next.js development server...
echo.
npm run dev
