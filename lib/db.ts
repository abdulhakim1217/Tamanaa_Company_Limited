import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Type definitions for database entities
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  department_id?: string
  role_id?: string
  job_title?: string
  hire_date?: string
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  description?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Record<string, boolean>
  created_at: string
}

export interface LeaveRequest {
  id: string
  user_id: string
  leave_type: "annual" | "sick" | "personal" | "maternity" | "paternity" | "unpaid"
  start_date: string
  end_date: string
  reason?: string
  status: "pending" | "approved" | "rejected" | "cancelled"
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

export interface Attendance {
  id: string
  user_id: string
  date: string
  check_in?: string
  check_out?: string
  status: "present" | "absent" | "late" | "half_day" | "remote"
  notes?: string
  created_at: string
}

export interface Payroll {
  id: string
  user_id: string
  period_start: string
  period_end: string
  base_salary: number
  bonuses: number
  deductions: number
  net_salary: number
  status: "pending" | "processed" | "paid"
  paid_at?: string
  created_at: string
}

export interface Account {
  id: string
  name: string
  account_type: "asset" | "liability" | "equity" | "revenue" | "expense"
  account_number?: string
  balance: number
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  account_id: string
  transaction_type: "credit" | "debit"
  amount: number
  description?: string
  reference_number?: string
  transaction_date: string
  created_by?: string
  created_at: string
}

export interface Invoice {
  id: string
  invoice_number: string
  customer_id?: string
  vendor_id?: string
  invoice_type: "sales" | "purchase"
  subtotal: number
  tax_amount: number
  total_amount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  due_date?: string
  issue_date: string
  paid_at?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Budget {
  id: string
  name: string
  department_id?: string
  fiscal_year: number
  allocated_amount: number
  spent_amount: number
  status: "active" | "closed" | "exceeded"
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  sku: string
  name: string
  description?: string
  category_id?: string
  unit_price: number
  cost_price: number
  quantity_in_stock: number
  reorder_level: number
  supplier_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parent_id?: string
  created_at: string
}

export interface Supplier {
  id: string
  name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  payment_terms?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  address?: string
  customer_type: "individual" | "business"
  status: "active" | "inactive" | "lead"
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  customer_id: string
  source?: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost"
  estimated_value?: number
  notes?: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  assigned_to?: string
  created_by?: string
  due_date?: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in_progress" | "completed" | "cancelled"
  entity_type?: string
  entity_id?: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  content: string
  user_id: string
  entity_type: string
  entity_id: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  notification_type: "info" | "warning" | "success" | "error"
  is_read: boolean
  link?: string
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id?: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id?: string
  channel_id?: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Channel {
  id: string
  name: string
  description?: string
  channel_type: "department" | "project" | "direct"
  created_by?: string
  created_at: string
}
