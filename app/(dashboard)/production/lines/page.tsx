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
import { Plus, Search, MoreHorizontal, Factory, Zap, AlertTriangle, CheckCircle2, Clock, Pause, Play, Settings } from "lucide-react"
import Link from "next/link"

// Mock production line data for rice processing
const productionLines = [
  {
    id: "1",
    name: "Line A - Premium Basmati",
    type: "Basmati Processing",
    status: "running",
    capacity: "2000 kg/hour",
    current_output: "1850 kg/hour",
    efficiency: 92.5,
    shift: "Day Shift",
    operator: "Ahmad Hassan",
    last_maintenance: "2024-04-20",
    next_maintenance: "2024-05-20",
  },
  {
    id: "2",
    name: "Line B - Standard Rice",
    type: "Standard Rice Processing",
    status: "running",
    capacity: "3000 kg/hour",
    current_output: "2700 kg/hour",
    efficiency: 90.0,
    shift: "Day Shift",
    operator: "Fatima Ali",
    last_maintenance: "2024-04-18",
    next_maintenance: "2024-05-18",
  },
  {
    id: "3",
    name: "Line C - Parboiled Rice",
    type: "Parboiled Processing",
    status: "maintenance",
    capacity: "2500 kg/hour",
    current_output: "0 kg/hour",
    efficiency: 0,
    shift: "Maintenance",
    operator: "Maintenance Team",
    last_maintenance: "2024-04-24",
    next_maintenance: "2024-05-24",
  },
  {
    id: "4",
    name: "Line D - Broken Rice",
    type: "Broken Rice Processing",
    status: "idle",
    capacity: "1500 kg/hour",
    current_output: "0 kg/hour",
    efficiency: 0,
    shift: "Night Shift",
    operator: "Muhammad Khan",
    last_maintenance: "2024-04-15",
    next_maintenance: "2024-05-15",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "running":
      return <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Running
      </Badge>
    case "idle":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">
        <Pause className="w-3 h-3 mr-1" />
        Idle
      </Badge>
    case "maintenance":
      return <Badge variant="destructive">
        <Settings className="w-3 h-3 mr-1" />
        Maintenance
      </Badge>
    case "stopped":
      return <Badge variant="secondary">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Stopped
      </Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getEfficiencyColor(efficiency: number) {
  if (efficiency >= 90) return "text-success"
  if (efficiency >= 75) return "text-warning"
  return "text-destructive"
}

export default function ProductionLinesPage() {
  const stats = [
    { 
      title: "Active Lines", 
      value: productionLines.filter(line => line.status === 'running').length, 
      icon: Factory, 
      color: "bg-success" 
    },
    { 
      title: "Total Capacity", 
      value: `${productionLines.reduce((sum, line) => sum + parseInt(line.capacity), 0).toLocaleString()} kg/h`, 
      icon: Zap, 
      color: "bg-primary" 
    },
    { 
      title: "Current Output", 
      value: `${productionLines.reduce((sum, line) => sum + parseInt(line.current_output), 0).toLocaleString()} kg/h`, 
      icon: CheckCircle2, 
      color: "bg-chart-2" 
    },
    { 
      title: "Avg Efficiency", 
      value: `${(productionLines.filter(l => l.status === 'running').reduce((sum, line) => sum + line.efficiency, 0) / productionLines.filter(l => l.status === 'running').length || 0).toFixed(1)}%`, 
      icon: BarChart3, 
      color: "bg-chart-3" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Lines</h1>
          <p className="text-muted-foreground">
            Monitor and manage rice processing production lines
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Shift Schedule
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Production Line
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

      {/* Production Lines Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Production Lines Status</CardTitle>
              <CardDescription>Real-time monitoring of all rice processing lines</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search production lines..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Production Line</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Current Output</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionLines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                        <Factory className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{line.name}</p>
                        <p className="text-sm text-muted-foreground">{line.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(line.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{line.capacity}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{line.current_output}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`font-semibold ${getEfficiencyColor(line.efficiency)}`}>
                      {line.efficiency}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{line.operator}</p>
                      <p className="text-sm text-muted-foreground">{line.shift}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(line.next_maintenance).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Start Line
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Stop Line
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/production/lines/${line.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Maintenance
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/production/lines/${line.id}/edit`}>
                            Edit Settings
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