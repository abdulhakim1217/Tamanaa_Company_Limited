import { sql } from "@/lib/db"
import type { 
  User, 
  Department, 
  Role, 
  LeaveRequest, 
  Attendance, 
  Payroll,
  Account,
  Transaction,
  Invoice,
  Budget,
  Product,
  Category,
  Supplier,
  Customer,
  Lead,
  Task,
  Comment,
  Notification,
  ActivityLog
} from "@/lib/db"

// =====================================================
// USER MANAGEMENT
// =====================================================

export async function getUsers() {
  return await sql`
    SELECT u.*, d.name as department_name, r.name as role_name 
    FROM users u 
    LEFT JOIN departments d ON u.department_id = d.id 
    LEFT JOIN roles r ON u.role_id = r.id 
    ORDER BY u.created_at DESC
  `
}

export async function getUserById(id: string) {
  const result = await sql`
    SELECT u.*, d.name as department_name, r.name as role_name 
    FROM users u 
    LEFT JOIN departments d ON u.department_id = d.id 
    LEFT JOIN roles r ON u.role_id = r.id 
    WHERE u.id = ${id}
  `
  return result[0] || null
}

export async function createUser(userData: Partial<User>) {
  return await sql`
    INSERT INTO users (
      id, email, first_name, last_name, phone, department_id, 
      role_id, job_title, hire_date, status
    ) VALUES (
      ${userData.id}, ${userData.email}, ${userData.first_name}, 
      ${userData.last_name}, ${userData.phone}, ${userData.department_id},
      ${userData.role_id}, ${userData.job_title}, ${userData.hire_date}, 
      ${userData.status || 'active'}
    ) RETURNING *
  `
}

export async function updateUser(id: string, userData: Partial<User>) {
  return await sql`
    UPDATE users SET
      first_name = COALESCE(${userData.first_name}, first_name),
      last_name = COALESCE(${userData.last_name}, last_name),
      phone = COALESCE(${userData.phone}, phone),
      department_id = COALESCE(${userData.department_id}, department_id),
      role_id = COALESCE(${userData.role_id}, role_id),
      job_title = COALESCE(${userData.job_title}, job_title),
      hire_date = COALESCE(${userData.hire_date}, hire_date),
      status = COALESCE(${userData.status}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
}

// =====================================================
// DEPARTMENTS
// =====================================================

export async function getDepartments() {
  return await sql`
    SELECT d.*, 
           COUNT(u.id) as employee_count,
           pd.name as parent_name
    FROM departments d 
    LEFT JOIN users u ON d.id = u.department_id AND u.status = 'active'
    LEFT JOIN departments pd ON d.parent_id = pd.id
    GROUP BY d.id, pd.name
    ORDER BY d.name
  `
}

export async function createDepartment(data: Partial<Department>) {
  return await sql`
    INSERT INTO departments (name, description, parent_id)
    VALUES (${data.name}, ${data.description}, ${data.parent_id})
    RETURNING *
  `
}

// =====================================================
// ROLES
// =====================================================

export async function getRoles() {
  return await sql`
    SELECT r.*, COUNT(u.id) as user_count
    FROM roles r 
    LEFT JOIN users u ON r.id = u.role_id AND u.status = 'active'
    GROUP BY r.id
    ORDER BY r.name
  `
}

// =====================================================
// HR FUNCTIONS
// =====================================================

export async function getLeaveRequests(userId?: string) {
  const query = userId 
    ? sql`
        SELECT lr.*, 
               u.first_name || ' ' || u.last_name as employee_name,
               au.first_name || ' ' || au.last_name as approved_by_name
        FROM leave_requests lr
        JOIN users u ON lr.user_id = u.id
        LEFT JOIN users au ON lr.approved_by = au.id
        WHERE lr.user_id = ${userId}
        ORDER BY lr.created_at DESC
      `
    : sql`
        SELECT lr.*, 
               u.first_name || ' ' || u.last_name as employee_name,
               au.first_name || ' ' || au.last_name as approved_by_name
        FROM leave_requests lr
        JOIN users u ON lr.user_id = u.id
        LEFT JOIN users au ON lr.approved_by = au.id
        ORDER BY lr.created_at DESC
      `
  
  return await query
}

export async function createLeaveRequest(data: Partial<LeaveRequest>) {
  return await sql`
    INSERT INTO leave_requests (
      user_id, leave_type, start_date, end_date, reason
    ) VALUES (
      ${data.user_id}, ${data.leave_type}, ${data.start_date}, 
      ${data.end_date}, ${data.reason}
    ) RETURNING *
  `
}

export async function updateLeaveRequestStatus(
  id: string, 
  status: string, 
  approvedBy?: string
) {
  return await sql`
    UPDATE leave_requests SET
      status = ${status},
      approved_by = ${approvedBy},
      approved_at = ${status === 'approved' ? sql`NOW()` : null},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
}

export async function getAttendance(userId?: string, date?: string) {
  let query = sql`
    SELECT a.*, u.first_name || ' ' || u.last_name as employee_name
    FROM attendance a
    JOIN users u ON a.user_id = u.id
  `
  
  const conditions = []
  if (userId) conditions.push(sql`a.user_id = ${userId}`)
  if (date) conditions.push(sql`a.date = ${date}`)
  
  if (conditions.length > 0) {
    query = sql`${query} WHERE ${sql.join(conditions, sql` AND `)}`
  }
  
  query = sql`${query} ORDER BY a.date DESC, u.first_name`
  
  return await query
}

// =====================================================
// FINANCE FUNCTIONS
// =====================================================

export async function getAccounts() {
  return await sql`
    SELECT a.*, 
           pa.name as parent_name,
           COALESCE(SUM(jl.debit - jl.credit), 0) as balance
    FROM accounts a
    LEFT JOIN accounts pa ON a.parent_id = pa.id
    LEFT JOIN journal_lines jl ON a.id = jl.account_id
    WHERE a.is_active = true
    GROUP BY a.id, pa.name
    ORDER BY a.code
  `
}

export async function createAccount(data: Partial<Account>) {
  return await sql`
    INSERT INTO accounts (code, name, type, parent_id, description)
    VALUES (${data.account_number}, ${data.name}, ${data.account_type}, 
            ${data.parent_id}, ${data.description})
    RETURNING *
  `
}

export async function getInvoices() {
  return await sql`
    SELECT i.*, 
           CASE 
             WHEN i.contact_type = 'customer' THEN c.company_name
             WHEN i.contact_type = 'vendor' THEN v.company_name
           END as contact_name
    FROM invoices i
    LEFT JOIN customers c ON i.contact_id = c.id AND i.contact_type = 'customer'
    LEFT JOIN vendors v ON i.contact_id = v.id AND i.contact_type = 'vendor'
    ORDER BY i.created_at DESC
  `
}

// =====================================================
// INVENTORY FUNCTIONS
// =====================================================

export async function getProducts() {
  return await sql`
    SELECT p.*, 
           pc.name as category_name,
           COALESCE(SUM(i.quantity), 0) as total_stock
    FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.id
    LEFT JOIN inventory i ON p.id = i.product_id
    WHERE p.is_active = true
    GROUP BY p.id, pc.name
    ORDER BY p.name
  `
}

export async function createProduct(data: Partial<Product>) {
  return await sql`
    INSERT INTO products (
      sku, name, description, category_id, unit, 
      cost_price, sell_price, reorder_level
    ) VALUES (
      ${data.sku}, ${data.name}, ${data.description}, 
      ${data.category_id}, ${data.unit || 'piece'}, 
      ${data.cost_price}, ${data.unit_price}, ${data.reorder_level}
    ) RETURNING *
  `
}

export async function getProductCategories() {
  return await sql`
    SELECT pc.*, 
           COUNT(p.id) as product_count,
           ppc.name as parent_name
    FROM product_categories pc
    LEFT JOIN products p ON pc.id = p.category_id AND p.is_active = true
    LEFT JOIN product_categories ppc ON pc.parent_id = ppc.id
    GROUP BY pc.id, ppc.name
    ORDER BY pc.name
  `
}

export async function getSuppliers() {
  return await sql`
    SELECT v.*, COUNT(p.id) as product_count
    FROM vendors v
    LEFT JOIN products p ON v.id = p.supplier_id AND p.is_active = true
    WHERE v.is_active = true
    GROUP BY v.id
    ORDER BY v.company_name
  `
}

// =====================================================
// CRM FUNCTIONS
// =====================================================

export async function getCustomers() {
  return await sql`
    SELECT c.*, 
           u.first_name || ' ' || u.last_name as assigned_to_name,
           COUNT(d.id) as deal_count
    FROM customers c
    LEFT JOIN users u ON c.assigned_to = u.id
    LEFT JOIN deals d ON c.id = d.customer_id
    GROUP BY c.id, u.first_name, u.last_name
    ORDER BY c.created_at DESC
  `
}

export async function createCustomer(data: Partial<Customer>) {
  return await sql`
    INSERT INTO customers (
      company_name, contact_name, email, phone, address, 
      city, country, type, assigned_to, notes
    ) VALUES (
      ${data.company}, ${data.name}, ${data.email}, ${data.phone}, 
      ${data.address}, ${data.city}, ${data.country}, 
      ${data.customer_type || 'lead'}, ${data.assigned_to}, ${data.notes}
    ) RETURNING *
  `
}

export async function getDeals() {
  return await sql`
    SELECT d.*, 
           c.company_name as customer_name,
           u.first_name || ' ' || u.last_name as assigned_to_name
    FROM deals d
    JOIN customers c ON d.customer_id = c.id
    LEFT JOIN users u ON d.assigned_to = u.id
    ORDER BY d.created_at DESC
  `
}

// =====================================================
// DASHBOARD STATS
// =====================================================

export async function getDashboardStats() {
  const [employeeStats, revenueStats, productStats, leadStats] = await Promise.all([
    sql`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = 'active') as active FROM users`,
    sql`SELECT COALESCE(SUM(total), 0) as total FROM invoices WHERE status = 'paid' AND date >= date_trunc('month', CURRENT_DATE)`,
    sql`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE (SELECT SUM(quantity) FROM inventory WHERE product_id = products.id) <= reorder_level) as low_stock FROM products WHERE is_active = true`,
    sql`SELECT COUNT(*) as total FROM customers WHERE type = 'lead'`
  ])

  return {
    employees: employeeStats[0],
    revenue: revenueStats[0],
    products: productStats[0],
    leads: leadStats[0]
  }
}

// =====================================================
// TASKS & NOTIFICATIONS
// =====================================================

export async function getTasks(userId?: string) {
  const query = userId 
    ? sql`
        SELECT t.*, 
               u.first_name || ' ' || u.last_name as assigned_to_name,
               au.first_name || ' ' || au.last_name as assigned_by_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        LEFT JOIN users au ON t.assigned_by = au.id
        WHERE t.assigned_to = ${userId}
        ORDER BY t.due_date ASC NULLS LAST, t.created_at DESC
      `
    : sql`
        SELECT t.*, 
               u.first_name || ' ' || u.last_name as assigned_to_name,
               au.first_name || ' ' || au.last_name as assigned_by_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        LEFT JOIN users au ON t.assigned_by = au.id
        ORDER BY t.due_date ASC NULLS LAST, t.created_at DESC
      `
  
  return await query
}

export async function createTask(data: Partial<Task>) {
  return await sql`
    INSERT INTO tasks (
      title, description, assigned_to, assigned_by, 
      priority, due_date, entity_type, entity_id
    ) VALUES (
      ${data.title}, ${data.description}, ${data.assigned_to}, 
      ${data.created_by}, ${data.priority || 'medium'}, 
      ${data.due_date}, ${data.entity_type}, ${data.entity_id}
    ) RETURNING *
  `
}

export async function getNotifications(userId: string) {
  return await sql`
    SELECT * FROM notifications 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT 50
  `
}

export async function markNotificationAsRead(id: string) {
  return await sql`
    UPDATE notifications SET 
      is_read = true, 
      read_at = NOW() 
    WHERE id = ${id}
    RETURNING *
  `
}