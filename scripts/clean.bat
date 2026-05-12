@echo off
REM Tamanaa Company Limited - Clean Cache Script
REM Simple batch script for cleaning cache

echo === Cleaning Tamanaa Rice Processing Cache ===
echo.

if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
    echo [OK] .next removed
)

if exist .turbo (
    echo Removing .turbo directory...
    rmdir /s /q .turbo
    echo [OK] .turbo removed
)

if exist node_modules\.cache (
    echo Removing node_modules cache...
    rmdir /s /q node_modules\.cache
    echo [OK] Cache removed
)

echo.
echo === Cache Cleaned Successfully ===
echo.
echo You can now run: npm run dev
echo.
pause
