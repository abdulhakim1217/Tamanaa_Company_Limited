#!/usr/bin/env node
const fs = require('fs');
const { spawn } = require('child_process');

console.log('=== Starting Tamanaa Rice Processing Development Server ===\n');

// Clean .next cache
if (fs.existsSync('.next')) {
  console.log('Cleaning .next cache...');
  try {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('[OK] Cache cleaned\n');
  } catch (error) {
    console.log('[WARN] Could not clean cache:', error.message, '\n');
  }
}

// Check for .env.local
if (!fs.existsSync('.env.local')) {
  console.log('[WARN] .env.local not found!');
  console.log('The app will run with mock data only.');
  console.log("Run 'npm run setup' to configure environment variables.\n");
}

// Start development server
console.log('Starting Next.js development server...\n');
const dev = spawn('npm', ['run', 'dev'], { 
  stdio: 'inherit',
  shell: true 
});

dev.on('error', (error) => {
  console.error('[ERROR] Failed to start dev server:', error);
  process.exit(1);
});

dev.on('exit', (code) => {
  process.exit(code);
});
