import { getProducts } from "@/lib/database"
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
import { Plus, Search, MoreHorizontal, Package, AlertTriangle, TrendingUp, Boxes } from "lucide-react"
import Link from "next/link"

export default async function ProductsPage() {
  // Fetch real data from database
  let products
  try {
    products = await getProducts()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Fallback to mock data if database is not set up
    products = [
      {
        id: "1",
        sku: "SKU-1001",
        name: "Wireless Keyboard",
        category_name: "Electronics",
        sell_price: 79.99,
        cost_price: 45.00,
        total_stock: 245,
        reorder_level: 50,
        is_active: true,
      },
      {
        id: "2",
        sku: "SKU-1002",
        name: "Ergonomic Mouse",
        category_name: "Electronics",
        sell_price: 49.99,
        cost_price: 25.00,
        total_stock: 180,
        reorder_level: 40,
        is_active: true,
      },
    ]
  }

  // Calculate stats
  const totalProducts = products.length
  const lowStockItems = products.filter(p => Number(p.total_stock) <= p.reorder_level).length
  const outOfStockItems = products.filter(p => Number(p.total_stock) === 0).length
  const inventoryValue = products.reduce((sum, p) => sum + (Number(p.sell_price) * Number(p.total_stock)), 0)

  const stats = [
    { title: "Total Products", value: totalProducts.toString(), icon: Package, color: "bg-primary" },
    { title: "Low Stock Items", value: lowStockItems.toString(), icon: AlertTriangle, color: "bg-warning" },
    { title: "Out of Stock", value: outOfStockItems.toString(), icon: Boxes, color: "bg-destructive" },
    { title: "Inventory Value", value: `$${(inventoryValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-success" },
  ]
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/inventory/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Products</CardTitle>
              <CardDescription>{products.length} products in inventory</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Supplier info
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category_name || 'No Category'}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{formatCurrency(Number(product.sell_price))}</p>
                      <p className="text-xs text-muted-foreground">
                        Cost: {formatCurrency(Number(product.cost_price))}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{product.total_stock}</p>
                      <p className="text-xs text-muted-foreground">
                        Reorder at {product.reorder_level}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockStatus(Number(product.total_stock), product.reorder_level)}
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
                          <Link href={`/inventory/products/${product.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/products/${product.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
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

function getStockStatus(quantity: number, reorderLevel: number) {
  if (quantity === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>
  }
  if (quantity <= reorderLevel) {
    return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Low Stock</Badge>
  }
  return <Badge className="bg-success/10 text-success border-success/20">In Stock</Badge>
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}