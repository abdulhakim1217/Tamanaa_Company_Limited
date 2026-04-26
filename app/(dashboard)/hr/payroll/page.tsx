import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, DollarSign, Users, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock payroll data
const payrollRecords = [
  {
    id: "1",
    employee_name: "John Doe",
    period_start: "2024-04-01",
    period_end: "2024-04-30",
    base_salary: 5000,
    bonuses: 500,
    deductions: 750,
    net_salary: 4750,
    status: "paid",
    paid_at: "2024-05-01T10:00:00Z",
  },
  {
    id: "2",
    employee_name: "Sarah Johnson",
    period_start: "2024-04-01",
    period_end: "2024-04-30",
    base_salary: 6000,
    bonuses: 1000,
    deductions: 900,
    net_salary: 6100,
    status: "processed",
    paid_at: null,
  },
  {
    id: "3",
    employee_name: "Mike Chen",
    period_start: "2024-04-01",
    period_end: "2024-04-30",
    base_salary: 4500,
    bonuses: 0,
    deductions: 675,
    net_salary: 3825,
    status: "pending",
    paid_at: null,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return <Badge className="bg-success/10 text-success border-success/20">Paid</Badge>
    case "processed":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Processed</Badge>
    case "pending":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Pending</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default function PayrollPage() {
  const stats = [
    { 
      title: "Total Payroll", 
      value: formatCurrency(payrollRecords.reduce((sum, r) => sum + r.net_salary, 0)), 
      icon: DollarSign, 
      color: "bg-primary" 
    },
    { 
      title: "Employees Paid", 
      value: payrollRecords.filter(r => r.status === 'paid').length, 
      icon: Users, 
      color: "bg-success" 
    },
    { 
      title: "Pending Payments", 
      value: payrollRecords.filter(r => r.status === 'pending').length, 
      icon: Calendar, 
      color: "bg-warning" 
    },
    { 
      title: "Average Salary", 
      value: formatCurrency(payrollRecords.reduce((sum, r) => sum + r.net_salary, 0) / payrollRecords.length), 
      icon: TrendingUp, 
      color: "bg-chart-2" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            Manage employee salaries and payroll processing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
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
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payroll Records */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Payroll Records</CardTitle>
              <CardDescription>April 2024 payroll period</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Bonuses</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {record.employee_name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.employee_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(record.period_start).toLocaleDateString()} -</div>
                      <div className="text-muted-foreground">{new Date(record.period_end).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(record.base_salary)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-success">
                      +{formatCurrency(record.bonuses)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-destructive">
                      -{formatCurrency(record.deductions)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(record.net_salary)}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View Payslip
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Download PDF
                        </DropdownMenuItem>
                        {record.status === 'pending' && (
                          <DropdownMenuItem>
                            Process Payment
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          Edit Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}