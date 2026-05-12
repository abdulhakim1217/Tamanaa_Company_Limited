#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Tamanaa Rice Processing - Setup Script ===\n');

// Step 1: Clean cache
console.log('Step 1: Cleaning cache and build artifacts...');
function removeDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`[OK] Removed ${dirPath}`);
    }
  } catch (error) {
    console.log(`[WARN] Could not remove ${dirPath}`);
  }
}

removeDir('.next');
removeDir('.turbo');
removeDir(path.join('node_modules', '.cache'));

// Step 2: Check environment variables
console.log('\nStep 2: Checking environment variables...');
if (!fs.existsSync('.env.local')) {
  console.log('[WARN] .env.local not found!');
  console.log('Creating .env.local from .env.example...');
  try {
    fs.copyFileSync('.env.example', '.env.local');
    console.log('[OK] Created .env.local');
    console.log('\n[IMPORTANT] Please edit .env.local and add your credentials!');
    console.log('   - NEXT_PUBLIC_SUPABASE_URL');
    console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.log('   - DATABASE_URL');
  } catch (error) {
    console.log('[ERROR] Could not create .env.local:', error.message);
  }
} else {
  console.log('[OK] .env.local exists');
}

// Step 3: Install dependencies
console.log('\nStep 3: Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('[OK] Dependencies installed successfully');
} catch (error) {
  console.log('[ERROR] Failed to install dependencies');
  process.exit(1);
}

// Step 4: Type check
console.log('\nStep 4: Running TypeScript type check...');
try {
  execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
  console.log('[OK] No TypeScript errors found');
} catch (error) {
  console.log('[WARN] TypeScript errors found (non-critical)');
}

// Summary
console.log('\n=== Setup Complete ===\n');
console.log('Next steps:');
console.log('1. Edit .env.local with your Supabase and database credentials');
console.log('2. Run "npm run dev" to start the development server');
console.log('3. Open http://localhost:3000 in your browser\n');
console.log('For more information, see:');
console.log('- README.md - Complete setup guide');
console.log('- QUICK_START.md - 5-minute quick start');
console.log('- IMPLEMENTATION_STATUS.md - Feature list\n');
console.log('Happy Rice Processing!\n');
