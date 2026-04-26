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
import { Plus, Search, MoreHorizontal, Truck, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const suppliers = [
  {
    id: "1",
    name: "Tech Supplies Inc",
    contact_person: "Robert Miller",
    email: "robert@techsupplies.com",
    phone: "+1 234 567 8901",
    address: "123 Tech Street, San Francisco, CA",
    payment_terms: "Net 30",
    products_count: 245,
    is_active: true,
  },
  {
    id: "2",
    name: "Office Essentials",
    contact_person: "Amanda Clark",
    email: "amanda@officeessentials.com",
    phone: "+1 234 567 8902",
    address: "456 Office Blvd, New York, NY",
    payment_terms: "Net 45",
    products_count: 182,
    is_active: true,
  },
  {
    id: "3",
    name: "Digital World Ltd",
    contact_person: "David Lee",
    email: "david@digitalworld.com",
    phone: "+1 234 567 8903",
    address: "789 Digital Ave, Austin, TX",
    payment_terms: "Net 30",
    products_count: 128,
    is_active: true,
  },
  {
    id: "4",
    name: "Paper & More",
    contact_person: "Susan White",
    email: "susan@paperandmore.com",
    phone: "+1 234 567 8904",
    address: "321 Paper Lane, Chicago, IL",
    payment_terms: "Net 15",
    products_count: 356,
    is_active: true,
  },
  {
    id: "5",
    name: "Global Electronics",
    contact_person: "James Brown",
    email: "james@globalelec.com",
    phone: "+1 234 567 8905",
    address: "654 Global St, Seattle, WA",
    payment_terms: "Net 60",
    products_count: 89,
    is_active: false,
  },
]

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage your supplier relationships
          </p>
        </div>
        <Button asChild>
          <Link href="/inventory/suppliers/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Suppliers</CardTitle>
              <CardDescription>{suppliers.length} registered suppliers</CardDescription>
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
                <TableHead>Location</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
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
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{supplier.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{supplier.payment_terms}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {supplier.products_count}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        supplier.is_active
                          ? "bg-success/10 text-success border-success/20"
                          : ""
                      }
                      variant={supplier.is_active ? "outline" : "secondary"}
                    >
                      {supplier.is_active ? "Active" : "Inactive"}
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
                          <Link href={`/inventory/suppliers/${supplier.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/suppliers/${supplier.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Products</DropdownMenuItem>
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
