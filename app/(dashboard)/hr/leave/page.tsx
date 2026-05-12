import { getLeaveRequests } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Plus, Search, MoreHorizontal, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    case "cancelled":
      return <Badge variant="secondary">Cancelled</Badge>
    default:
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Pending</Badge>
  }
}

function getLeaveTypeBadge(type: string) {
  const colors: Record<string, string> = {
    annual: "bg-primary/10 text-primary border-primary/20",
    sick: "bg-destructive/10 text-destructive border-destructive/20",
    personal: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    maternity: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    paternity: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    unpaid: "bg-muted text-muted-foreground border-muted",
  }
  return (
    <Badge variant="outline" className={colors[type] || ""}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  )
}

export default async function LeaveRequestsPage() {
  // Fetch real data from database
  let leaveRequests
  try {
    leaveRequests = await getLeaveRequests()
  } catch (error) {
    console.error("Error fetching leave requests:", error)
    // Fallback to mock data if database is not set up
    leaveRequests = [
      {
        id: "1",
        employee_name: "John Doe",
        leave_type: "annual",
        start_date: "2024-05-01",
        end_date: "2024-05-05",
        status: "pending",
        reason: "Family vacation",
        created_at: "2024-04-20T10:00:00Z",
      },
      {
        id: "2",
        employee_name: "Sarah Johnson",
        leave_type: "sick",
        start_date: "2024-04-25",
        end_date: "2024-04-26",
        status: "approved",
        reason: "Medical appointment",
        approved_by_name: "HR Manager",
        created_at: "2024-04-22T14:30:00Z",
      },
    ]
  }

  const stats = [
    { title: "Pending Requests", value: leaveRequests.filter((r: any) => r.status === 'pending').length, icon: Clock },
    { title: "Approved This Month", value: leaveRequests.filter((r: any) => r.status === 'approved').length, icon: CheckCircle2 },
    { title: "Rejected This Month", value: leaveRequests.filter((r: any) => r.status === 'rejected').length, icon: XCircle },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground">
            Manage employee leave requests and approvals
          </p>
        </div>
        <Button asChild>
          <Link href="/hr/leave/new">
            <Plus className="w-4 h-4 mr-2" />
            Request Leave
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Leave Requests</CardTitle>
              <CardDescription>{leaveRequests.length} requests total</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request: any) => {
                const startDate = new Date(request.start_date)
                const endDate = new Date(request.end_date)
                const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {request.employee_name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.employee_name}</p>
                          {request.reason && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {request.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getLeaveTypeBadge(request.leave_type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>
                          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{duration} day{duration !== 1 ? 's' : ''}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.created_at).toLocaleDateString()}
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
                            <Link href={`/hr/leave/${request.id}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {request.status === 'pending' && (
                            <>
                              <DropdownMenuItem className="text-success">
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}