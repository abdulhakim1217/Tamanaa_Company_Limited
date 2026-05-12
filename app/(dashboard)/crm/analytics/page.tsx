import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Calendar,
  Award,
  Activity
} from "lucide-react"

export default function CRMAnalyticsPage() {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "GH₵ 64.5M", 
      change: "+12.5%",
      trend: "up",
      icon: DollarSign, 
      color: "bg-success" 
    },
    { 
      title: "Active Customers", 
      value: "248", 
      change: "+8.2%",
      trend: "up",
      icon: Users, 
      color: "bg-primary" 
    },
    { 
      title: "Conversion Rate", 
      value: "68%", 
      change: "+5.1%",
      trend: "up",
      icon: Target, 
      color: "bg-chart-2" 
    },
    { 
      title: "Avg Deal Size", 
      value: "GH₵ 15.2M", 
      change: "-2.3%",
      trend: "down",
      icon: Award, 
      color: "bg-warning" 
    },
  ]

  const salesByRiceType = [
    { type: "Premium Basmati", value: 28500000, percentage: 44 },
    { type: "IRRI-6", value: 18000000, percentage: 28 },
    { type: "Parboiled Rice", value: 12000000, percentage: 19 },
    { type: "Broken Rice", value: 6000000, percentage: 9 },
  ]

  const topCustomers = [
    { name: "Al-Noor Trading Co.", revenue: 12500000, deals: 8, growth: "+15%" },
    { name: "Metro Wholesale", revenue: 9800000, deals: 6, growth: "+22%" },
    { name: "Gulf Foods LLC", revenue: 8200000, deals: 4, growth: "+8%" },
    { name: "City Supermarkets", revenue: 7100000, deals: 12, growth: "+18%" },
    { name: "Royal Distributors", revenue: 6400000, deals: 5, growth: "+12%" },
  ]

  const salesTeamPerformance = [
    { name: "Ahmed Khan", deals: 12, revenue: 18500000, conversion: 72 },
    { name: "Fatima Ali", deals: 10, revenue: 15200000, conversion: 68 },
    { name: "Hassan Raza", deals: 9, revenue: 14800000, conversion: 65 },
    { name: "Ayesha Malik", deals: 8, revenue: 12100000, conversion: 70 },
    { name: "Ali Hassan", deals: 7, revenue: 9800000, conversion: 58 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CRM Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your customer relationships and sales performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs flex items-center gap-1 ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sales by Rice Type */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Rice Type</CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {salesByRiceType.map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-muted-foreground">
                        GH₵ {(item.value / 1000000).toFixed(1)}M ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Trend</CardTitle>
                <CardDescription>Last 6 months performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => {
                    const value = 50 + Math.random() * 50
                    return (
                      <div key={month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{month} 2024</span>
                          <span className="text-muted-foreground">
                            GH₵ {(8 + index * 1.5).toFixed(1)}M
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Status */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline Status</CardTitle>
              <CardDescription>Current opportunities by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { stage: "Qualification", count: 12, value: 18500000, color: "bg-blue-500" },
                  { stage: "Proposal", count: 8, value: 24200000, color: "bg-purple-500" },
                  { stage: "Negotiation", count: 5, value: 32100000, color: "bg-amber-500" },
                  { stage: "Closed Won", count: 15, value: 45800000, color: "bg-success" },
                ].map((stage) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className={`w-full h-1 ${stage.color} rounded-full`} />
                    <div>
                      <p className="text-sm font-medium">{stage.stage}</p>
                      <p className="text-2xl font-bold">{stage.count}</p>
                      <p className="text-xs text-muted-foreground">
                        GH₵ {(stage.value / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Highest revenue generating customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">GH₵ {(customer.revenue / 1000000).toFixed(1)}M</p>
                      <p className="text-sm text-success">{customer.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Team Performance</CardTitle>
              <CardDescription>Individual performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesTeamPerformance.map((member, index) => (
                  <div key={member.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-bold">GH₵ {(member.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Conversion</p>
                        <p className="font-bold">{member.conversion}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
