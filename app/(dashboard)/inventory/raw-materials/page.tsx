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
import { Plus, Search, MoreHorizontal, Wheat, AlertTriangle, TrendingUp, Scale, Truck } from "lucide-react"
import Link from "next/link"

// Mock raw rice materials data
const rawMaterials = [
  {
    id: "1",
    name: "Premium Basmati Paddy",
    variety: "Super Basmati",
    supplier: "Punjab Rice Farms",
    current_stock: 45000, // kg
    minimum_stock: 10000,
    quality_grade: "A+",
    moisture_content: "12.5%",
    last_received: "2024-04-22",
    price_per_kg: 85,
    origin: "Punjab, Pakistan",
  },
  {
    id: "2",
    name: "Standard Rice Paddy",
    variety: "IRRI-6",
    supplier: "Sindh Agricultural Co.",
    current_stock: 28000,
    minimum_stock: 15000,
    quality_grade: "A",
    moisture_content: "13.2%",
    last_received: "2024-04-20",
    price_per_kg: 65,
    origin: "Sindh, Pakistan",
  },
  {
    id: "3",
    name: "Parboiled Rice Paddy",
    variety: "PK-386",
    supplier: "KPK Rice Mills",
    current_stock: 8500,
    minimum_stock: 12000,
    quality_grade: "B+",
    moisture_content: "14.1%",
    last_received: "2024-04-18",
    price_per_kg: 70,
    origin: "KPK, Pakistan",
  },
  {
    id: "4",
    name: "Broken Rice Mix",
    variety: "Mixed Varieties",
    supplier: "Local Farmers Coop",
    current_stock: 15000,
    minimum_stock: 5000,
    quality_grade: "B",
    moisture_content: "13.8%",
    last_received: "2024-04-21",
    price_per_kg: 45,
    origin: "Punjab, Pakistan",
  },
]

function getStockStatus(current: number, minimum: number) {
  if (current <= minimum) {
    return <Badge variant="destructive">Low Stock</Badge>
  }
  if (current <= minimum * 1.5) {
    return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Medium Stock</Badge>
  }
  return <Badge className="bg-success/10 text-success border-success/20">Good Stock</Badge>
}

function getQualityBadge(grade: string) {
  const colors: Record<string, string> = {
    "A+": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    "A": "bg-green-500/10 text-green-600 border-green-500/20",
    "B+": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    "B": "bg-orange-500/10 text-orange-600 border-orange-500/20",
    "C": "bg-red-500/10 text-red-600 border-red-500/20",
  }
  return (
    <Badge variant="outline" className={colors[grade] || ""}>
      {grade}
    </Badge>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function RawMaterialsPage() {
  const stats = [
    { 
      title: "Total Raw Stock", 
      value: `${(rawMaterials.reduce((sum, item) => sum + item.current_stock, 0) / 1000).toFixed(1)} Tons`, 
      icon: Wheat, 
      color: "bg-amber-500" 
    },
    { 
      title: "Low Stock Items", 
      value: rawMaterials.filter(item => item.current_stock <= item.minimum_stock).length, 
      icon: AlertTriangle, 
      color: "bg-red-500" 
    },
    { 
      title: "Total Value", 
      value: formatCurrency(rawMaterials.reduce((sum, item) => sum + (item.current_stock * item.price_per_kg), 0)), 
      icon: TrendingUp, 
      color: "bg-green-500" 
    },
    { 
      title: "Suppliers", 
      value: new Set(rawMaterials.map(item => item.supplier)).size, 
      icon: Truck, 
      color: "bg-blue-500" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Raw Rice Materials</h1>
          <p className="text-muted-foreground">
            Manage raw rice paddy inventory and quality
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Truck className="w-4 h-4 mr-2" />
            New Delivery
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </Button>
        </div>
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

      {/* Raw Materials Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Raw Rice Inventory</CardTitle>
              <CardDescription>{rawMaterials.length} raw material types in stock</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search raw materials..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead className="text-right">Stock (kg)</TableHead>
                <TableHead className="text-right">Price/kg</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Received</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                        <Wheat className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {material.variety} • {material.origin}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{material.supplier}</p>
                      <p className="text-sm text-muted-foreground">
                        Moisture: {material.moisture_content}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getQualityBadge(material.quality_grade)}</TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{material.current_stock.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Min: {material.minimum_stock.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(material.price_per_kg)}
                  </TableCell>
                  <TableCell>
                    {getStockStatus(material.current_stock, material.minimum_stock)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(material.last_received).toLocaleDateString()}
                    </span>
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
                          <Link href={`/inventory/raw-materials/${material.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Scale className="w-4 h-4 mr-2" />
                          Quality Test
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="w-4 h-4 mr-2" />
                          Record Delivery
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/raw-materials/${material.id}/edit`}>
                            Edit Details
                          </Link>
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