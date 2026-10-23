use hrms_db;
-- Disable foreign key checks temporarily to alter columns safely
SET FOREIGN_KEY_CHECKS = 0;

-- Update foreign key columns in employees table to BIGINT
ALTER TABLE employees MODIFY COLUMN department_id BIGINT;
ALTER TABLE employees MODIFY COLUMN manager_id BIGINT;
ALTER TABLE employees MODIFY COLUMN client_id BIGINT;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Step 1: Temporarily disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Step 2: Drop existing foreign key constraints so we can alter column types safely
ALTER TABLE employees DROP FOREIGN KEY fk_department;
ALTER TABLE employees DROP FOREIGN KEY fk_manager;
ALTER TABLE employees DROP FOREIGN KEY fk_client;
ALTER TABLE payslips DROP FOREIGN KEY fk_payslip_employee;

-- Step 3: Update all Primary Key columns to BIGINT
ALTER TABLE clients MODIFY COLUMN client_id BIGINT NOT NULL AUTO_INCREMENT;
ALTER TABLE departments MODIFY COLUMN department_id BIGINT NOT NULL AUTO_INCREMENT;
ALTER TABLE employees MODIFY COLUMN employee_id BIGINT NOT NULL AUTO_INCREMENT;
ALTER TABLE payslips MODIFY COLUMN payslip_id BIGINT NOT NULL AUTO_INCREMENT;

-- Step 4: Update all Foreign Key columns to match BIGINT
ALTER TABLE employees MODIFY COLUMN department_id BIGINT;
ALTER TABLE employees MODIFY COLUMN manager_id BIGINT;
ALTER TABLE employees MODIFY COLUMN client_id BIGINT;
ALTER TABLE payslips MODIFY COLUMN employee_id BIGINT NOT NULL;

-- Step 5: Re-add the Foreign Key constraints
ALTER TABLE employees ADD CONSTRAINT fk_department 
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE employees ADD CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE employees ADD CONSTRAINT fk_client 
    FOREIGN KEY (client_id) REFERENCES clients(client_id) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE payslips ADD CONSTRAINT fk_payslip_employee 
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;