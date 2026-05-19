import { NextRequest, NextResponse } from "next/server"

// Mock employees data for standalone mode
const mockEmployees = [
  {
    id: "1",
    first_name: "Ahmad",
    last_name: "Hassan",
    email: "ahmad.hassan@tamanaa.com",
    department: "Production",
    position: "Production Manager",
    hire_date: "2023-01-15",
    salary: 45000,
    is_active: true,
  },
  {
    id: "2",
    first_name: "Fatima",
    last_name: "Ali",
    email: "fatima.ali@tamanaa.com",
    department: "Quality Control",
    position: "Quality Inspector",
    hire_date: "2023-03-20",
    salary: 38000,
    is_active: true,
  },
  {
    id: "3",
    first_name: "Muhammad",
    last_name: "Khan",
    email: "muhammad.khan@tamanaa.com",
    department: "Inventory",
    position: "Warehouse Supervisor",
    hire_date: "2023-02-10",
    salary: 42000,
    is_active: true,
  },
]

export async function GET() {
  try {
    // In standalone mode, return mock data
    console.log("API: Returning mock employees data")
    return NextResponse.json(mockEmployees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In standalone mode, simulate creating an employee
    const newEmployee = {
      id: String(mockEmployees.length + 1),
      ...body,
      hire_date: new Date().toISOString().split('T')[0],
      is_active: true,
    }
    
    console.log("API: Simulating employee creation:", newEmployee)
    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    )
  }
}