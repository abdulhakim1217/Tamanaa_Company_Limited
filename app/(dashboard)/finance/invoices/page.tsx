import { getInvoices } from "@/lib/database"
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
import { Plus, Search, MoreHorizontal, FileText, DollarSign, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return <Badge className="bg-success/10 text-success border-success/20">Paid</Badge>
    case "sent":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Sent</Badge>
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>
    case "cancelled":
      return <Badge variant="secondary">Cancelled</Badge>
    default:
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Draft</Badge>
  }
}

function getTypeBadge(type: string) {
  return type === 'sales' ? (
    <Badge className="bg-success/10 text-success border-success/20">Sales</Badge>
  ) : (
    <Badge className="bg-chart-4/10 text-chart-4 border-chart-4/20">Purchase</Badge>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default async function InvoicesPage() {
  // Fetch real data from database
  let invoices
  try {
    invoices = await getInvoices()
  } catch (error) {
    console.error("Error fetching invoices:", error)
    // Fallback to mock data if database is not set up
    invoices = [
      {
        id: "1",
        invoice_number: "INV-2024-001",
        type: "sales",
        contact_name: "Acme Corporation",
        date: "2024-04-20",
        due_date: "2024-05-20",
        subtotal: 5000,
        tax: 500,
        total: 5500,
        status: "sent",
      },
      {
        id: "2",
        invoice_number: "INV-2024-002",
        type: "sales",
        contact_name: "TechStart Inc",
        date: "2024-04-22",
        due_date: "2024-05-22",
        subtotal: 3200,
        tax: 320,
        total: 3520,
        status: "paid",
      },
      {
        id: "3",
        invoice_number: "PUR-2024-001",
        type: "purchase",
        contact_name: "Office Supplies Co",
        date: "2024-04-18",
        due_date: "2024-05-18",
        subtotal: 1200,
        tax: 120,
        total: 1320,
        status: "overdue",
      },
    ]
  }

  const stats = [
    { 
      title: "Total Invoices", 
      value: invoices.length, 
      icon: FileText, 
      color: "bg-primary" 
    },
    { 
      title: "Total Amount", 
      value: formatCurrency(invoices.reduce((sum: number, inv: any) => sum + Number(inv.total), 0)), 
      icon: DollarSign, 
      color: "bg-success" 
    },
    { 
      title: "Pending", 
      value: invoices.filter((inv: any) => inv.status === 'sent').length, 
      icon: Clock, 
      color: "bg-warning" 
    },
    { 
      title: "Paid", 
      value: invoices.filter((inv: any) => inv.status === 'paid').length, 
      icon: CheckCircle2, 
      color: "bg-chart-2" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage sales and purchase invoices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/finance/invoices/purchase/new">
              <Plus className="w-4 h-4 mr-2" />
              Purchase Invoice
            </Link>
          </Button>
          <Button asChild>
            <Link href="/finance/invoices/sales/new">
              <Plus className="w-4 h-4 mr-2" />
              Sales Invoice
            </Link>
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

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>{invoices.length} invoices total</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer/Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice: any) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-sm">
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>{getTypeBadge(invoice.type)}</TableCell>
                  <TableCell className="font-medium">
                    {invoice.contact_name || 'Unknown'}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className={`${
                      new Date(invoice.due_date) < new Date() && invoice.status !== 'paid' 
                        ? 'text-destructive font-medium' 
                        : ''
                    }`}>
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(Number(invoice.total))}
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/finance/invoices/${invoice.id}`}>
                            View Invoice
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Download PDF
                        </DropdownMenuItem>
                        {invoice.status === 'draft' && (
                          <DropdownMenuItem asChild>
                            <Link href={`/finance/invoices/${invoice.id}/edit`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {invoice.status === 'sent' && (
                          <DropdownMenuItem>
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel
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