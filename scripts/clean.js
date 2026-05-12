#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('=== Cleaning Tamanaa Rice Processing Cache ===\n');

function removeDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`[OK] Removed ${dirPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`[WARN] Could not remove ${dirPath}: ${error.message}`);
    return false;
  }
}

// Clean directories
removeDir('.next');
removeDir('.turbo');
removeDir(path.join('node_modules', '.cache'));

console.log('\n=== Cache Cleaned Successfully ===\n');
console.log('You can now run: npm run dev\n');
