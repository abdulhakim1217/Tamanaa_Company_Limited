import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, CheckCircle2, Clock, Truck } from "lucide-react"

const orders = [
  {
    id: 1,
    order_number: "ORD-2024-156",
    customer: "Metro Cash & Carry",
    products: "Premium Basmati 25kg - 500 bags",
    total_amount: 2500000,
    status: "delivered",
    order_date: "2024-04-20",
    delivery_date: "2024-04-24",
  },
  {
    id: 2,
    order_number: "ORD-2024-157",
    customer: "Carrefour Pakistan",
    products: "Standard Rice 50kg - 300 bags",
    total_amount: 1800000,
    status: "in_transit",
    order_date: "2024-04-22",
    delivery_date: "2024-04-26",
  },
  {
    id: 3,
    order_number: "ORD-2024-158",
    customer: "Al-Fatah Stores",
    products: "Parboiled Rice 25kg - 200 bags",
    total_amount: 950000,
    status: "processing",
    order_date: "2024-04-24",
    delivery_date: "2024-04-28",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "delivered":
      return <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Delivered
      </Badge>
    case "in_transit":
      return <Badge className="bg-primary/10 text-primary border-primary/20">
        <Truck className="w-3 h-3 mr-1" />
        In Transit
      </Badge>
    case "processing":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">
        <Clock className="w-3 h-3 mr-1" />
        Processing
      </Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and deliveries
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{order.order_number}</CardTitle>
                    <CardDescription>{order.customer}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Products</p>
                  <p className="font-medium">{order.products}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{formatCurrency(order.total_amount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium">{new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delivery Date</p>
                  <p className="font-medium">{new Date(order.delivery_date).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}