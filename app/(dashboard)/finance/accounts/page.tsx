import { getAccounts } from "@/lib/database"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

const accountSummary = [
  { type: "Assets", total: 327500, icon: Wallet, color: "bg-chart-1" },
  { type: "Liabilities", total: 45200, icon: TrendingDown, color: "bg-chart-4" },
  { type: "Revenue", total: 520000, icon: TrendingUp, color: "bg-success" },
  { type: "Expenses", total: 320560, icon: ArrowDownRight, color: "bg-destructive" },
]

function getAccountTypeBadge(type: string) {
  const colors: Record<string, string> = {
    asset: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    liability: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    equity: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    revenue: "bg-success/10 text-success border-success/20",
    expense: "bg-destructive/10 text-destructive border-destructive/20",
  }
  return (
    <Badge variant="outline" className={colors[type] || ""}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default async function AccountsPage() {
  // Fetch real data from database
  let accounts
  try {
    accounts = await getAccounts()
  } catch (error) {
    console.error("Error fetching accounts:", error)
    // Fallback to mock data if database is not set up
    accounts = [
      {
        id: "1",
        name: "Operating Cash",
        code: "1001",
        type: "asset",
        balance: 245000,
        is_active: true,
      },
      {
        id: "2",
        name: "Accounts Receivable",
        code: "1100",
        type: "asset",
        balance: 82500,
        is_active: true,
      },
      {
        id: "3",
        name: "Accounts Payable",
        code: "2001",
        type: "liability",
        balance: 45200,
        is_active: true,
      },
    ]
  }

  // Calculate summary totals
  const accountSummary = [
    { 
      type: "Assets", 
      total: accounts.filter(a => a.type === 'asset').reduce((sum, a) => sum + Number(a.balance), 0),
      icon: Wallet, 
      color: "bg-chart-1" 
    },
    { 
      type: "Liabilities", 
      total: accounts.filter(a => a.type === 'liability').reduce((sum, a) => sum + Number(a.balance), 0),
      icon: TrendingDown, 
      color: "bg-chart-4" 
    },
    { 
      type: "Revenue", 
      total: accounts.filter(a => a.type === 'revenue').reduce((sum, a) => sum + Number(a.balance), 0),
      icon: TrendingUp, 
      color: "bg-success" 
    },
    { 
      type: "Expenses", 
      total: accounts.filter(a => a.type === 'expense').reduce((sum, a) => sum + Number(a.balance), 0),
      icon: ArrowDownRight, 
      color: "bg-destructive" 
    },
  ]
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chart of Accounts</h1>
          <p className="text-muted-foreground">
            Manage your financial accounts
          </p>
        </div>
        <Button asChild>
          <Link href="/finance/accounts/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {accountSummary.map((item) => (
          <Card key={item.type}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                  <p className="text-2xl font-bold">{formatCurrency(item.total)}</p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.color}/10`}>
                  <item.icon className={`w-5 h-5 ${item.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Accounts</CardTitle>
              <CardDescription>{accounts.length} accounts configured</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search accounts..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono text-sm">
                    {account.code}
                  </TableCell>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{getAccountTypeBadge(account.type)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(Number(account.balance))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={account.is_active ? "default" : "secondary"}
                      className={account.is_active ? "bg-success/10 text-success border-success/20" : ""}
                    >
                      {account.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/finance/accounts/${account.id}`}>
                            View Transactions
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/finance/accounts/${account.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
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
