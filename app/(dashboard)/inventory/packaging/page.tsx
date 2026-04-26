import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Tags } from "lucide-react"

const packagingMaterials = [
  {
    id: 1,
    name: "25kg PP Bags",
    quantity: 15000,
    unit: "pieces",
    reorder_level: 5000,
    status: "in_stock",
  },
  {
    id: 2,
    name: "50kg PP Bags",
    quantity: 8000,
    unit: "pieces",
    reorder_level: 3000,
    status: "in_stock",
  },
  {
    id: 3,
    name: "Product Labels",
    quantity: 2500,
    unit: "rolls",
    reorder_level: 2000,
    status: "low_stock",
  },
  {
    id: 4,
    name: "Stitching Thread",
    quantity: 450,
    unit: "spools",
    reorder_level: 500,
    status: "low_stock",
  },
]

export default function PackagingMaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packaging Materials</h1>
          <p className="text-muted-foreground">
            Manage packaging supplies and materials
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Material
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {packagingMaterials.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Tags className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm">{item.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {item.quantity.toLocaleString()} {item.unit}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className={item.status === 'in_stock' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning-foreground border-warning/20'}>
                  {item.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Reorder at: {item.reorder_level.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}