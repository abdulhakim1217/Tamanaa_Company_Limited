import { getAttendance } from "@/lib/database"
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
import { Calendar, Clock, Users, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

function getStatusBadge(status: string) {
  switch (status) {
    case "present":
      return <Badge className="bg-success/10 text-success border-success/20">Present</Badge>
    case "absent":
      return <Badge variant="destructive">Absent</Badge>
    case "late":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">Late</Badge>
    case "half_day":
      return <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Half Day</Badge>
    case "remote":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Remote</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default async function AttendancePage() {
  // Get today's date for filtering
  const today = new Date().toISOString().split('T')[0]
  
  // Fetch real data from database
  let attendanceRecords
  try {
    attendanceRecords = await getAttendance(undefined, today)
  } catch (error) {
    console.error("Error fetching attendance:", error)
    // Fallback to mock data if database is not set up
    attendanceRecords = [
      {
        id: "1",
        employee_name: "John Doe",
        date: today,
        check_in: "2024-04-24T09:00:00Z",
        check_out: "2024-04-24T17:30:00Z",
        status: "present",
        notes: null,
      },
      {
        id: "2",
        employee_name: "Sarah Johnson",
        date: today,
        check_in: "2024-04-24T09:15:00Z",
        check_out: null,
        status: "late",
        notes: "Traffic delay",
      },
      {
        id: "3",
        employee_name: "Mike Chen",
        date: today,
        check_in: null,
        check_out: null,
        status: "remote",
        notes: "Working from home",
      },
    ]
  }

  const stats = [
    { 
      title: "Present Today", 
      value: attendanceRecords.filter((r: any) => r.status === 'present').length, 
      icon: CheckCircle2, 
      color: "bg-success" 
    },
    { 
      title: "Late Arrivals", 
      value: attendanceRecords.filter((r: any) => r.status === 'late').length, 
      icon: AlertTriangle, 
      color: "bg-warning" 
    },
    { 
      title: "Absent", 
      value: attendanceRecords.filter((r: any) => r.status === 'absent').length, 
      icon: XCircle, 
      color: "bg-destructive" 
    },
    { 
      title: "Remote Work", 
      value: attendanceRecords.filter((r: any) => r.status === 'remote').length, 
      icon: Users, 
      color: "bg-primary" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track employee attendance and working hours
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Button>
            <Clock className="w-4 h-4 mr-2" />
            Clock In/Out
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

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Today&apos;s Attendance</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Input
                type="search"
                placeholder="Search employees..."
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
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record: any) => {
                const checkIn = record.check_in ? new Date(record.check_in) : null
                const checkOut = record.check_out ? new Date(record.check_out) : null
                const hoursWorked = checkIn && checkOut 
                  ? ((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60)).toFixed(1)
                  : null

                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {record.employee_name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{record.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {checkIn ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">
                            {checkIn.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not checked in</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {checkOut ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">
                            {checkOut.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      ) : checkIn ? (
                        <span className="text-sm text-muted-foreground">Still working</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {hoursWorked ? (
                        <span className="font-medium">{hoursWorked}h</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {record.notes || '-'}
                      </span>
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