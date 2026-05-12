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
import { Plus, Search, MoreHorizontal, Target, TrendingUp, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

function getStageBadge(stage: string) {
  switch (stage) {
    case "qualification":
      return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Qualification</Badge>
    case "proposal":
      return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Proposal</Badge>
    case "negotiation":
      return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Negotiation</Badge>
    case "closed-won":
      return <Badge className="bg-success/10 text-success border-success/20">Closed Won</Badge>
    case "closed-lost":
      return <Badge variant="destructive">Closed Lost</Badge>
    default:
      return <Badge variant="outline">{stage}</Badge>
  }
}

export default function OpportunitiesPage() {
  // Mock data for opportunities
  const opportunities = [
    {
      id: "1",
      title: "Basmati Rice Supply - 500 Tons",
      customer: "Al-Noor Trading Co.",
      value: 12500000,
      stage: "negotiation",
      probability: 75,
      expected_close: "2024-04-15",
      owner: "Ahmed Khan",
    },
    {
      id: "2",
      title: "IRRI-6 Bulk Order - 1000 Tons",
      customer: "Metro Wholesale",
      value: 18000000,
      stage: "proposal",
      probability: 60,
      expected_close: "2024-04-30",
      owner: "Fatima Ali",
    },
    {
      id: "3",
      title: "Premium Basmati Export",
      customer: "Gulf Foods LLC",
      value: 25000000,
      stage: "qualification",
      probability: 40,
      expected_close: "2024-05-20",
      owner: "Hassan Raza",
    },
    {
      id: "4",
      title: "Parboiled Rice Contract",
      customer: "City Supermarkets",
      value: 8500000,
      stage: "closed-won",
      probability: 100,
      expected_close: "2024-03-25",
      owner: "Ayesha Malik",
    },
  ]

  const stats = [
    { 
      title: "Total Pipeline", 
      value: `GH₵ ${(opportunities.reduce((sum, o) => sum + o.value, 0) / 1000000).toFixed(1)}M`, 
      icon: Target, 
      color: "bg-primary" 
    },
    { 
      title: "Active Deals", 
      value: opportunities.filter(o => !o.stage.includes("closed")).length, 
      icon: TrendingUp, 
      color: "bg-chart-2" 
    },
    { 
      title: "Closing This Month", 
      value: opportunities.filter(o => new Date(o.expected_close).getMonth() === 3).length, 
      icon: Clock, 
      color: "bg-warning" 
    },
    { 
      title: "Won This Quarter", 
      value: opportunities.filter(o => o.stage === "closed-won").length, 
      icon: DollarSign, 
      color: "bg-success" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Opportunities</h1>
          <p className="text-muted-foreground">
            Track and manage your rice sales pipeline
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/opportunities/new">
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
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
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Opportunities Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Opportunities</CardTitle>
              <CardDescription>{opportunities.length} active deals in pipeline</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Expected Close</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell>
                    <div className="font-medium">{opportunity.title}</div>
                  </TableCell>
                  <TableCell>{opportunity.customer}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                      GH₵ {(opportunity.value / 1000000).toFixed(2)}M
                    </span>
                  </TableCell>
                  <TableCell>{getStageBadge(opportunity.stage)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${opportunity.probability}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{opportunity.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(opportunity.expected_close).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{opportunity.owner}</span>
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
                          <Link href={`/crm/opportunities/${opportunity.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/crm/opportunities/${opportunity.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Move Stage</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
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
