import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Factory,
  Wheat,
  Zap,
  Users,
  Truck,
  Download,
  Filter
} from "lucide-react"

// Mock cost data
const costBreakdown = [
  {
    category: "Raw Materials",
    amount: 1250000,
    percentage: 45,
    change: "+8%",
    trend: "up" as const,
    icon: Wheat,
    color: "bg-amber-500",
  },
  {
    category: "Labor Costs",
    amount: 680000,
    percentage: 24,
    change: "+3%",
    trend: "up" as const,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    category: "Energy & Utilities",
    amount: 420000,
    percentage: 15,
    change: "-2%",
    trend: "down" as const,
    icon: Zap,
    color: "bg-yellow-500",
  },
  {
    category: "Equipment & Maintenance",
    amount: 280000,
    percentage: 10,
    change: "+12%",
    trend: "up" as const,
    icon: Factory,
    color: "bg-green-500",
  },
  {
    category: "Transportation",
    amount: 170000,
    percentage: 6,
    change: "+5%",
    trend: "up" as const,
    icon: Truck,
    color: "bg-purple-500",
  },
]

const monthlyTrends = [
  { month: "Jan", rawMaterials: 1200000, labor: 650000, energy: 400000, equipment: 250000, transport: 160000 },
  { month: "Feb", rawMaterials: 1180000, labor: 660000, energy: 410000, equipment: 270000, transport: 165000 },
  { month: "Mar", rawMaterials: 1250000, labor: 680000, energy: 420000, equipment: 280000, transport: 170000 },
]

const costCenters = [
  {
    id: 1,
    name: "Production Line A",
    totalCost: 850000,
    budget: 900000,
    variance: -50000,
    utilizationRate: 94,
    status: "on_budget",
  },
  {
    id: 2,
    name: "Production Line B",
    totalCost: 780000,
    budget: 750000,
    variance: 30000,
    utilizationRate: 104,
    status: "over_budget",
  },
  {
    id: 3,
    name: "Quality Control",
    totalCost: 120000,
    budget: 150000,
    variance: -30000,
    utilizationRate: 80,
    status: "under_budget",
  },
  {
    id: 4,
    name: "Packaging Department",
    totalCost: 340000,
    budget: 350000,
    variance: -10000,
    utilizationRate: 97,
    status: "on_budget",
  },
  {
    id: 5,
    name: "Warehouse Operations",
    totalCost: 210000,
    budget: 200000,
    variance: 10000,
    utilizationRate: 105,
    status: "over_budget",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "on_budget":
      return <Badge className="bg-success/10 text-success border-success/20">On Budget</Badge>
    case "over_budget":
      return <Badge variant="destructive">Over Budget</Badge>
    case "under_budget":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Under Budget</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function CostAnalysisPage() {
  const totalCosts = costBreakdown.reduce((sum, item) => sum + item.amount, 0)
  const totalBudget = costCenters.reduce((sum, center) => sum + center.budget, 0)
  const totalVariance = costCenters.reduce((sum, center) => sum + center.variance, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">
            Monitor and analyze operational costs across all departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Costs</p>
                <p className="text-2xl font-bold">GH₵ {(totalCosts / 100000).toFixed(1)}L</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <DollarSign className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold">GH₵ {(totalBudget / 100000).toFixed(1)}L</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <PieChart className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Variance</p>
                <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-destructive' : 'text-success'}`}>
                  GH₵ {Math.abs(totalVariance / 100000).toFixed(1)}L
                </p>
              </div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                totalVariance >= 0 ? 'bg-destructive/10' : 'bg-success/10'
              }`}>
                {totalVariance >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-destructive" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-success" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost per Kg</p>
                <p className="text-2xl font-bold">GH₵ 145</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10">
                <Wheat className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown by Category</CardTitle>
          <CardDescription>
            Distribution of operational costs across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {costBreakdown.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${item.color}/10`}>
                      <item.icon className={`w-4 h-4 text-${item.color.replace('bg-', '').replace('-500', '-600')}`} />
                    </div>
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-muted-foreground">
                        GH₵ {(item.amount / 100000).toFixed(1)}L ({item.percentage}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      item.trend === 'up' ? 'text-destructive' : 'text-success'
                    }`}>
                      {item.change}
                    </span>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-destructive" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-success" />
                    )}
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Centers */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Centers Performance</CardTitle>
          <CardDescription>
            Budget vs actual costs for each department and production line
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Center</TableHead>
                <TableHead>Actual Cost</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell>
                    <div className="font-medium">{center.name}</div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      GH₵ {(center.totalCost / 100000).toFixed(1)}L
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      GH₵ {(center.budget / 100000).toFixed(1)}L
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      center.variance >= 0 ? 'text-destructive' : 'text-success'
                    }`}>
                      {center.variance >= 0 ? '+' : ''}GH₵ {(center.variance / 100000).toFixed(1)}L
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{center.utilizationRate}%</span>
                      <Progress 
                        value={Math.min(center.utilizationRate, 100)} 
                        className="w-16 h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(center.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}