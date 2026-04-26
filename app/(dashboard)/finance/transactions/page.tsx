"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Download, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    id: "1",
    reference: "TXN-2024-0089",
    description: "Client payment - Acme Corp",
    account: "Accounts Receivable",
    type: "credit",
    amount: 15000,
    date: "2024-04-24",
    created_by: "Sarah Johnson",
  },
  {
    id: "2",
    reference: "TXN-2024-0088",
    description: "Monthly rent payment",
    account: "Rent Expense",
    type: "debit",
    amount: 3000,
    date: "2024-04-24",
    created_by: "Mike Chen",
  },
  {
    id: "3",
    reference: "TXN-2024-0087",
    description: "Office supplies purchase",
    account: "Operating Cash",
    type: "debit",
    amount: 450,
    date: "2024-04-23",
    created_by: "Emily Davis",
  },
  {
    id: "4",
    reference: "TXN-2024-0086",
    description: "Software subscription",
    account: "Operating Cash",
    type: "debit",
    amount: 1200,
    date: "2024-04-23",
    created_by: "John Doe",
  },
  {
    id: "5",
    reference: "TXN-2024-0085",
    description: "Client payment - Tech Solutions",
    account: "Accounts Receivable",
    type: "credit",
    amount: 8500,
    date: "2024-04-22",
    created_by: "Sarah Johnson",
  },
  {
    id: "6",
    reference: "TXN-2024-0084",
    description: "Payroll processing",
    account: "Salaries Expense",
    type: "debit",
    amount: 284560,
    date: "2024-04-20",
    created_by: "HR System",
  },
  {
    id: "7",
    reference: "TXN-2024-0083",
    description: "Vendor payment - Supplier Inc",
    account: "Accounts Payable",
    type: "debit",
    amount: 12500,
    date: "2024-04-19",
    created_by: "Mike Chen",
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function TransactionsPage() {
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/finance/transactions/new">
              <Plus className="w-4 h-4 mr-2" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold text-success">
                  +{formatCurrency(totalCredits)}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <ArrowUpRight className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Debits</p>
                <p className="text-2xl font-bold text-destructive">
                  -{formatCurrency(totalDebits)}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <ArrowDownRight className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Flow</p>
                <p className={`text-2xl font-bold ${totalCredits - totalDebits >= 0 ? "text-success" : "text-destructive"}`}>
                  {totalCredits - totalDebits >= 0 ? "+" : ""}{formatCurrency(totalCredits - totalDebits)}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>All financial transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credits</SelectItem>
                  <SelectItem value="debit">Debits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">
                    {transaction.reference}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        by {transaction.created_by}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        transaction.type === "credit"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {transaction.type === "credit" ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.type === "credit" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
