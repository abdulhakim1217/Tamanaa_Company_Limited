#!/usr/bin/env node

/**
 * Mobile Responsiveness Test Script for Tamanaa Rice Processing System
 * Tests mobile functionality across all pages and components
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Testing Mobile Responsiveness for Tamanaa Rice Processing System')
console.log('=' .repeat(70))

// Test results
let totalTests = 0
let passedTests = 0
let failedTests = 0
const issues = []

function test(description, condition) {
  totalTests++
  if (condition) {
    console.log(`✅ ${description}`)
    passedTests++
  } else {
    console.log(`❌ ${description}`)
    failedTests++
    issues.push(description)
  }
}

// Test 1: Check if mobile layout component exists
console.log('\n📱 Testing Mobile Layout Components')
console.log('-'.repeat(40))

const mobileLayoutPath = path.join(process.cwd(), 'components/mobile-layout.tsx')
test('Mobile layout component exists', fs.existsSync(mobileLayoutPath))

const mobileNavPath = path.join(process.cwd(), 'components/ui/mobile-nav.tsx')
test('Mobile navigation component exists', fs.existsSync(mobileNavPath))

const mobileTablePath = path.join(process.cwd(), 'components/ui/mobile-table.tsx')
test('Mobile table component exists', fs.existsSync(mobileTablePath))

const useMobilePath = path.join(process.cwd(), 'hooks/use-mobile.ts')
test('Mobile detection hook exists', fs.existsSync(useMobilePath))

// Test 2: Check mobile CSS
console.log('\n🎨 Testing Mobile CSS')
console.log('-'.repeat(40))

const mobileCssPath = path.join(process.cwd(), 'app/mobile.css')
test('Mobile CSS file exists', fs.existsSync(mobileCssPath))

if (fs.existsSync(mobileCssPath)) {
  const mobileCss = fs.readFileSync(mobileCssPath, 'utf8')
  test('Mobile CSS contains responsive breakpoints', mobileCss.includes('@media (max-width: 768px)'))
  test('Mobile CSS contains touch-friendly styles', mobileCss.includes('min-height: 44px'))
  test('Mobile CSS contains mobile-specific classes', mobileCss.includes('.mobile-'))
}

// Test 3: Check main layout integration
console.log('\n🏗️ Testing Layout Integration')
console.log('-'.repeat(40))

const layoutPath = path.join(process.cwd(), 'app/(dashboard)/layout.tsx')
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8')
  test('Layout uses client component', layoutContent.includes("'use client'"))
  test('Layout imports mobile components', layoutContent.includes('MobileLayout'))
  test('Layout imports mobile hook', layoutContent.includes('useIsMobile'))
  test('Layout has conditional mobile rendering', layoutContent.includes('if (isMobile)'))
} else {
  test('Dashboard layout exists', false)
}

// Test 4: Check key pages for mobile optimization
console.log('\n📄 Testing Page Mobile Optimization')
console.log('-'.repeat(40))

const pagesToTest = [
  'app/(dashboard)/dashboard/page.tsx',
  'app/(dashboard)/inventory/products/page.tsx',
  'app/(dashboard)/production/lines/page.tsx',
]

pagesToTest.forEach(pagePath => {
  const fullPath = path.join(process.cwd(), pagePath)
  const pageName = path.basename(pagePath, '.tsx')
  
  if (fs.existsSync(fullPath)) {
    const pageContent = fs.readFileSync(fullPath, 'utf8')
    test(`${pageName} uses client component`, pageContent.includes("'use client'"))
    test(`${pageName} imports mobile hook`, pageContent.includes('useIsMobile'))
    test(`${pageName} has mobile-specific rendering`, pageContent.includes('isMobile'))
  } else {
    test(`${pageName} exists`, false)
  }
})

// Test 5: Check global CSS integration
console.log('\n🌐 Testing Global CSS Integration')
console.log('-'.repeat(40))

const globalCssPath = path.join(process.cwd(), 'app/globals.css')
if (fs.existsSync(globalCssPath)) {
  const globalCss = fs.readFileSync(globalCssPath, 'utf8')
  test('Global CSS imports mobile styles', globalCss.includes("@import './mobile.css'"))
} else {
  test('Global CSS exists', false)
}

// Test 6: Check package.json for required dependencies
console.log('\n📦 Testing Dependencies')
console.log('-'.repeat(40))

const packageJsonPath = path.join(process.cwd(), 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  
  test('React is installed', !!deps.react)
  test('Next.js is installed', !!deps.next)
  test('Tailwind CSS is installed', !!deps.tailwindcss)
  test('Lucide React icons are installed', !!deps['lucide-react'])
} else {
  test('Package.json exists', false)
}

// Test 7: Check for mobile-specific configurations
console.log('\n⚙️ Testing Mobile Configurations')
console.log('-'.repeat(40))

const nextConfigPath = path.join(process.cwd(), 'next.config.mjs')
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
  test('Next.js config allows dev origins', nextConfig.includes('allowedDevOrigins'))
} else {
  test('Next.js config exists', false)
}

// Test 8: Verify mobile breakpoints
console.log('\n📐 Testing Mobile Breakpoints')
console.log('-'.repeat(40))

if (fs.existsSync(useMobilePath)) {
  const useMobileContent = fs.readFileSync(useMobilePath, 'utf8')
  test('Mobile hook defines 768px breakpoint', useMobileContent.includes('768'))
  test('Mobile hook uses matchMedia', useMobileContent.includes('matchMedia'))
  test('Mobile hook handles resize events', useMobileContent.includes('addEventListener'))
}

// Test 9: Check for touch-friendly components
console.log('\n👆 Testing Touch-Friendly Components')
console.log('-'.repeat(40))

if (fs.existsSync(mobileNavPath)) {
  const mobileNavContent = fs.readFileSync(mobileNavPath, 'utf8')
  test('Mobile nav has touch-friendly buttons', mobileNavContent.includes('min-h-[44px]'))
  test('Mobile nav has full-width mobile buttons', mobileNavContent.includes('w-full'))
}

// Test 10: Verify mobile table implementation
console.log('\n📊 Testing Mobile Table Implementation')
console.log('-'.repeat(40))

if (fs.existsSync(mobileTablePath)) {
  const mobileTableContent = fs.readFileSync(mobileTablePath, 'utf8')
  test('Mobile table has card-based mobile view', mobileTableContent.includes('Card'))
  test('Mobile table handles mobile detection', mobileTableContent.includes('useIsMobile'))
  test('Mobile table has responsive rendering', mobileTableContent.includes('if (isMobile)'))
}

// Summary
console.log('\n' + '='.repeat(70))
console.log('📊 MOBILE RESPONSIVENESS TEST SUMMARY')
console.log('='.repeat(70))
console.log(`Total Tests: ${totalTests}`)
console.log(`✅ Passed: ${passedTests}`)
console.log(`❌ Failed: ${failedTests}`)
console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)

if (failedTests > 0) {
  console.log('\n🚨 ISSUES FOUND:')
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`)
  })
  
  console.log('\n💡 RECOMMENDATIONS:')
  console.log('1. Ensure all components use mobile-responsive design patterns')
  console.log('2. Test on actual mobile devices or browser dev tools')
  console.log('3. Verify touch targets are at least 44px in size')
  console.log('4. Check that all tables have mobile card alternatives')
  console.log('5. Ensure navigation works properly on mobile devices')
} else {
  console.log('\n🎉 All mobile responsiveness tests passed!')
  console.log('✨ Your Tamanaa Rice Processing System is mobile-ready!')
}

console.log('\n📱 MOBILE TESTING CHECKLIST:')
console.log('□ Test on iPhone (Safari)')
console.log('□ Test on Android (Chrome)')
console.log('□ Test on tablet devices')
console.log('□ Verify touch interactions work')
console.log('□ Check that all content is accessible')
console.log('□ Ensure forms are mobile-friendly')
console.log('□ Verify navigation menu works on mobile')
console.log('□ Test landscape and portrait orientations')

console.log('\n🔧 NEXT STEPS:')
console.log('1. Run: npm run dev')
console.log('2. Open browser dev tools (F12)')
console.log('3. Toggle device toolbar (Ctrl+Shift+M)')
console.log('4. Test different mobile device sizes')
console.log('5. Verify all functionality works on mobile')

process.exit(failedTests > 0 ? 1 : 0)