-- insert data into 3 tables
INSERT INTO departments (name)
VALUES
    ('Manufacturing'),
    ('HR'),
    ('Software');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Evil Genius', 1000000),
    ('HR Rep', 999999),
    ('Software Engineer', 7777777);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jimini', 'Cricket', 10, 10),
    ('Wilson', 'the Volleyball', 10, 10),
    ('Minion', 'number 98437217', 22, 22);


-- Add Role
    -- name
    -- salary

-- Add Employee
    -- firstName
    -- lastName 
    -- role

-- Update Employee Role
    -- employee
    -- newRole
