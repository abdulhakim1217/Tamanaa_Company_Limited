import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Wheat } from "lucide-react"

const finishedGoods = [
  {
    id: 1,
    name: "Premium Basmati Rice - 25kg",
    quantity: 2500,
    unit: "bags",
    status: "in_stock",
  },
  {
    id: 2,
    name: "Standard Rice IRRI-6 - 50kg",
    quantity: 1800,
    unit: "bags",
    status: "in_stock",
  },
  {
    id: 3,
    name: "Parboiled Rice - 25kg",
    quantity: 450,
    unit: "bags",
    status: "low_stock",
  },
]

export default function FinishedGoodsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finished Goods</h1>
          <p className="text-muted-foreground">
            Packaged rice products ready for distribution
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {finishedGoods.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <CardDescription>
                    {item.quantity} {item.unit}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className={item.status === 'in_stock' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning-foreground border-warning/20'}>
                {item.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}