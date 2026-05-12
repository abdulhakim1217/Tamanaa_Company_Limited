# Tamanaa Company Limited - Setup Script
# This script helps set up the development environment

Write-Host "=== Tamanaa Rice Processing - Setup Script ===" -ForegroundColor Green
Write-Host ""

# Step 1: Clean cache and build artifacts
Write-Host "Step 1: Cleaning cache and build artifacts..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "[OK] Removed .next directory" -ForegroundColor Green
}
if (Test-Path ".turbo") {
    Remove-Item -Path ".turbo" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "[OK] Removed .turbo directory" -ForegroundColor Green
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "[OK] Removed node_modules cache" -ForegroundColor Green
}

# Step 2: Check for .env.local
Write-Host ""
Write-Host "Step 2: Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Write-Host "[WARN] .env.local not found!" -ForegroundColor Red
    Write-Host "Creating .env.local from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "[OK] Created .env.local" -ForegroundColor Green
    Write-Host ""
    Write-Host "[IMPORTANT] Please edit .env.local and add your credentials!" -ForegroundColor Red
    Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Yellow
    Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Yellow
    Write-Host "   - DATABASE_URL" -ForegroundColor Yellow
} else {
    Write-Host "[OK] .env.local exists" -ForegroundColor Green
}

# Step 3: Install dependencies
Write-Host ""
Write-Host "Step 3: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 4: Type check
Write-Host ""
Write-Host "Step 4: Running TypeScript type check..." -ForegroundColor Yellow
npx tsc --noEmit --skipLibCheck
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] No TypeScript errors found" -ForegroundColor Green
} else {
    Write-Host "[WARN] TypeScript errors found (non-critical)" -ForegroundColor Yellow
}

# Step 5: Summary
Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env.local with your Supabase and database credentials" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor Cyan
Write-Host "- README.md - Complete setup guide" -ForegroundColor White
Write-Host "- QUICK_START.md - 5-minute quick start" -ForegroundColor White
Write-Host "- IMPLEMENTATION_STATUS.md - Feature list" -ForegroundColor White
Write-Host ""
Write-Host "Happy Rice Processing!" -ForegroundColor Green
