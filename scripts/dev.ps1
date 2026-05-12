# Tamanaa Company Limited - Development Server Script
# This script starts the development server with proper cleanup

Write-Host "=== Starting Tamanaa Rice Processing Development Server ===" -ForegroundColor Green
Write-Host ""

# Clean cache if it exists and has permission issues
if (Test-Path ".next") {
    Write-Host "Cleaning .next cache..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "[OK] Cache cleaned" -ForegroundColor Green
    Write-Host ""
}

# Check for environment variables
if (-not (Test-Path ".env.local")) {
    Write-Host "[WARN] Warning: .env.local not found!" -ForegroundColor Yellow
    Write-Host "The app will run with mock data only." -ForegroundColor Yellow
    Write-Host "Run 'npm run setup' to configure environment variables." -ForegroundColor Yellow
    Write-Host ""
}

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Cyan
Write-Host ""
npm run dev
