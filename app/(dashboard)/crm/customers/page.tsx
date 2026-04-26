import { getCustomers } from "@/lib/database"
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
import { Plus, Search, MoreHorizontal, Users, UserPlus, Target, Building2, Mail, Phone } from "lucide-react"
import Link from "next/link"

function getCustomerTypeBadge(type: string) {
  switch (type) {
    case "customer":
      return <Badge className="bg-success/10 text-success border-success/20">Customer</Badge>
    case "prospect":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Prospect</Badge>
    case "lead":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Lead</Badge>
    case "churned":
      return <Badge variant="destructive">Churned</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export default async function CustomersPage() {
  // Fetch real data from database
  let customers
  try {
    customers = await getCustomers()
  } catch (error) {
    console.error("Error fetching customers:", error)
    // Fallback to mock data if database is not set up
    customers = [
      {
        id: "1",
        company_name: "Acme Corporation",
        contact_name: "John Smith",
        email: "john@acme.com",
        phone: "+1-555-0101",
        city: "New York",
        country: "USA",
        type: "customer",
        assigned_to_name: "Sarah Johnson",
        deal_count: 3,
        created_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        company_name: "TechStart Inc",
        contact_name: "Emily Davis",
        email: "emily@techstart.io",
        phone: "+1-555-0102",
        city: "San Francisco",
        country: "USA",
        type: "prospect",
        assigned_to_name: "Mike Chen",
        deal_count: 1,
        created_at: "2024-02-20T14:30:00Z",
      },
    ]
  }

  const stats = [
    { 
      title: "Total Customers", 
      value: customers.filter((c: any) => c.type === 'customer').length, 
      icon: Users, 
      color: "bg-primary" 
    },
    { 
      title: "Active Prospects", 
      value: customers.filter((c: any) => c.type === 'prospect').length, 
      icon: Target, 
      color: "bg-chart-2" 
    },
    { 
      title: "New Leads", 
      value: customers.filter((c: any) => c.type === 'lead').length, 
      icon: UserPlus, 
      color: "bg-warning" 
    },
    { 
      title: "Total Deals", 
      value: customers.reduce((sum: number, c: any) => sum + (c.deal_count || 0), 0), 
      icon: Building2, 
      color: "bg-success" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and leads
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/customers/new">
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
              <CardDescription>{customers.length} customers and prospects</CardDescription>
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
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Deals</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {customer.company_name?.substring(0, 2).toUpperCase() || "CO"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.company_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.contact_name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {customer.email && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{customer.email}</span>
                        </div>
                      )}
                      {customer.phone && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{customer.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {customer.city && customer.country ? (
                        <span>{customer.city}, {customer.country}</span>
                      ) : (
                        <span className="text-muted-foreground">Not specified</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCustomerTypeBadge(customer.type)}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {customer.assigned_to_name || 'Unassigned'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">{customer.deal_count || 0}</span>
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
                          <Link href={`/crm/customers/${customer.id}`}>
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/crm/customers/${customer.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/crm/opportunities/new?customer=${customer.id}`}>
                            Create Deal
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
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