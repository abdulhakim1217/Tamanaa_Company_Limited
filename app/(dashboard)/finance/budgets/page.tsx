import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Building2, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"

const budgets = [
  {
    id: "1",
    name: "Engineering Department",
    department: "Engineering",
    fiscal_year: 2024,
    allocated_amount: 850000,
    spent_amount: 520000,
    status: "active",
  },
  {
    id: "2",
    name: "Marketing Campaigns",
    department: "Marketing",
    fiscal_year: 2024,
    allocated_amount: 520000,
    spent_amount: 480000,
    status: "active",
  },
  {
    id: "3",
    name: "HR Operations",
    department: "Human Resources",
    fiscal_year: 2024,
    allocated_amount: 320000,
    spent_amount: 185000,
    status: "active",
  },
  {
    id: "4",
    name: "Sales Team",
    department: "Sales",
    fiscal_year: 2024,
    allocated_amount: 680000,
    spent_amount: 695000,
    status: "exceeded",
  },
  {
    id: "5",
    name: "Finance Department",
    department: "Finance",
    fiscal_year: 2024,
    allocated_amount: 450000,
    spent_amount: 280000,
    status: "active",
  },
  {
    id: "6",
    name: "Operations",
    department: "Operations",
    fiscal_year: 2024,
    allocated_amount: 280000,
    spent_amount: 145000,
    status: "active",
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount)
}

function getProgressColor(percentage: number) {
  if (percentage >= 100) return "bg-destructive"
  if (percentage >= 80) return "bg-warning"
  return "bg-primary"
}

function getStatusBadge(status: string, percentage: number) {
  if (status === "exceeded") {
    return <Badge variant="destructive">Exceeded</Badge>
  }
  if (percentage >= 80) {
    return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Warning</Badge>
  }
  return <Badge className="bg-success/10 text-success border-success/20">On Track</Badge>
}

export default function BudgetsPage() {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated_amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent_amount, 0)
  const totalRemaining = totalAllocated - totalSpent

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Track and manage departmental budgets
          </p>
        </div>
        <Button asChild>
          <Link href="/finance/budgets/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Budget
          </Link>
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Allocated</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAllocated)}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-1/10">
                <TrendingUp className="w-5 h-5 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining >= 0 ? "text-success" : "text-destructive"}`}>
                  {formatCurrency(totalRemaining)}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <AlertTriangle className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent_amount / budget.allocated_amount) * 100
          const remaining = budget.allocated_amount - budget.spent_amount

          return (
            <Card key={budget.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">{budget.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {budget.department}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/finance/budgets/${budget.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/finance/budgets/${budget.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">FY {budget.fiscal_year}</span>
                  {getStatusBadge(budget.status, percentage)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Budget Used</span>
                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Allocated</p>
                    <p className="font-semibold">{formatCurrency(budget.allocated_amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Spent</p>
                    <p className="font-semibold">{formatCurrency(budget.spent_amount)}</p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className={`font-semibold ${remaining >= 0 ? "text-success" : "text-destructive"}`}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
