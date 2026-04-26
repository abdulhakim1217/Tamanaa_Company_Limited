import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowDown, ArrowUp, RefreshCw } from "lucide-react"

const stockMovements = [
  {
    id: 1,
    type: "in",
    product: "Premium Basmati Paddy",
    quantity: "5000 kg",
    from: "Punjab Rice Farms",
    to: "Main Warehouse",
    date: "2024-04-24T10:30:00Z",
    reference: "PO-2024-045",
  },
  {
    id: 2,
    type: "out",
    product: "Standard Rice 25kg bags",
    quantity: "500 bags",
    from: "Main Warehouse",
    to: "Metro Cash & Carry",
    date: "2024-04-24T14:15:00Z",
    reference: "SO-2024-156",
  },
  {
    id: 3,
    type: "transfer",
    product: "Parboiled Rice",
    quantity: "2000 kg",
    from: "Processing Line C",
    to: "Packaging Area",
    date: "2024-04-24T16:45:00Z",
    reference: "TR-2024-089",
  },
]

function getMovementIcon(type: string) {
  switch (type) {
    case "in":
      return <ArrowDown className="w-4 h-4 text-success" />
    case "out":
      return <ArrowUp className="w-4 h-4 text-destructive" />
    case "transfer":
      return <RefreshCw className="w-4 h-4 text-primary" />
    default:
      return <ArrowRight className="w-4 h-4" />
  }
}

function getMovementBadge(type: string) {
  switch (type) {
    case "in":
      return <Badge className="bg-success/10 text-success border-success/20">Stock In</Badge>
    case "out":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Stock Out</Badge>
    case "transfer":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Transfer</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export default function StockMovementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Movements</h1>
          <p className="text-muted-foreground">
            Track inventory movements and transfers
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stockMovements.map((movement) => (
          <Card key={movement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    {getMovementIcon(movement.type)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{movement.product}</CardTitle>
                    <CardDescription>
                      {movement.quantity} • {movement.reference}
                    </CardDescription>
                  </div>
                </div>
                {getMovementBadge(movement.type)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{movement.from}</span>
                <ArrowRight className="w-4 h-4" />
                <span>{movement.to}</span>
                <span className="ml-auto">{new Date(movement.date).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}