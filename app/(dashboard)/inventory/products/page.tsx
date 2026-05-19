'use client'

import { getProducts } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MobileGrid, MobileHeader, MobileButton } from "@/components/ui/mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"
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
import { Plus, Search, MoreHorizontal, Package, AlertTriangle, TrendingUp, Boxes, Wheat } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProductsPage() {
  const isMobile = useIsMobile()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback to mock rice processing data
        setProducts([
          {
            id: "1",
            sku: "RICE-001",
            name: "Premium Basmati Rice",
            category_name: "Basmati",
            sell_price: 45.00,
            cost_price: 32.00,
            total_stock: 2500,
            reorder_level: 500,
            is_active: true,
          },
          {
            id: "2",
            sku: "RICE-002",
            name: "IRRI-6 Standard Rice",
            category_name: "Standard",
            sell_price: 28.00,
            cost_price: 20.00,
            total_stock: 1800,
            reorder_level: 400,
            is_active: true,
          },
          {
            id: "3",
            sku: "RICE-003",
            name: "Parboiled Rice",
            category_name: "Parboiled",
            sell_price: 35.00,
            cost_price: 25.00,
            total_stock: 300,
            reorder_level: 500,
            is_active: true,
          },
          {
            id: "4",
            sku: "RICE-004",
            name: "Broken Rice Grade A",
            category_name: "Broken Rice",
            sell_price: 18.00,
            cost_price: 12.00,
            total_stock: 0,
            reorder_level: 200,
            is_active: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading || isMobile === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading rice products...</p>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalProducts = products.length
  const lowStockItems = products.filter(p => Number(p.total_stock) <= p.reorder_level).length
  const outOfStockItems = products.filter(p => Number(p.total_stock) === 0).length
  const inventoryValue = products.reduce((sum, p) => sum + (Number(p.sell_price) * Number(p.total_stock)), 0)

  const stats = [
    { title: "Rice Varieties", value: totalProducts.toString(), icon: Wheat, color: "bg-primary" },
    { title: "Low Stock Items", value: lowStockItems.toString(), icon: AlertTriangle, color: "bg-warning" },
    { title: "Out of Stock", value: outOfStockItems.toString(), icon: Boxes, color: "bg-destructive" },
    { title: "Inventory Value", value: `GH₵ ${(inventoryValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-success" },
  ]

  const mobileCardRender = (product: any) => (
    <Card key={product.id} className="p-4">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
              <Wheat className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground font-mono">{product.sku}</div>
            </div>
          </div>
          {getStockStatus(Number(product.total_stock), product.reorder_level)}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Category:</span>
            <div className="font-medium">{product.category_name}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Stock:</span>
            <div className="font-medium">{product.total_stock} kg</div>
          </div>
          <div>
            <span className="text-muted-foreground">Price:</span>
            <div className="font-medium">{formatCurrency(Number(product.sell_price))}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Cost:</span>
            <div className="font-medium">{formatCurrency(Number(product.cost_price))}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm text-muted-foreground">
            Reorder at {product.reorder_level} kg
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
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
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <MobileHeader
        title="Rice Products"
        subtitle="Manage your rice inventory and varieties"
        actions={
          <MobileButton asChild>
            <Link href="/inventory/products/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </MobileButton>
        }
      />

      {/* Stats */}
      <MobileGrid cols={4}>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>{stat.value}</p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </MobileGrid>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row items-center justify-between'}`}>
            <div>
              <CardTitle>All Rice Products</CardTitle>
              <CardDescription>{products.length} rice varieties in inventory</CardDescription>
            </div>
            <div className={`relative ${isMobile ? 'w-full' : 'w-64'}`}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rice products..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {products.map((product) => mobileCardRender(product))}
            </div>
          ) : (
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
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                          <Wheat className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Rice Processing
                          </p>
                        </div>
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
                        <p className="font-medium">{product.total_stock} kg</p>
                        <p className="text-xs text-muted-foreground">
                          Reorder at {product.reorder_level} kg
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
          )}
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
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount)
}