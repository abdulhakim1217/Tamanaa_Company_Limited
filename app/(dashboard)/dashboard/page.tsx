import { createClient } from "@/lib/supabase/server"
import { getDashboardStats, getTasks } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Factory,
  Wheat,
  Package,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Plus,
  Zap,
  Scale,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"

const recentTasks = [
  {
    id: 1,
    title: "Quality check for Basmati batch #B2024-045",
    assignee: "Quality Control Team",
    dueDate: "Today",
    priority: "high",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Schedule maintenance for Line C",
    assignee: "Maintenance Team",
    dueDate: "Today",
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    title: "Process raw rice delivery - 50 tons",
    assignee: "Production Manager",
    dueDate: "Tomorrow",
    priority: "high",
    status: "pending",
  },
  {
    id: 4,
    title: "Update inventory for finished goods",
    assignee: "Warehouse Team",
    dueDate: "Apr 26",
    priority: "medium",
    status: "pending",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "Ahmad Hassan",
    action: "completed production run",
    target: "2,500 kg Premium Basmati",
    time: "2 min ago",
    module: "Production",
  },
  {
    id: 2,
    user: "Fatima Ali",
    action: "updated stock levels for",
    target: "Standard Rice - 25kg bags",
    time: "15 min ago",
    module: "Inventory",
  },
  {
    id: 3,
    user: "Muhammad Khan",
    action: "approved quality certificate for",
    target: "Batch #B2024-044",
    time: "1 hour ago",
    module: "Quality",
  },
  {
    id: 4,
    user: "Aisha Malik",
    action: "processed customer order",
    target: "Order #ORD-2024-0156",
    time: "2 hours ago",
    module: "Sales",
  },
  {
    id: 5,
    user: "Hassan Ali",
    action: "scheduled delivery for",
    target: "Karachi Distribution Center",
    time: "3 hours ago",
    module: "Logistics",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Production Meeting",
    time: "10:00 AM",
    date: "Today",
    type: "meeting",
  },
  {
    id: 2,
    title: "Quality Audit",
    time: "2:00 PM",
    date: "Today",
    type: "audit",
  },
  {
    id: 3,
    title: "Raw Material Delivery",
    time: "9:00 AM",
    date: "Apr 28",
    type: "delivery",
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "medium":
      return "bg-warning/10 text-warning-foreground border-warning/20"
    case "low":
      return "bg-muted text-muted-foreground border-muted"
    default:
      return "bg-muted text-muted-foreground border-muted"
  }
}

function getModuleColor(module: string) {
  switch (module) {
    case "Production":
      return "bg-amber-500/10 text-amber-600"
    case "Quality":
      return "bg-green-500/10 text-green-600"
    case "Inventory":
      return "bg-blue-500/10 text-blue-600"
    case "Sales":
      return "bg-purple-500/10 text-purple-600"
    case "Logistics":
      return "bg-orange-500/10 text-orange-600"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const firstName = user?.user_metadata?.first_name || "User"

  // Fetch real dashboard data
  let dashboardStats, userTasks
  try {
    [dashboardStats, userTasks] = await Promise.all([
      getDashboardStats(),
      getTasks(user.id)
    ])
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Fallback to rice processing specific mock data
    dashboardStats = {
      employees: { total: 85, active: 82 },
      revenue: { total: 2450000 }, // Monthly revenue in PKR
      products: { total: 12, low_stock: 2 }, // Rice product varieties
      leads: { total: 28 } // New customer inquiries
    }
    userTasks = recentTasks
  }

  const stats = [
    {
      title: "Production Lines",
      value: "4 Active",
      change: "+1 new",
      trend: "up" as const,
      icon: Factory,
      href: "/production/lines",
    },
    {
      title: "Daily Output",
      value: "18.5 Tons",
      change: "+12%",
      trend: "up" as const,
      icon: Scale,
      href: "/production/reports",
    },
    {
      title: "Rice Varieties",
      value: dashboardStats.products.total.toString(),
      change: dashboardStats.products.low_stock > 0 ? `${dashboardStats.products.low_stock} low stock` : "All stocked",
      trend: dashboardStats.products.low_stock > 0 ? "down" as const : "up" as const,
      icon: Wheat,
      href: "/inventory/products",
    },
    {
      title: "Monthly Sales",
      value: `₹${(dashboardStats.revenue.total / 100000).toFixed(1)}L`,
      change: "+18%",
      trend: "up" as const,
      icon: TrendingUp,
      href: "/sales/analytics",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-muted-foreground">
            {"Here's what's happening at Tamanaa Rice Processing today."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/production/quality/new">
              <Plus className="w-4 h-4 mr-2" />
              Quality Check
            </Link>
          </Button>
          <Button asChild>
            <Link href="/production/lines">
              <Zap className="w-4 h-4 mr-2" />
              Production Status
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span
                  className={`flex items-center text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {stat.change}
                </span>
              </div>
              <Link
                href={stat.href}
                className="text-xs text-muted-foreground hover:text-primary mt-1 inline-flex items-center"
              >
                View details
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Production Tasks</CardTitle>
              <CardDescription>Your pending tasks and assignments</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tasks">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(userTasks.slice(0, 4) || recentTasks).map((task: any) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {task.status === "in_progress" ? (
                      <Clock className="w-5 h-5 text-amber-600" />
                    ) : task.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Assigned to {task.assigned_to_name || task.assignee}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : task.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming
            </CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                >
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <span className="text-xs font-medium">{event.date}</span>
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across all operations</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/activity">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    {activity.user.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className={getModuleColor(activity.module)}>
                      {activity.module}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}