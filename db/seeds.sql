-- insert data into 3 tables
INSERT INTO departments (name)
VALUES
    ('Manufacturing'),
    ('HR'),
    ('Software');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Evil Genius', 1000000, 1),
    ('HR Rep', 999999, 2),
    ('Software Engineer', 7777777, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('Jimini', 'Cricket', 1),
    ('Wilson', 'the Volleyball', 2),
    ('Minion', 'number 98437217', 3);


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
