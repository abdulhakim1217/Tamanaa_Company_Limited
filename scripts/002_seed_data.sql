-- Tamanaa Company MIS - Seed Data
-- This script populates initial data for the system

-- =====================================================
-- DEPARTMENTS
-- =====================================================

INSERT INTO departments (id, name, description) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Executive', 'Executive leadership and management'),
  ('d1000000-0000-0000-0000-000000000002', 'Human Resources', 'HR and people operations'),
  ('d1000000-0000-0000-0000-000000000003', 'Finance', 'Financial planning, accounting, and reporting'),
  ('d1000000-0000-0000-0000-000000000004', 'Sales', 'Sales and business development'),
  ('d1000000-0000-0000-0000-000000000005', 'Operations', 'Day-to-day operations and logistics'),
  ('d1000000-0000-0000-0000-000000000006', 'Marketing', 'Marketing and communications'),
  ('d1000000-0000-0000-0000-000000000007', 'IT', 'Information technology and systems')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- ROLES
-- =====================================================

INSERT INTO roles (id, name, description, permissions) VALUES
  ('r1000000-0000-0000-0000-000000000001', 'Admin', 'Full system administrator', '{"all": true}'),
  ('r1000000-0000-0000-0000-000000000002', 'Manager', 'Department manager with approval rights', '{"hr": {"view": true, "approve": true}, "finance": {"view": true}, "inventory": {"view": true, "edit": true}, "crm": {"view": true, "edit": true}}'),
  ('r1000000-0000-0000-0000-000000000003', 'HR Staff', 'Human resources team member', '{"hr": {"view": true, "edit": true, "approve": false}}'),
  ('r1000000-0000-0000-0000-000000000004', 'Finance Staff', 'Finance team member', '{"finance": {"view": true, "edit": true}}'),
  ('r1000000-0000-0000-0000-000000000005', 'Sales Rep', 'Sales representative', '{"crm": {"view": true, "edit": true}}'),
  ('r1000000-0000-0000-0000-000000000006', 'Warehouse Staff', 'Inventory and warehouse team', '{"inventory": {"view": true, "edit": true}}'),
  ('r1000000-0000-0000-0000-000000000007', 'Employee', 'Standard employee access', '{"hr": {"view_own": true}}')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- CHART OF ACCOUNTS
-- =====================================================

INSERT INTO accounts (id, code, name, type, description) VALUES
  -- Assets
  ('a1000000-0000-0000-0000-000000000001', '1000', 'Assets', 'asset', 'Total assets'),
  ('a1000000-0000-0000-0000-000000000002', '1100', 'Cash and Bank', 'asset', 'Cash and bank accounts'),
  ('a1000000-0000-0000-0000-000000000003', '1110', 'Cash on Hand', 'asset', 'Petty cash'),
  ('a1000000-0000-0000-0000-000000000004', '1120', 'Bank Account', 'asset', 'Main bank account'),
  ('a1000000-0000-0000-0000-000000000005', '1200', 'Accounts Receivable', 'asset', 'Money owed by customers'),
  ('a1000000-0000-0000-0000-000000000006', '1300', 'Inventory', 'asset', 'Stock on hand'),
  ('a1000000-0000-0000-0000-000000000007', '1500', 'Fixed Assets', 'asset', 'Property, plant, equipment'),
  
  -- Liabilities
  ('a1000000-0000-0000-0000-000000000010', '2000', 'Liabilities', 'liability', 'Total liabilities'),
  ('a1000000-0000-0000-0000-000000000011', '2100', 'Accounts Payable', 'liability', 'Money owed to vendors'),
  ('a1000000-0000-0000-0000-000000000012', '2200', 'Accrued Expenses', 'liability', 'Expenses incurred not yet paid'),
  ('a1000000-0000-0000-0000-000000000013', '2300', 'Payroll Liabilities', 'liability', 'Wages and taxes payable'),
  
  -- Equity
  ('a1000000-0000-0000-0000-000000000020', '3000', 'Equity', 'equity', 'Total equity'),
  ('a1000000-0000-0000-0000-000000000021', '3100', 'Share Capital', 'equity', 'Invested capital'),
  ('a1000000-0000-0000-0000-000000000022', '3200', 'Retained Earnings', 'equity', 'Accumulated profits'),
  
  -- Revenue
  ('a1000000-0000-0000-0000-000000000030', '4000', 'Revenue', 'revenue', 'Total revenue'),
  ('a1000000-0000-0000-0000-000000000031', '4100', 'Sales Revenue', 'revenue', 'Revenue from sales'),
  ('a1000000-0000-0000-0000-000000000032', '4200', 'Service Revenue', 'revenue', 'Revenue from services'),
  
  -- Expenses
  ('a1000000-0000-0000-0000-000000000040', '5000', 'Expenses', 'expense', 'Total expenses'),
  ('a1000000-0000-0000-0000-000000000041', '5100', 'Cost of Goods Sold', 'expense', 'Direct product costs'),
  ('a1000000-0000-0000-0000-000000000042', '5200', 'Salaries & Wages', 'expense', 'Employee compensation'),
  ('a1000000-0000-0000-0000-000000000043', '5300', 'Rent Expense', 'expense', 'Office and warehouse rent'),
  ('a1000000-0000-0000-0000-000000000044', '5400', 'Utilities', 'expense', 'Electricity, water, internet'),
  ('a1000000-0000-0000-0000-000000000045', '5500', 'Marketing Expense', 'expense', 'Advertising and marketing')
ON CONFLICT (code) DO NOTHING;

-- Set parent relationships for accounts
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000001' WHERE code IN ('1100', '1200', '1300', '1500');
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000002' WHERE code IN ('1110', '1120');
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000010' WHERE code IN ('2100', '2200', '2300');
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000020' WHERE code IN ('3100', '3200');
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000030' WHERE code IN ('4100', '4200');
UPDATE accounts SET parent_id = 'a1000000-0000-0000-0000-000000000040' WHERE code IN ('5100', '5200', '5300', '5400', '5500');

-- =====================================================
-- PRODUCT CATEGORIES
-- =====================================================

INSERT INTO product_categories (id, name, description) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Electronics', 'Electronic devices and accessories'),
  ('c1000000-0000-0000-0000-000000000002', 'Office Supplies', 'Office consumables and supplies'),
  ('c1000000-0000-0000-0000-000000000003', 'Furniture', 'Office and home furniture'),
  ('c1000000-0000-0000-0000-000000000004', 'Software', 'Software licenses and subscriptions'),
  ('c1000000-0000-0000-0000-000000000005', 'Services', 'Professional services')
ON CONFLICT DO NOTHING;

-- =====================================================
-- WAREHOUSES
-- =====================================================

INSERT INTO warehouses (id, name, address, is_active) VALUES
  ('w1000000-0000-0000-0000-000000000001', 'Main Warehouse', '123 Industrial Park, City Center', true),
  ('w1000000-0000-0000-0000-000000000002', 'Secondary Storage', '456 Business District', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE PRODUCTS
-- =====================================================

INSERT INTO products (id, sku, name, description, category_id, unit, cost_price, sell_price, reorder_level) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'ELEC-001', 'Laptop Pro 15', '15-inch professional laptop', 'c1000000-0000-0000-0000-000000000001', 'piece', 800.00, 1200.00, 5),
  ('p1000000-0000-0000-0000-000000000002', 'ELEC-002', 'Wireless Mouse', 'Ergonomic wireless mouse', 'c1000000-0000-0000-0000-000000000001', 'piece', 15.00, 35.00, 20),
  ('p1000000-0000-0000-0000-000000000003', 'ELEC-003', 'USB-C Hub', '7-port USB-C hub', 'c1000000-0000-0000-0000-000000000001', 'piece', 25.00, 55.00, 15),
  ('p1000000-0000-0000-0000-000000000004', 'OFF-001', 'A4 Paper Pack', 'Pack of 500 sheets', 'c1000000-0000-0000-0000-000000000002', 'pack', 3.50, 7.00, 50),
  ('p1000000-0000-0000-0000-000000000005', 'OFF-002', 'Pen Set', 'Set of 12 ballpoint pens', 'c1000000-0000-0000-0000-000000000002', 'set', 2.00, 5.00, 30),
  ('p1000000-0000-0000-0000-000000000006', 'FURN-001', 'Office Chair', 'Ergonomic office chair', 'c1000000-0000-0000-0000-000000000003', 'piece', 150.00, 299.00, 3),
  ('p1000000-0000-0000-0000-000000000007', 'FURN-002', 'Standing Desk', 'Adjustable standing desk', 'c1000000-0000-0000-0000-000000000003', 'piece', 300.00, 599.00, 2)
ON CONFLICT (sku) DO NOTHING;

-- =====================================================
-- INITIAL INVENTORY LEVELS
-- =====================================================

INSERT INTO inventory (product_id, warehouse_id, quantity) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'w1000000-0000-0000-0000-000000000001', 25),
  ('p1000000-0000-0000-0000-000000000002', 'w1000000-0000-0000-0000-000000000001', 150),
  ('p1000000-0000-0000-0000-000000000003', 'w1000000-0000-0000-0000-000000000001', 80),
  ('p1000000-0000-0000-0000-000000000004', 'w1000000-0000-0000-0000-000000000001', 200),
  ('p1000000-0000-0000-0000-000000000005', 'w1000000-0000-0000-0000-000000000001', 100),
  ('p1000000-0000-0000-0000-000000000006', 'w1000000-0000-0000-0000-000000000001', 15),
  ('p1000000-0000-0000-0000-000000000007', 'w1000000-0000-0000-0000-000000000001', 8)
ON CONFLICT (product_id, warehouse_id) DO NOTHING;

-- =====================================================
-- SAMPLE CUSTOMERS
-- =====================================================

INSERT INTO customers (id, company_name, contact_name, email, phone, city, country, type) VALUES
  ('cu100000-0000-0000-0000-000000000001', 'Acme Corporation', 'John Smith', 'john@acme.com', '+1-555-0101', 'New York', 'USA', 'customer'),
  ('cu100000-0000-0000-0000-000000000002', 'TechStart Inc', 'Sarah Johnson', 'sarah@techstart.io', '+1-555-0102', 'San Francisco', 'USA', 'customer'),
  ('cu100000-0000-0000-0000-000000000003', 'Global Trading Ltd', 'Michael Chen', 'michael@globaltrading.com', '+44-20-1234', 'London', 'UK', 'prospect'),
  ('cu100000-0000-0000-0000-000000000004', 'Innovation Labs', 'Emily Davis', 'emily@innovationlabs.de', '+49-30-5678', 'Berlin', 'Germany', 'lead'),
  ('cu100000-0000-0000-0000-000000000005', 'Pacific Solutions', 'David Kim', 'david@pacificsol.jp', '+81-3-9876', 'Tokyo', 'Japan', 'customer')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE VENDORS
-- =====================================================

INSERT INTO vendors (id, company_name, contact_name, email, phone, city, country, payment_terms) VALUES
  ('v1000000-0000-0000-0000-000000000001', 'Tech Supplies Co', 'Robert Brown', 'robert@techsupplies.com', '+1-555-0201', 'Austin', 'USA', 'Net 30'),
  ('v1000000-0000-0000-0000-000000000002', 'Office World', 'Lisa Wang', 'lisa@officeworld.com', '+1-555-0202', 'Chicago', 'USA', 'Net 15'),
  ('v1000000-0000-0000-0000-000000000003', 'Furniture Plus', 'James Wilson', 'james@furnitureplus.com', '+1-555-0203', 'Los Angeles', 'USA', 'Net 45')
ON CONFLICT DO NOTHING;
