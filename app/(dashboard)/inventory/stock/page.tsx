import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"

const stockLevels = [
  {
    id: 1,
    product: "Premium Basmati Rice - 25kg",
    current_stock: 2500,
    reorder_level: 500,
    unit: "bags",
    status: "good",
    warehouse: "Main Warehouse",
  },
  {
    id: 2,
    product: "Standard Rice IRRI-6 - 50kg",
    current_stock: 1800,
    reorder_level: 800,
    unit: "bags",
    status: "good",
    warehouse: "Main Warehouse",
  },
  {
    id: 3,
    product: "Parboiled Rice - 25kg",
    current_stock: 450,
    reorder_level: 600,
    unit: "bags",
    status: "low",
    warehouse: "Main Warehouse",
  },
  {
    id: 4,
    product: "Broken Rice - 50kg",
    current_stock: 180,
    reorder_level: 200,
    unit: "bags",
    status: "low",
    warehouse: "Secondary Storage",
  },
  {
    id: 5,
    product: "Raw Basmati Paddy",
    current_stock: 45000,
    reorder_level: 10000,
    unit: "kg",
    status: "good",
    warehouse: "Raw Material Storage",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "good":
      return <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Good Stock
      </Badge>
    case "low":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Low Stock
      </Badge>
    case "out":
      return <Badge variant="destructive">
        Out of Stock
      </Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function StockLevelsPage() {
  const totalItems = stockLevels.length
  const lowStockItems = stockLevels.filter(item => item.status === 'low').length
  const goodStockItems = stockLevels.filter(item => item.status === 'good').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Levels</h1>
          <p className="text-muted-foreground">
            Monitor inventory stock levels across all warehouses
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Package className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Good Stock</p>
                <p className="text-2xl font-bold text-success">{goodStockItems}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-warning">{lowStockItems}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Status</CardTitle>
          <CardDescription>Current stock levels across all products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockLevels.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">{item.warehouse}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current Stock</p>
                    <p className="text-lg font-semibold">
                      {item.current_stock.toLocaleString()} {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Reorder Level</p>
                    <p className="text-sm font-medium">
                      {item.reorder_level.toLocaleString()} {item.unit}
                    </p>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/inventory/products">
                <Package className="w-4 h-4 mr-2" />
                View All Products
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/inventory/raw-materials">
                <Package className="w-4 h-4 mr-2" />
                Raw Materials
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/inventory/movements">
                <TrendingUp className="w-4 h-4 mr-2" />
                Stock Movements
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}