create database hrms_db;
use hrms_db;
CREATE TABLE clients (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    contact_email VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'Active'
);
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id INT,
    manager_id INT,
    client_id INT,
    hire_date DATE NOT NULL,
    base_salary DECIMAL(10, 2) NOT NULL,
    
    -- Foreign Key constraints
    CONSTRAINT fk_department 
        FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
        
    CONSTRAINT fk_manager 
        FOREIGN KEY (manager_id) REFERENCES employees(employee_id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
        
    CONSTRAINT fk_client 
        FOREIGN KEY (client_id) REFERENCES clients(client_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE payslips (
    payslip_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    month INT NOT NULL, -- e.g., 1 for January, 12 for December
    year INT NOT NULL,
    basic_pay DECIMAL(10, 2) NOT NULL,
    allowances DECIMAL(10, 2) DEFAULT 0.00,
    deductions DECIMAL(10, 2) DEFAULT 0.00,
    net_pay DECIMAL(10, 2) GENERATED ALWAYS AS (basic_pay + allowances - deductions) STORED,
    payment_status VARCHAR(50) DEFAULT 'Pending',
    
    -- Foreign Key constraint linking back to employees
    CONSTRAINT fk_payslip_employee 
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);