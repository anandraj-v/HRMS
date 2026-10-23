use hrms_db;

INSERT INTO departments (department_id, department_name) VALUES
(1, 'Engineering'),
(2, 'Human Resources'),
(3, 'Sales'),
(4, 'Marketing'),
(5, 'Finance');

select * from departments;

INSERT INTO clients (client_id, client_name, industry, contact_email, status) VALUES
(1, 'Acme Corporation', 'Manufacturing', 'contact@acme.com', 'Active'),
(2, 'TechStart Inc.', 'Technology', 'info@techstart.io', 'Active'),
(3, 'Global Logistics Ltd.', 'Transportation', 'support@globallogistics.com', 'Active'),
(4, 'HealthFirst Pharma', 'Healthcare', 'hr@healthfirst.org', 'Inactive'),
(5, 'Apex Solutions', 'Consulting', 'hello@apexsolutions.com', 'Active');

select * from clients;

INSERT INTO employees (employee_id, first_name, last_name, email, phone, department_id, manager_id, client_id, hire_date, base_salary) VALUES
-- Executives / Managers (manager_id is NULL)
(1, 'Alice', 'Smith', 'alice.smith@company.com', '555-0101', 1, NULL, 1, '2020-01-15', 120000.00),
(2, 'Bob', 'Johnson', 'bob.johnson@company.com', '555-0102', 3, NULL, 2, '2019-03-22', 115000.00),
(3, 'Charlie', 'Brown', 'charlie.brown@company.com', '555-0103', 2, NULL, NULL, '2021-06-10', 95000.00),

-- Engineering Staff (reporting to Alice - employee_id 1)
(4, 'Diana', 'Prince', 'diana.prince@company.com', '555-0104', 1, 1, 2, '2022-02-01', 85000.00),
(5, 'Evan', 'Wright', 'evan.wright@company.com', '555-0105', 1, 1, 2, '2022-05-14', 80000.00),
(6, 'Fiona', 'Gallagher', 'fiona.gallagher@company.com', '555-0106', 1, 1, 3, '2023-01-10', 78000.00),

-- Sales Staff (reporting to Bob - employee_id 2)
(7, 'George', 'Costanza', 'george.costanza@company.com', '555-0107', 3, 2, 1, '2021-09-01', 75000.00),
(8, 'Hannah', 'Abbott', 'hannah.abbott@company.com', '555-0108', 3, 2, 5, '2022-11-20', 72000.00),

-- HR Staff (reporting to Charlie - employee_id 3)
(9, 'Ian', 'Malcolm', 'ian.malcolm@company.com', '555-0109', 2, 3, NULL, '2023-04-05', 68000.00),
(10, 'Julia', 'Roberts', 'julia.roberts@company.com', '555-0110', 2, 3, NULL, '2023-07-19', 65000.00);

select * from employees;

INSERT INTO payslips (payslip_id, employee_id, month, year, basic_pay, allowances, deductions, payment_status) VALUES
(1, 1, 1, 2026, 10000.00, 1500.00, 1200.00, 'Paid'),
(2, 1, 2, 2026, 10000.00, 1500.00, 1200.00, 'Paid'),
(3, 2, 1, 2026, 9583.33, 1200.00, 1100.00, 'Paid'),
(4, 2, 2, 2026, 9583.33, 1200.00, 1100.00, 'Paid'),
(5, 3, 1, 2026, 7916.67, 1000.00, 900.00, 'Paid'),
(6, 3, 2, 2026, 7916.67, 1000.00, 900.00, 'Paid'),
(7, 4, 1, 2026, 7083.33, 800.00, 850.00, 'Paid'),
(8, 4, 2, 2026, 7083.33, 800.00, 850.00, 'Paid'),
(9, 5, 1, 2026, 6666.67, 750.00, 800.00, 'Paid'),
(10, 5, 2, 2026, 6666.67, 750.00, 800.00, 'Paid');

select * from payslips;

