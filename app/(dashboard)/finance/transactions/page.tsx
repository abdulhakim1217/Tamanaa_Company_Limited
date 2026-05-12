import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowUpRight, ArrowDownRight, FileText } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "credit",
    description: "Payment from Metro Cash & Carry",
    amount: 2500000,
    account: "Bank Account",
    reference: "INV-2024-156",
    date: "2024-04-24T10:30:00Z",
    status: "completed",
  },
  {
    id: 2,
    type: "debit",
    description: "Raw material purchase - Punjab Rice Farms",
    amount: 850000,
    account: "Bank Account",
    reference: "PO-2024-045",
    date: "2024-04-23T14:15:00Z",
    status: "completed",
  },
  {
    id: 3,
    type: "debit",
    description: "Employee salaries - April 2024",
    amount: 1200000,
    account: "Payroll Account",
    reference: "PAY-2024-04",
    date: "2024-04-22T09:00:00Z",
    status: "completed",
  },
  {
    id: 4,
    type: "credit",
    description: "Payment from Carrefour Pakistan",
    amount: 1800000,
    account: "Bank Account",
    reference: "INV-2024-157",
    date: "2024-04-21T16:45:00Z",
    status: "completed",
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function TransactionsPage() {
  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0)
  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage financial transactions
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credit</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totalCredit)}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <ArrowDownRight className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Debit</p>
                <p className="text-2xl font-bold text-destructive">{formatCurrency(totalDebit)}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(totalCredit - totalDebit)}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    transaction.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.account} • {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}