import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Package } from "lucide-react"

const salesMetrics = [
  {
    title: "Monthly Sales",
    value: "GH₵24.5M",
    change: "+18%",
    icon: TrendingUp,
    color: "bg-success",
  },
  {
    title: "Total Customers",
    value: "156",
    change: "+12",
    icon: Users,
    color: "bg-primary",
  },
  {
    title: "Orders This Month",
    value: "89",
    change: "+24%",
    icon: Package,
    color: "bg-chart-2",
  },
  {
    title: "Average Order Value",
    value: "GH₵275K",
    change: "+8%",
    icon: BarChart3,
    color: "bg-chart-3",
  },
]

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Analytics</h1>
          <p className="text-muted-foreground">
            Track sales performance and trends
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-success mt-1">{metric.change} from last month</p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}/10`}>
                  <metric.icon className={`w-5 h-5 ${metric.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>
            Detailed sales analytics and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sales analytics dashboard with charts and graphs coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}