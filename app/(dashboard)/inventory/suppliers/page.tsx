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
import { Plus, Search, MoreHorizontal, Truck, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const suppliers = [
  {
    id: "1",
    name: "Punjab Rice Farms",
    contact_person: "Malik Ahmed",
    email: "malik@punjabrice.pk",
    phone: "+92-42-1234567",
    location: "Sheikhupura, Punjab",
    products: ["Premium Basmati Paddy", "Super Basmati"],
    payment_terms: "30 days",
    rating: 4.8,
    total_orders: 156,
    status: "active",
  },
  {
    id: "2",
    name: "Sindh Agricultural Co.",
    contact_person: "Hassan Ali",
    email: "hassan@sindhagri.pk",
    phone: "+92-21-9876543",
    location: "Larkana, Sindh",
    products: ["IRRI-6", "IRRI-9", "Standard Rice"],
    payment_terms: "45 days",
    rating: 4.5,
    total_orders: 89,
    status: "active",
  },
  {
    id: "3",
    name: "KPK Rice Mills",
    contact_person: "Imran Khan",
    email: "imran@kpkrice.pk",
    phone: "+92-91-5555555",
    location: "Mardan, KPK",
    products: ["PK-386", "Parboiled Rice Paddy"],
    payment_terms: "30 days",
    rating: 4.2,
    total_orders: 67,
    status: "active",
  },
  {
    id: "4",
    name: "Local Farmers Cooperative",
    contact_person: "Muhammad Yousaf",
    email: "yousaf@localcoop.pk",
    phone: "+92-61-7777777",
    location: "Multan, Punjab",
    products: ["Broken Rice Mix", "Standard Varieties"],
    payment_terms: "15 days",
    rating: 4.0,
    total_orders: 234,
    status: "active",
  },
  {
    id: "5",
    name: "Balochistan Rice Traders",
    contact_person: "Abdul Qadir",
    email: "qadir@balochrice.pk",
    phone: "+92-81-3333333",
    location: "Quetta, Balochistan",
    products: ["Standard Rice"],
    payment_terms: "30 days",
    rating: 3.8,
    total_orders: 23,
    status: "inactive",
  },
]

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

function getRatingStars(rating: number) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-xs text-muted-foreground">/ 5.0</span>
    </div>
  )
}

export default function SuppliersPage() {
  const stats = [
    { 
      title: "Total Suppliers", 
      value: suppliers.length, 
      icon: Truck, 
      color: "bg-primary" 
    },
    { 
      title: "Active Suppliers", 
      value: suppliers.filter(s => s.status === 'active').length, 
      icon: Truck, 
      color: "bg-success" 
    },
    { 
      title: "Total Orders", 
      value: suppliers.reduce((sum, s) => sum + s.total_orders, 0), 
      icon: Truck, 
      color: "bg-chart-2" 
    },
    { 
      title: "Avg Rating", 
      value: (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1), 
      icon: Truck, 
      color: "bg-chart-3" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage rice suppliers and vendors
          </p>
        </div>
        <Button asChild>
          <Link href="/inventory/suppliers/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
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

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Suppliers</CardTitle>
              <CardDescription>{suppliers.length} suppliers in database</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                          {supplier.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {supplier.contact_person}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.slice(0, 2).map((product, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                      {supplier.products.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{supplier.products.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span>{supplier.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRatingStars(supplier.rating)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{supplier.total_orders}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/suppliers/${supplier.id}`}>
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/suppliers/${supplier.id}/edit`}>
                            Edit Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend
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