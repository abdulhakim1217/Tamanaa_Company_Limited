import { getDepartments } from "@/lib/database"
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
import { Plus, Search, MoreHorizontal, Building2, Users } from "lucide-react"
import Link from "next/link"

export default async function DepartmentsPage() {
  // Fetch real data from database
  let departments
  try {
    departments = await getDepartments()
  } catch (error) {
    console.error("Error fetching departments:", error)
    // Fallback to mock data if database is not set up
    departments = [
      {
        id: "1",
        name: "Human Resources",
        description: "HR and people operations",
        employee_count: 8,
        parent_name: null,
      },
      {
        id: "2",
        name: "Finance",
        description: "Financial planning and accounting",
        employee_count: 12,
        parent_name: null,
      },
      {
        id: "3",
        name: "Sales",
        description: "Sales and business development",
        employee_count: 25,
        parent_name: null,
      },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Manage organizational departments and structure
          </p>
        </div>
        <Button asChild>
          <Link href="/hr/departments/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Departments</CardTitle>
              <CardDescription>{departments.length} departments configured</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search departments..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Parent Department</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department: any) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{department.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">
                      {department.description || 'No description'}
                    </p>
                  </TableCell>
                  <TableCell>
                    {department.parent_name ? (
                      <Badge variant="outline">{department.parent_name}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Root Department</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{department.employee_count}</span>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/hr/departments/${department.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/hr/departments/${department.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
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