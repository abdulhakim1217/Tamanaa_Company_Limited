import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, FileText } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 31000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
]

const reportTypes = [
  {
    id: "income-statement",
    title: "Income Statement",
    description: "Revenue, expenses, and net income",
    icon: TrendingUp,
    lastGenerated: "Apr 24, 2024",
  },
  {
    id: "balance-sheet",
    title: "Balance Sheet",
    description: "Assets, liabilities, and equity",
    icon: PieChart,
    lastGenerated: "Apr 24, 2024",
  },
  {
    id: "cash-flow",
    title: "Cash Flow Statement",
    description: "Operating, investing, and financing activities",
    icon: DollarSign,
    lastGenerated: "Apr 23, 2024",
  },
  {
    id: "budget-variance",
    title: "Budget Variance Report",
    description: "Actual vs. budgeted performance",
    icon: BarChart3,
    lastGenerated: "Apr 22, 2024",
  },
  {
    id: "ar-aging",
    title: "Accounts Receivable Aging",
    description: "Outstanding customer invoices",
    icon: FileText,
    lastGenerated: "Apr 24, 2024",
  },
  {
    id: "ap-aging",
    title: "Accounts Payable Aging",
    description: "Outstanding vendor invoices",
    icon: FileText,
    lastGenerated: "Apr 24, 2024",
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function ReportsPage() {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0)
  const netIncome = totalRevenue - totalExpenses
  const profitMargin = ((netIncome / totalRevenue) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">
            Generate and view financial reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="q1-2024">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="q3-2023">Q3 2023</SelectItem>
              <SelectItem value="fy-2023">FY 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% vs last quarter
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                <p className="text-xs text-destructive flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2% vs last quarter
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Income</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(netIncome)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  After all expenses
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">{profitMargin}%</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1% vs last quarter
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-1/10">
                <PieChart className="w-5 h-5 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Revenue and expenses breakdown by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {revenueData.map((data) => (
              <div key={data.month} className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {data.month} 2024
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue</span>
                    <span className="font-semibold text-success">
                      {formatCurrency(data.revenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expenses</span>
                    <span className="font-semibold text-destructive">
                      {formatCurrency(data.expenses)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Net</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(data.revenue - data.expenses)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                  <report.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {report.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
