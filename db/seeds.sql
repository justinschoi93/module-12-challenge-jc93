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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jimini', 'Cricket', 1, NULL),
    ('Wilson', 'the Volleyball', 2, 7),
    ('Minion', '#98437217', 3, 7);


INSERT INTO managers (first_name, last_name, department_id)
VALUES
    ('Marvin', 'the Manager', 1),
    ('Gandalf', 'the Grey', 2),
    ('Jabba', 'the Hut', 3);


