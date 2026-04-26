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

// Mock raw rice inventory data
const rawRiceStock = [
  {
    id: "1",
    variety: "Basmati Premium",
    grade: "Grade A",
    quantity: "15,000 kg",
    moisture_content: "12.5%",
    supplier: "Punjab Rice Mills",
    received_date: "2024-04-20",
    expiry_date: "2024-10-20",
    price_per_kg: "85.00",
    storage_location: "Warehouse A - Section 1",
    quality_score: 95,
  },
  {
    id: "2",
    variety: "Jasmine Rice",
    grade: "Grade A",
    quantity: "8,500 kg",
    moisture_content: "13.0%",
    supplier: "Thai Rice Imports",
    received_date: "2024-04-18",
    expiry_date: "2024-09-18",
    price_per_kg: "92.00",
    storage_location: "Warehouse A - Section 2",
    quality_score: 92,
  },
  {
    id: "3",
    variety: "Long Grain White",
    grade: "Grade B",
    quantity: "22,000 kg",
    moisture_content: "14.0%",
    supplier: "Local Farmers Coop",
    received_date: "2024-04-15",
    expiry_date: "2024-08-15",
    price_per_kg: "68.00",
    storage_location: "Warehouse B - Section 1",
    quality_score: 88,
  },
  {
    id: "4",
    variety: "Brown Rice Organic",
    grade: "Grade A",
    quantity: "5,200 kg",
    moisture_content: "12.8%",
    supplier: "Organic Farms Ltd",
    received_date: "2024-04-22",
    expiry_date: "2024-07-22",
    price_per_kg: "125.00",
    storage_location: "Warehouse C - Section 1",
    quality_score: 97,
  },
  {
    id: "5",
    variety: "Parboiled Rice",
    grade: "Grade A",
    quantity: "18,500 kg",
    moisture_content: "13.2%",
    supplier: "Delta Rice Processing",
    received_date: "2024-04-19",
    expiry_date: "2024-11-19",
    price_per_kg: "78.00",
    storage_location: "Warehouse B - Section 2",
    quality_score: 90,
  },
]

function getGradeBadge(grade: string) {
  switch (grade) {
    case "Grade A":
      return <Badge className="bg-success/10 text-success border-success/20">Grade A</Badge>
    case "Grade B":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Grade B</Badge>
    case "Grade C":
      return <Badge variant="destructive">Grade C</Badge>
    default:
      return <Badge variant="outline">{grade}</Badge>
  }
}

function getQualityColor(score: number) {
  if (score >= 95) return "text-success"
  if (score >= 85) return "text-warning-foreground"
  return "text-destructive"
}

function formatCurrency(amount: string) {
  return `₹${amount}`
}

export default function RawRiceStockPage() {
  const totalQuantity = rawRiceStock.reduce((sum, item) => {
    const qty = parseFloat(item.quantity.replace(/[^\d.]/g, ''))
    return sum + qty
  }, 0)

  const totalValue = rawRiceStock.reduce((sum, item) => {
    const qty = parseFloat(item.quantity.replace(/[^\d.]/g, ''))
    const price = parseFloat(item.price_per_kg)
    return sum + (qty * price)
  }, 0)

  const stats = [
    { 
      title: "Total Raw Rice Stock", 
      value: `${(totalQuantity / 1000).toFixed(1)} Tons`, 
      icon: Wheat, 
      color: "bg-primary" 
    },
    { 
      title: "Rice Varieties", 
      value: new Set(rawRiceStock.map(item => item.variety)).size.toString(), 
      icon: Scale, 
      color: "bg-success" 
    },
    { 
      title: "Stock Value", 
      value: `₹${(totalValue / 100000).toFixed(1)}L`, 
      icon: TrendingUp, 
      color: "bg-chart-2" 
    },
    { 
      title: "Active Suppliers", 
      value: new Set(rawRiceStock.map(item => item.supplier)).size.toString(), 
      icon: Truck, 
      color: "bg-chart-4" 
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with rice theme */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-600 via-yellow-500 to-green-600 p-6 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Raw Rice Inventory</h1>
            <p className="text-white/90">
              Monitor and manage raw rice stock levels and quality
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Quality Alerts
            </Button>
            <Button className="bg-white text-amber-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Stock Entry
            </Button>
          </div>
        </div>
        {/* Decorative rice grains */}
        <div className="absolute right-0 top-0 h-full w-32 opacity-10">
          <div className="flex h-full flex-col justify-around">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-6 bg-white rounded-full" />
            ))}
          </div>
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

      {/* Raw Rice Stock Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Raw Rice Stock Details</CardTitle>
              <CardDescription>Current inventory of raw rice varieties</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rice varieties..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rice Variety</TableHead>
                <TableHead>Grade & Quality</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Moisture</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Storage Location</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawRiceStock.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100">
                        <Wheat className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{stock.variety}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(stock.price_per_kg)}/kg
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getGradeBadge(stock.grade)}
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getQualityColor(stock.quality_score)}`}>
                          {stock.quality_score}%
                        </span>
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              stock.quality_score >= 95 ? 'bg-success' : 
                              stock.quality_score >= 85 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${stock.quality_score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{stock.quantity}</div>
                      <div className="text-muted-foreground">
                        Received: {new Date(stock.received_date).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        parseFloat(stock.moisture_content) <= 13 
                          ? "border-success/20 text-success" 
                          : "border-warning/20 text-warning-foreground"
                      }
                    >
                      {stock.moisture_content}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{stock.supplier}</div>
                      <div className="text-muted-foreground">
                        Exp: {new Date(stock.expiry_date).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {stock.storage_location}
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
                          <Link href={`/inventory/raw-rice/${stock.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Quality Test
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Move to Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Update Quantity
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Mark as Expired
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