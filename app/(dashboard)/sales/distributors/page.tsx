import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Truck, MapPin } from "lucide-react"

const distributors = [
  {
    id: 1,
    name: "Karachi Distribution Hub",
    region: "Sindh",
    coverage: "Karachi, Hyderabad, Sukkur",
    monthly_volume: "250 tons",
    status: "active",
  },
  {
    id: 2,
    name: "Punjab Distribution Network",
    region: "Punjab",
    coverage: "Lahore, Faisalabad, Multan",
    monthly_volume: "380 tons",
    status: "active",
  },
  {
    id: 3,
    name: "KPK Regional Distributor",
    region: "KPK",
    coverage: "Peshawar, Mardan, Abbottabad",
    monthly_volume: "120 tons",
    status: "active",
  },
]

export default function DistributorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Distributors</h1>
          <p className="text-muted-foreground">
            Manage distribution network and partners
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Distributor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {distributors.map((distributor) => (
          <Card key={distributor.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{distributor.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {distributor.region}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Coverage Area</p>
                <p className="text-sm font-medium">{distributor.coverage}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Volume</p>
                <p className="text-sm font-medium">{distributor.monthly_volume}</p>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                {distributor.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}