import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, UserPlus, TrendingUp, Users } from "lucide-react"

const leads = [
  {
    id: 1,
    company: "New Retail Chain",
    contact: "Ali Hassan",
    source: "Website Inquiry",
    status: "new",
    value: 500000,
    created: "2024-04-24",
  },
  {
    id: 2,
    company: "Export Company Ltd",
    contact: "Sarah Ahmed",
    source: "Trade Fair",
    status: "contacted",
    value: 2000000,
    created: "2024-04-22",
  },
  {
    id: 3,
    company: "Local Distributor",
    contact: "Muhammad Khan",
    source: "Referral",
    status: "qualified",
    value: 800000,
    created: "2024-04-20",
  },
]

function getStatusBadge(status: string) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    contacted: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    qualified: "bg-green-500/10 text-green-600 border-green-500/20",
    lost: "bg-red-500/10 text-red-600 border-red-500/20",
  }
  return (
    <Badge variant="outline" className={colors[status] || ""}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage sales leads and prospects
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'qualified').length}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <Users className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(leads.reduce((sum, l) => sum + l.value, 0))}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-2/10">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{lead.company}</CardTitle>
                  <CardDescription>{lead.contact} • {lead.source}</CardDescription>
                </div>
                {getStatusBadge(lead.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(lead.created).toLocaleDateString()}
                </div>
                <div className="text-lg font-semibold">
                  {formatCurrency(lead.value)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}