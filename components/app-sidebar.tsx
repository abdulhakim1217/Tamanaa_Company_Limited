"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  LayoutDashboard,
  Users,
  Wallet,
  Package,
  UserCircle,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  PieChart,
  Boxes,
  Tags,
  Truck,
  UserPlus,
  Target,
  BarChart3,
  Factory,
  Wheat,
  Scale,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/auth/mock-auth"
import { useRouter } from "next/navigation"
import type { MockUser } from "@/lib/auth/mock-auth"

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

interface AppSidebarProps {
  user: MockUser | null
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    // In standalone mode, just redirect to login
    router.push("/auth/login")
    router.refresh()
  }

  const userInitials = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : user?.email?.substring(0, 2).toUpperCase() || "U"

  const userName = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    : user?.email || "User"

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Wheat className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Tamanaa Company</span>
                  <span className="text-xs text-sidebar-foreground/60">Rice Processing</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <Collapsible
                  key={module.title}
                  defaultOpen={module.items.some(item => pathname.startsWith(item.url))}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <module.icon className="w-4 h-4" />
                        <span>{module.title}</span>
                        <ChevronDown className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {module.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                              <Link href={item.url}>
                                <item.icon className="w-3 h-3" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none text-left">
                    <span className="font-medium truncate max-w-[120px]">{userName}</span>
                    <span className="text-xs text-sidebar-foreground/60 truncate max-w-[120px]">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings/profile">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}