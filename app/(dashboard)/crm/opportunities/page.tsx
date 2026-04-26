import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Target, TrendingUp, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const opportunities = [
  {
    id: "1",
    name: "Enterprise MIS Implementation",
    customer: "Healthcare Plus",
    value: 120000,
    probability: 80,
    stage: "negotiation",
    close_date: "2024-05-15",
    assigned_to: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Annual Service Contract",
    customer: "Tech Solutions Ltd",
    value: 45000,
    probability: 90,
    stage: "proposal",
    close_date: "2024-05-01",
    assigned_to: "Emily Davis",
  },
  {
    id: "3",
    name: "HR Module Expansion",
    customer: "Acme Corporation",
    value: 35000,
    probability: 60,
    stage: "qualified",
    close_date: "2024-05-30",
    assigned_to: "Alex Turner",
  },
  {
    id: "4",
    name: "Full System Migration",
    customer: "Manufacturing Corp",
    value: 95000,
    probability: 40,
    stage: "contacted",
    close_date: "2024-06-15",
    assigned_to: "Mike Chen",
  },
  {
    id: "5",
    name: "Inventory Management System",
    customer: "Retail Chain Inc",
    value: 65000,
    probability: 25,
    stage: "new",
    close_date: "2024-06-30",
    assigned_to: "Sarah Johnson",
  },
]

const stats = [
  { title: "Total Pipeline", value: "$1.4M", change: "+15%", icon: Target },
  { title: "Weighted Value", value: "$890K", change: "+8%", icon: TrendingUp },
  { title: "Avg Deal Size", value: "$72K", change: "+5%", icon: DollarSign },
  { title: "Win Rate", value: "68%", change: "+3%", icon: Target },
]

function getStageColor(stage: string) {
  const colors: Record<string, string> = {
    new: "bg-muted",
    contacted: "bg-chart-1",
    qualified: "bg-chart-2",
    proposal: "bg-chart-3",
    negotiation: "bg-chart-4",
    won: "bg-success",
    lost: "bg-destructive",
  }
  return colors[stage] || "bg-muted"
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">
            Track deals and opportunities
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/opportunities/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Opportunity
          </Link>
        </Button>
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
                  <p className="text-xs text-success mt-1">{stat.change} vs last month</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Active Opportunities</CardTitle>
          <CardDescription>Deals currently in progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStageColor(opp.stage)}`} />
                    <div>
                      <p className="font-semibold">{opp.name}</p>
                      <p className="text-sm text-muted-foreground">{opp.customer}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/opportunities/${opp.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Stage</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Won</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Mark as Lost
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="font-semibold text-success">
                      {formatCurrency(opp.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Probability</p>
                    <p className="font-semibold">{opp.probability}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Close Date</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(opp.close_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                          {opp.assigned_to.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{opp.assigned_to}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Progress value={opp.probability} className="flex-1 h-2" />
                  <Badge variant="outline" className="capitalize">
                    {opp.stage}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
