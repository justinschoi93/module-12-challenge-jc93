# module-12-challenge-jc93

<!-- 3 tables
- department
    id: INT PRIMARY KEY
    name: VARCHAR(30)
    
- role
    id: INT PRIMARY KEY
    title: VARCHAR(30)
    salary: Decimal
    department_id: INT

-employee
    id: INT PRIMARY KEY
    first_name: VARCHAR(30)
    last_name: VARCHAR(30)
    role_id: INT
    manager_id: INT, null if no manager

seeds.sql to populate database. chat-gpt?

BONUS: 
-update employee managers
-view employees by manager
- view employees by department
- delete departments, roles and employees
- view total utilized budge of department  --> 

<!-- ## Acceptance Criteria
- main menu
    - view all departments
    - view all roles
    - view all employees
    - add a department
    - add a role
    - an employee
    - update an employee role

- View all Departments SELECTED
    - show table 
        -department names
        - department ids
- View all Roles SELECTED
    - show table or roles
        - job title
        - role id
        - department of role
        - salary 

- View all Employees 
    - show table
        - employee data
        - employee ids
        - first names
        - last names
        - job titles
        - departments
        - salaries
        - managers of employees

- Add a Department
    - prompt to enter name of department
        - add new row to department table

- Add a Role 
    - prompt to enter name, salary, department
    - add role to roles table

- Add an Employee
    - prompt to enter...
        -first name
        - last name
        - role
        - manager
    - add employee to database

- Update Employee Role
    - prompt to select employee
        - prompt to input new role
        - emplyees info is updated -->
