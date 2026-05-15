'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Menu, 
  X, 
  Building2,
  LayoutDashboard,
  Users,
  Wallet,
  Package,
  UserCircle,
  MessageSquare,
  Settings,
  Factory,
  Wheat,
  Scale,
  ShieldCheck,
  BarChart3,
  Zap,
  Boxes,
  Tags,
  Truck,
  UserPlus,
  Target,
  FileText,
  PieChart,
  Calendar,
  Clock,
  CreditCard,
  TrendingUp
} from 'lucide-react'

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
]

const modules = [
  {
    title: "Production",
    icon: Factory,
    items: [
      { title: "Production Lines", url: "/production/lines", icon: Zap },
      { title: "Raw Materials", url: "/production/materials", icon: Wheat },
      { title: "Processing Stages", url: "/production/stages", icon: Scale },
      { title: "Quality Control", url: "/production/quality", icon: ShieldCheck },
      { title: "Production Reports", url: "/production/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      { title: "Rice Products", url: "/inventory/products", icon: Boxes },
      { title: "Categories", url: "/inventory/categories", icon: Tags },
      { title: "Raw Rice Stock", url: "/inventory/raw-rice", icon: Wheat },
      { title: "Raw Materials", url: "/inventory/raw-materials", icon: Wheat },
      { title: "Finished Goods", url: "/inventory/finished-goods", icon: Package },
      { title: "Packaging Materials", url: "/inventory/packaging", icon: Tags },
      { title: "Stock Levels", url: "/inventory/stock", icon: BarChart3 },
      { title: "Suppliers", url: "/inventory/suppliers", icon: Truck },
      { title: "Stock Movements", url: "/inventory/movements", icon: TrendingUp },
    ],
  },
  {
    title: "Sales & Distribution",
    icon: UserCircle,
    items: [
      { title: "Customers", url: "/sales/customers", icon: Users },
      { title: "Orders", url: "/sales/orders", icon: FileText },
      { title: "Distributors", url: "/sales/distributors", icon: Truck },
      { title: "Sales Analytics", url: "/sales/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "CRM",
    icon: Target,
    items: [
      { title: "Customers", url: "/crm/customers", icon: Users },
      { title: "Leads", url: "/crm/leads", icon: UserPlus },
      { title: "Opportunities", url: "/crm/opportunities", icon: Target },
      { title: "CRM Analytics", url: "/crm/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Finance",
    icon: Wallet,
    items: [
      { title: "Accounts", url: "/finance/accounts", icon: Wallet },
      { title: "Transactions", url: "/finance/transactions", icon: FileText },
      { title: "Invoices", url: "/finance/invoices", icon: FileText },
      { title: "Budgets", url: "/finance/budgets", icon: PieChart },
      { title: "Cost Analysis", url: "/finance/costs", icon: PieChart },
      { title: "Financial Reports", url: "/finance/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Human Resources",
    icon: Users,
    items: [
      { title: "Employees", url: "/hr/employees", icon: Users },
      { title: "Departments", url: "/hr/departments", icon: Building2 },
      { title: "Attendance", url: "/hr/attendance", icon: Clock },
      { title: "Leave Management", url: "/hr/leave", icon: Calendar },
      { title: "Payroll", url: "/hr/payroll", icon: CreditCard },
    ],
  },
]

const secondaryNav = [
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Settings", url: "/settings", icon: Settings },
]

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="flex h-full flex-col">
                {/* Mobile Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/dashboard" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                      <Wheat className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">Tamanaa Company</span>
                      <span className="text-xs text-muted-foreground">Rice Processing</span>
                    </div>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 py-4">
                    {/* Main Navigation */}
                    <div className="space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setOpen(false)}
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            pathname === item.url ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Modules */}
                    {modules.map((module) => (
                      <div key={module.title} className="space-y-2">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <module.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">{module.title}</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {module.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.url}
                              onClick={() => setOpen(false)}
                              className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                pathname === item.url ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              <item.icon className="h-3 w-3" />
                              <span>{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Secondary Navigation */}
                    <div className="border-t pt-4 space-y-2">
                      {secondaryNav.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setOpen(false)}
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            pathname === item.url ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Header Title */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-amber-500 to-orange-600 text-white">
              <Wheat className="w-3 h-3" />
            </div>
            <span className="font-semibold text-sm">Tamanaa Rice Processing</span>
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  )
}