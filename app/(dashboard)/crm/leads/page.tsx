"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, UserPlus, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

const leads = [
  {
    id: "1",
    customer: "Enterprise Solutions",
    source: "Website",
    status: "qualified",
    estimated_value: 85000,
    assigned_to: "Emily Davis",
    created_at: "2024-04-20",
    notes: "Interested in full MIS implementation",
  },
  {
    id: "2",
    customer: "Digital Agency Co",
    source: "Referral",
    status: "proposal",
    estimated_value: 45000,
    assigned_to: "Alex Turner",
    created_at: "2024-04-18",
    notes: "Proposal sent, awaiting response",
  },
  {
    id: "3",
    customer: "Healthcare Plus",
    source: "Trade Show",
    status: "negotiation",
    estimated_value: 120000,
    assigned_to: "Sarah Johnson",
    created_at: "2024-04-15",
    notes: "In final negotiations",
  },
  {
    id: "4",
    customer: "Retail Chain Inc",
    source: "Cold Call",
    status: "new",
    estimated_value: 65000,
    assigned_to: "Mike Chen",
    created_at: "2024-04-24",
    notes: "Initial contact made",
  },
  {
    id: "5",
    customer: "Manufacturing Corp",
    source: "LinkedIn",
    status: "contacted",
    estimated_value: 95000,
    assigned_to: "Emily Davis",
    created_at: "2024-04-22",
    notes: "Demo scheduled for next week",
  },
]

const pipelineStages = [
  { stage: "New", count: 12, value: 280000, color: "bg-muted" },
  { stage: "Contacted", count: 8, value: 195000, color: "bg-chart-1" },
  { stage: "Qualified", count: 15, value: 420000, color: "bg-chart-2" },
  { stage: "Proposal", count: 6, value: 185000, color: "bg-chart-3" },
  { stage: "Negotiation", count: 4, value: 320000, color: "bg-chart-4" },
]

function getStatusBadge(status: string) {
  const colors: Record<string, string> = {
    new: "bg-muted text-muted-foreground",
    contacted: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    qualified: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    proposal: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    negotiation: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    won: "bg-success/10 text-success border-success/20",
    lost: "bg-destructive/10 text-destructive border-destructive/20",
  }
  return (
    <Badge variant="outline" className={colors[status] || ""}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function LeadsPage() {
  const totalValue = pipelineStages.reduce((sum, s) => sum + s.value, 0)
  const totalLeads = pipelineStages.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Track and manage your sales pipeline
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/leads/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Link>
        </Button>
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>
            {totalLeads} leads worth {formatCurrency(totalValue)} in pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {pipelineStages.map((stage, index) => (
              <div key={stage.stage} className="flex-1 relative">
                <div className={`p-4 rounded-lg ${stage.color}/10 border border-${stage.color.replace("bg-", "")}/20`}>
                  <p className="text-sm font-medium">{stage.stage}</p>
                  <p className="text-2xl font-bold mt-1">{stage.count}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(stage.value)}
                  </p>
                </div>
                {index < pipelineStages.length - 1 && (
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-muted-foreground z-10" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Active Leads</CardTitle>
              <CardDescription>Leads in your pipeline</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {lead.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{lead.customer}</p>
                    <p className="text-sm text-muted-foreground">{lead.notes}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Badge variant="outline">{lead.source}</Badge>
                  </div>
                  <div className="text-center">
                    {getStatusBadge(lead.status)}
                  </div>
                  <div className="text-right min-w-[100px]">
                    <div className="flex items-center gap-1 text-success">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">
                        {formatCurrency(lead.estimated_value)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {lead.assigned_to.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {lead.assigned_to}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/leads/${lead.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                      <DropdownMenuItem>Convert to Customer</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Mark as Lost
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
