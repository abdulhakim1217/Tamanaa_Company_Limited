import { getUsers } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Plus, Search, MoreHorizontal, Mail, Phone, Building2 } from "lucide-react"
import Link from "next/link"

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">Active</Badge>
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>
    case "suspended":
      return <Badge variant="destructive">Suspended</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default async function EmployeesPage() {
  // Fetch real data from database
  let employees
  try {
    employees = await getUsers()
  } catch (error) {
    console.error("Error fetching employees:", error)
    // Fallback to mock data if database is not set up
    employees = [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@tamanaa.com",
        phone: "+1 234 567 8901",
        job_title: "Software Engineer",
        department_name: "Engineering",
        status: "active",
        hire_date: "2023-01-15",
        avatar_url: null,
      },
      {
        id: "2",
        first_name: "Sarah",
        last_name: "Johnson",
        email: "sarah.johnson@tamanaa.com",
        phone: "+1 234 567 8902",
        job_title: "HR Manager",
        department_name: "Human Resources",
        status: "active",
        hire_date: "2022-06-20",
        avatar_url: null,
      },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your organization&apos;s workforce
          </p>
        </div>
        <Button asChild>
          <Link href="/hr/employees/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Employees</CardTitle>
              <CardDescription>{employees.length} total employees</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.first_name[0]}{employee.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {employee.job_title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.department_name || 'No Department'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>
                    {new Date(employee.hire_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
                          <Link href={`/hr/employees/${employee.id}`}>
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/hr/employees/${employee.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
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
