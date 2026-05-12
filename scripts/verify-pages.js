#!/usr/bin/env node

/**
 * Page Verification Script
 * Checks that all expected pages exist and are properly structured
 */

const fs = require('fs');
const path = require('path');

const pages = [
  // Dashboard
  'app/(dashboard)/dashboard/page.tsx',
  
  // HR Module
  'app/(dashboard)/hr/employees/page.tsx',
  'app/(dashboard)/hr/employees/new/page.tsx',
  'app/(dashboard)/hr/departments/page.tsx',
  'app/(dashboard)/hr/attendance/page.tsx',
  'app/(dashboard)/hr/leave/page.tsx',
  'app/(dashboard)/hr/payroll/page.tsx',
  
  // Finance Module
  'app/(dashboard)/finance/accounts/page.tsx',
  'app/(dashboard)/finance/invoices/page.tsx',
  'app/(dashboard)/finance/transactions/page.tsx',
  'app/(dashboard)/finance/budgets/page.tsx',
  'app/(dashboard)/finance/reports/page.tsx',
  
  // Inventory Module
  'app/(dashboard)/inventory/products/page.tsx',
  'app/(dashboard)/inventory/categories/page.tsx',
  'app/(dashboard)/inventory/stock/page.tsx',
  'app/(dashboard)/inventory/raw-rice/page.tsx',
  'app/(dashboard)/inventory/raw-materials/page.tsx',
  'app/(dashboard)/inventory/finished-goods/page.tsx',
  'app/(dashboard)/inventory/packaging/page.tsx',
  'app/(dashboard)/inventory/suppliers/page.tsx',
  'app/(dashboard)/inventory/movements/page.tsx',
  
  // Production Module
  'app/(dashboard)/production/lines/page.tsx',
  'app/(dashboard)/production/stages/page.tsx',
  'app/(dashboard)/production/quality/page.tsx',
  'app/(dashboard)/production/materials/page.tsx',
  'app/(dashboard)/production/reports/page.tsx',
  
  // Sales Module
  'app/(dashboard)/sales/orders/page.tsx',
  'app/(dashboard)/sales/customers/page.tsx',
  'app/(dashboard)/sales/distributors/page.tsx',
  'app/(dashboard)/sales/analytics/page.tsx',
  
  // CRM Module
  'app/(dashboard)/crm/customers/page.tsx',
  'app/(dashboard)/crm/leads/page.tsx',
  'app/(dashboard)/crm/opportunities/page.tsx',
  'app/(dashboard)/crm/analytics/page.tsx',
  
  // Settings
  'app/(dashboard)/settings/page.tsx',
];

console.log('🔍 Verifying Tamanaa Rice Processing Pages...\n');

let allPagesExist = true;
let missingPages = [];
let pagesWithSupabase = [];

pages.forEach((pagePath) => {
  const fullPath = path.join(process.cwd(), pagePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing: ${pagePath}`);
    allPagesExist = false;
    missingPages.push(pagePath);
  } else {
    // Check if page has Supabase imports
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('from "@/lib/supabase')) {
      console.log(`⚠️  Has Supabase: ${pagePath}`);
      pagesWithSupabase.push(pagePath);
    } else {
      console.log(`✅ OK: ${pagePath}`);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total Pages: ${pages.length}`);
console.log(`Existing: ${pages.length - missingPages.length}`);
console.log(`Missing: ${missingPages.length}`);
console.log(`With Supabase: ${pagesWithSupabase.length}`);

if (allPagesExist && pagesWithSupabase.length === 0) {
  console.log('\n✅ ALL PAGES VERIFIED - SYSTEM READY!');
  process.exit(0);
} else {
  if (missingPages.length > 0) {
    console.log('\n❌ Missing pages found:');
    missingPages.forEach(p => console.log(`   - ${p}`));
  }
  if (pagesWithSupabase.length > 0) {
    console.log('\n⚠️  Pages still using Supabase:');
    pagesWithSupabase.forEach(p => console.log(`   - ${p}`));
  }
  process.exit(1);
}
