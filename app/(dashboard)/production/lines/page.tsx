'use client'

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
import { Plus, Search, MoreHorizontal, Factory, Zap, AlertTriangle, CheckCircle2, Clock, Pause, Play, Settings, Activity, TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/components/ui/use-mobile"

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
      return <Badge className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Running
      </Badge>
    case "idle":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
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

export default function ProductionLinesPage() {
  const isMobile = useIsMobile()

  const mobileCardRender = (item: any, index: number) => (
    <Card key={index} className="p-4">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Factory className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.type}</div>
            </div>
          </div>
          {getStatusBadge(item.status)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Capacity:</span>
            <div className="font-medium">{item.capacity}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Output:</span>
            <div className="font-medium">{item.current_output}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.efficiency > 90 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : item.efficiency > 70 ? (
              <BarChart3 className="w-4 h-4 text-yellow-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            )}
            <span className={item.efficiency > 90 ? "text-green-600" : item.efficiency > 70 ? "text-yellow-600" : "text-red-600"}>
              {item.efficiency}% Efficiency
            </span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                {item.status === "running" ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Stop Line
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Line
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Production Lines</h1>
          <p className="text-muted-foreground">
            Monitor and manage rice processing production lines
          </p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/production/lines/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Production Line
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lines</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Output</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,550 kg/h</div>
            <p className="text-xs text-muted-foreground">
              +12% from last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Line C scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Production Lines Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Production Lines</CardTitle>
              <CardDescription>
                Current status and performance of all production lines
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lines..."
                  className="pl-8 w-full md:w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {productionLines.map((item, index) => mobileCardRender(item, index))}
            </div>
          ) : (
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productionLines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                          <Factory className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{line.name}</div>
                          <div className="text-sm text-muted-foreground">{line.type}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(line.status)}
                    </TableCell>
                    <TableCell>{line.capacity}</TableCell>
                    <TableCell>{line.current_output}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {line.efficiency > 90 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : line.efficiency > 70 ? (
                            <BarChart3 className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                          <span className={line.efficiency > 90 ? "text-green-600" : line.efficiency > 70 ? "text-yellow-600" : "text-red-600"}>
                            {line.efficiency}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{line.operator}</TableCell>
                    <TableCell>{line.next_maintenance}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Activity className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {line.status === "running" ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Stop Line
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Start Line
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}