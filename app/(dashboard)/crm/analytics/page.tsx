import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Award } from "lucide-react"

const performanceData = [
  { name: "Emily Davis", deals_won: 12, revenue: 245000, quota: 300000, achievement: 82 },
  { name: "Alex Turner", deals_won: 8, revenue: 185000, quota: 250000, achievement: 74 },
  { name: "Sarah Johnson", deals_won: 15, revenue: 320000, quota: 350000, achievement: 91 },
  { name: "Mike Chen", deals_won: 6, revenue: 125000, quota: 200000, achievement: 63 },
]

const leadSources = [
  { source: "Website", leads: 145, conversion: 28, value: 420000 },
  { source: "Referral", leads: 89, conversion: 42, value: 680000 },
  { source: "Trade Show", leads: 56, conversion: 35, value: 390000 },
  { source: "Cold Call", leads: 124, conversion: 18, value: 285000 },
  { source: "LinkedIn", leads: 78, conversion: 25, value: 195000 },
]

const monthlyMetrics = [
  { month: "Jan", revenue: 185000, deals: 12, new_customers: 8 },
  { month: "Feb", revenue: 210000, deals: 15, new_customers: 10 },
  { month: "Mar", revenue: 245000, deals: 18, new_customers: 12 },
  { month: "Apr", revenue: 195000, deals: 14, new_customers: 9 },
]

const stats = [
  { title: "Total Revenue (YTD)", value: "$835K", change: "+18%", trend: "up", icon: DollarSign },
  { title: "Deals Closed", value: "59", change: "+12%", trend: "up", icon: Target },
  { title: "New Customers", value: "39", change: "+15%", trend: "up", icon: Users },
  { title: "Avg Deal Size", value: "$14.2K", change: "-3%", trend: "down", icon: Award },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function CRMAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM Analytics</h1>
          <p className="text-muted-foreground">
            Sales performance and insights
          </p>
        </div>
        <Select defaultValue="q1-2024">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="q1-2024">Q1 2024</SelectItem>
            <SelectItem value="q4-2023">Q4 2023</SelectItem>
            <SelectItem value="fy-2023">FY 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs flex items-center mt-1 ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change} vs last period
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Team Performance</CardTitle>
            <CardDescription>Individual quota achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((person) => (
                <div key={person.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {person.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {person.deals_won} deals | {formatCurrency(person.revenue)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        person.achievement >= 80
                          ? "bg-success/10 text-success border-success/20"
                          : person.achievement >= 60
                          ? "bg-warning/10 text-warning-foreground border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {person.achievement}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={person.achievement} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-24 text-right">
                      {formatCurrency(person.quota)} quota
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Analysis</CardTitle>
            <CardDescription>Performance by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-muted-foreground">
                        {source.leads} leads | {source.conversion}% conversion
                      </p>
                    </div>
                    <span className="font-semibold text-success">
                      {formatCurrency(source.value)}
                    </span>
                  </div>
                  <Progress
                    value={(source.value / 680000) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Key metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {monthlyMetrics.map((month) => (
              <div key={month.month} className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {month.month} 2024
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue</span>
                    <span className="font-semibold text-success">
                      {formatCurrency(month.revenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deals Closed</span>
                    <span className="font-semibold">{month.deals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Customers</span>
                    <span className="font-semibold">{month.new_customers}</span>
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
