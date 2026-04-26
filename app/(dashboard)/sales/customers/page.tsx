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
import { Plus, Search, MoreHorizontal, Users, Building2, TrendingUp, Truck, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

// Mock customer data for rice business
const customers = [
  {
    id: "1",
    company_name: "Metro Cash & Carry",
    contact_person: "Ahmed Khan",
    email: "ahmed@metro.pk",
    phone: "+92-21-1234567",
    city: "Karachi",
    region: "Sindh",
    customer_type: "wholesale",
    credit_limit: 5000000, // PKR
    outstanding_balance: 850000,
    last_order_date: "2024-04-22",
    total_orders: 156,
    preferred_products: ["Premium Basmati", "Standard Rice"],
    payment_terms: "30 days",
    status: "active",
  },
  {
    id: "2",
    company_name: "Carrefour Pakistan",
    contact_person: "Sarah Ahmed",
    email: "sarah@carrefour.pk",
    phone: "+92-42-9876543",
    city: "Lahore",
    region: "Punjab",
    customer_type: "retail_chain",
    credit_limit: 8000000,
    outstanding_balance: 1200000,
    last_order_date: "2024-04-23",
    total_orders: 89,
    preferred_products: ["Premium Basmati", "Parboiled Rice"],
    payment_terms: "45 days",
    status: "active",
  },
  {
    id: "3",
    company_name: "Al-Fatah Stores",
    contact_person: "Muhammad Ali",
    email: "ali@alfatah.pk",
    phone: "+92-51-5555555",
    city: "Islamabad",
    region: "ICT",
    customer_type: "retail_chain",
    credit_limit: 3000000,
    outstanding_balance: 450000,
    last_order_date: "2024-04-20",
    total_orders: 67,
    preferred_products: ["Standard Rice", "Broken Rice"],
    payment_terms: "30 days",
    status: "active",
  },
  {
    id: "4",
    company_name: "Rice Exporters Ltd",
    contact_person: "Fatima Sheikh",
    email: "fatima@riceexport.pk",
    phone: "+92-21-7777777",
    city: "Karachi",
    region: "Sindh",
    customer_type: "export",
    credit_limit: 15000000,
    outstanding_balance: 2500000,
    last_order_date: "2024-04-24",
    total_orders: 234,
    preferred_products: ["Premium Basmati", "Super Basmati"],
    payment_terms: "LC at sight",
    status: "active",
  },
  {
    id: "5",
    company_name: "Local Distributor Co",
    contact_person: "Hassan Malik",
    email: "hassan@localdist.pk",
    phone: "+92-42-3333333",
    city: "Faisalabad",
    region: "Punjab",
    customer_type: "distributor",
    credit_limit: 2000000,
    outstanding_balance: 0,
    last_order_date: "2024-03-15",
    total_orders: 23,
    preferred_products: ["Standard Rice"],
    payment_terms: "15 days",
    status: "inactive",
  },
]

function getCustomerTypeBadge(type: string) {
  const colors: Record<string, string> = {
    wholesale: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    retail_chain: "bg-green-500/10 text-green-600 border-green-500/20",
    export: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    distributor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    individual: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  }
  
  const labels: Record<string, string> = {
    wholesale: "Wholesale",
    retail_chain: "Retail Chain",
    export: "Export",
    distributor: "Distributor",
    individual: "Individual",
  }
  
  return (
    <Badge variant="outline" className={colors[type] || ""}>
      {labels[type] || type}
    </Badge>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>
    case "suspended":
      return <Badge variant="destructive">Suspended</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function CustomersPage() {
  const stats = [
    { 
      title: "Total Customers", 
      value: customers.length, 
      icon: Users, 
      color: "bg-primary" 
    },
    { 
      title: "Active Customers", 
      value: customers.filter(c => c.status === 'active').length, 
      icon: Building2, 
      color: "bg-success" 
    },
    { 
      title: "Total Credit Limit", 
      value: formatCurrency(customers.reduce((sum, c) => sum + c.credit_limit, 0)), 
      icon: TrendingUp, 
      color: "bg-chart-2" 
    },
    { 
      title: "Outstanding Balance", 
      value: formatCurrency(customers.reduce((sum, c) => sum + c.outstanding_balance, 0)), 
      icon: Truck, 
      color: "bg-warning" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage rice customers and distribution network
          </p>
        </div>
        <Button asChild>
          <Link href="/sales/customers/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Link>
        </Button>
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>{customers.length} customers in database</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Credit Limit</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                          {customer.company_name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.company_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.total_orders} orders • Last: {new Date(customer.last_order_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-medium">{customer.contact_person}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCustomerTypeBadge(customer.customer_type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{customer.city}, {customer.region}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(customer.credit_limit)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      customer.outstanding_balance > 0 ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {formatCurrency(customer.outstanding_balance)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/customers/${customer.id}`}>
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/orders/new?customer=${customer.id}`}>
                            Create Order
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Order History
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/customers/${customer.id}/edit`}>
                            Edit Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend Account
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