import { neon } from "@neondatabase/serverless"

// Make database optional - use mock data if not configured
if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL not set - using mock data mode")
}

// Create a mock sql function for when database is not configured
const mockSql = async (strings: TemplateStringsArray, ...values: any[]) => {
  console.log("Mock SQL query (no database configured)")
  return []
}

export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL)
  : mockSql as any

// Type definitions for database tables
export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  department_id?: string
  role_id?: string
  job_title?: string
  hire_date?: string
  status?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface Department {
  id: string
  name: string
  description?: string
  parent_id?: string
  created_at?: string
  updated_at?: string
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions?: any
  created_at?: string
}

export interface LeaveRequest {
  id: string
  user_id: string
  leave_type: string
  start_date: string
  end_date: string
  reason?: string
  status: string
  approved_by?: string
  approved_at?: string
  created_at?: string
  updated_at?: string
}

export interface Attendance {
  id: string
  user_id: string
  date: string
  check_in?: string
  check_out?: string
  status: string
  notes?: string
  created_at?: string
}

export interface Payroll {
  id: string
  user_id: string
  month: number
  year: number
  basic_salary: number
  allowances?: number
  deductions?: number
  net_salary: number
  status: string
  paid_at?: string
  created_at?: string
}

export interface Account {
  id: string
  code: string
  name: string
  account_type: string
  parent_id?: string
  description?: string
  is_active: boolean
  created_at?: string
}

export interface Transaction {
  id: string
  transaction_date: string
  description?: string
  amount: number
  transaction_type: string
  account_id: string
  reference_type?: string
  reference_id?: string
  created_by?: string
  created_at?: string
}

export interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
  invoice_date: string
  due_date?: string
  subtotal: number
  tax_amount?: number
  total_amount: number
  status: string
  paid_amount?: number
  notes?: string
  created_by?: string
  created_at?: string
  updated_at?: string
}

export interface Budget {
  id: string
  name: string
  amount: number
  period: string
  department_id?: string
  created_at?: string
}

export interface Product {
  id: string
  sku: string
  name: string
  description?: string
  category_id?: string
  supplier_id?: string
  unit: string
  cost_price?: number
  unit_price?: number
  reorder_level?: number
  quality_grade?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parent_id?: string
  created_at?: string
}

export interface Supplier {
  id: string
  company_name: string
  contact_name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  payment_terms?: string
  rating?: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Customer {
  id: string
  company: string
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  customer_type: string
  assigned_to?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface Lead {
  id: string
  company_name: string
  contact_name: string
  email?: string
  phone?: string
  source?: string
  status: string
  assigned_to?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  assigned_to?: string
  created_by?: string
  priority: string
  status: string
  due_date?: string
  entity_type?: string
  entity_id?: string
  created_at?: string
  updated_at?: string
}

export interface Comment {
  id: string
  entity_type: string
  entity_id: string
  user_id: string
  content: string
  created_at?: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message?: string
  type?: string
  is_read: boolean
  read_at?: string
  entity_type?: string
  entity_id?: string
  created_at?: string
}

export interface ActivityLog {
  id: string
  user_id?: string
  action: string
  entity_type?: string
  entity_id?: string
  details?: any
  ip_address?: string
  created_at?: string
}
