"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, AlertTriangle, TrendingDown, Package, ArrowDown, ArrowUp } from "lucide-react"

const stockAlerts = [
  {
    id: "1",
    product: "USB-C Hub",
    sku: "SKU-1003",
    current_stock: 35,
    reorder_level: 50,
    status: "low",
    trend: "down",
  },
  {
    id: "2",
    product: "Wireless Headset",
    sku: "SKU-1015",
    current_stock: 0,
    reorder_level: 25,
    status: "out",
    trend: "down",
  },
  {
    id: "3",
    product: "Monitor Stand",
    sku: "SKU-2010",
    current_stock: 8,
    reorder_level: 20,
    status: "low",
    trend: "down",
  },
  {
    id: "4",
    product: "Desk Lamp",
    sku: "SKU-2015",
    current_stock: 0,
    reorder_level: 15,
    status: "out",
    trend: "stable",
  },
  {
    id: "5",
    product: "Cable Organizer",
    sku: "SKU-3005",
    current_stock: 45,
    reorder_level: 60,
    status: "low",
    trend: "up",
  },
]

const stockMovements = [
  {
    id: "1",
    product: "Wireless Keyboard",
    type: "in",
    quantity: 100,
    date: "2024-04-24",
    reference: "PO-2024-0056",
  },
  {
    id: "2",
    product: "Ergonomic Mouse",
    type: "out",
    quantity: 25,
    date: "2024-04-24",
    reference: "SO-2024-0089",
  },
  {
    id: "3",
    product: "USB-C Hub",
    type: "out",
    quantity: 15,
    date: "2024-04-23",
    reference: "SO-2024-0088",
  },
  {
    id: "4",
    product: "Office Chair",
    type: "in",
    quantity: 20,
    date: "2024-04-23",
    reference: "PO-2024-0055",
  },
  {
    id: "5",
    product: "Standing Desk",
    type: "out",
    quantity: 3,
    date: "2024-04-22",
    reference: "SO-2024-0087",
  },
]

const stockSummary = [
  { category: "Electronics", total: 1250, value: 125000 },
  { category: "Furniture", total: 285, value: 85000 },
  { category: "Stationery", total: 3200, value: 24000 },
  { category: "Equipment", total: 145, value: 42000 },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "out":
      return <Badge variant="destructive">Out of Stock</Badge>
    case "low":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Low Stock</Badge>
    default:
      return <Badge className="bg-success/10 text-success border-success/20">In Stock</Badge>
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function StockPage() {
  const totalValue = stockSummary.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Levels</h1>
          <p className="text-muted-foreground">
            Monitor inventory levels and movements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Stock Adjustment</Button>
          <Button>Create Purchase Order</Button>
        </div>
      </div>

      {/* Stock Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stockSummary.map((item) => (
          <Card key={item.category}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">{item.category}</p>
                <Package className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{item.total.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                Value: {formatCurrency(item.value)}
              </p>
              <Progress
                value={(item.value / totalValue) * 100}
                className="mt-3 h-1"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Stock Alerts
                </CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.status === "out" ? "bg-destructive" : "bg-warning"
                    }`} />
                    <div>
                      <p className="font-medium">{alert.product}</p>
                      <p className="text-xs text-muted-foreground">{alert.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{alert.current_stock}</p>
                      <p className="text-xs text-muted-foreground">
                        of {alert.reorder_level}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {alert.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      ) : alert.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-success" />
                      ) : null}
                    </div>
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Stock Movements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Movements</CardTitle>
                <CardDescription>Stock ins and outs</CardDescription>
              </div>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 h-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stockMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      movement.type === "in" 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {movement.type === "in" ? (
                        <ArrowDown className="w-4 h-4" />
                      ) : (
                        <ArrowUp className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {movement.reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      movement.type === "in" ? "text-success" : "text-destructive"
                    }`}>
                      {movement.type === "in" ? "+" : "-"}{movement.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(movement.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
