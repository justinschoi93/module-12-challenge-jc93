const inquirer = require('inquirer');
const mysql = require('mysql2');

//connected database to server
const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root',
        password: 'password', 
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

//Main Menu Options
const questions = [
    {
        name: 'SELECTION',
        message: 'What do you want to do?',
        type: 'list',
        choices: [
            "View All Departments", 
            "View All Roles", 
            "View All Employees", 
            "Add Department", 
            "Add Role", 
            "Add Employee",
            "Update Employee Role"
        ]
    },
];

//Main Menu Initializer
function mainMenu () {
    inquirer
    .prompt(questions)
    .then((response) => {
        
        //Switch Cases to execute functions of each main menu selection

       switch (response.SELECTION) {
        //View All Departments feature
        case "View All Departments":
            mainMenuReponses.viewDepartments();
            break;

        //View All Roles feature
        case "View All Roles":
           mainMenuReponses.viewRoles();
    
            break;

        //View ALL Employees featuer
        case "View All Employees":
           mainMenuReponses.viewAllEmployees();
            break;

        //Add Department feature
        case "Add Department":
            inquirer.prompt([
                {
                name: "department",
                message: 'Enter the name of the department you would like to create',
                type: 'input'
            }   
            ]).then( response => mainMenuReponses.addDepartment(response.department));
            
            break;
        
        //Add Role feature
        case "Add Role":
            db.query('SELECT name FROM departments;', (error, response) => {
                
                inquirer.prompt([
                    {
                        name: "title",
                        message: "What is the title of the role?",
                        type: 'input'
                    },
                    {
                        name: "salary",
                        message: "What is the salary of the role?",
                        type: 'input' 
                    },
                    {
                        name: "department",
                        message: "Which department will this role be a part of?",
                        type: 'list',
                        choices: response.map( obj => obj.name)
                    }
    
                ])
                .then((response) => mainMenuReponses.addRole(response))
            })
            
            
            
            break;

        //Add Employee feature
        case "Add Employee":
            db.query('SELECT first_name FROM managers', (err, res) => {
                let first_names = res.map(obj=>obj.first_name);
                db.query('SELECT last_name FROM managers', (err, res) => {
                    let last_names = res.map(obj => obj.last_name);
                    let managers = [];

                    for (let i = 0; i < last_names.length; i++){
                        managers.push(first_names[i] + ' ' + last_names[i])
                    }

                    db.query('SELECT title FROM roles', (err, res) => {
                        let roles = res.map(obj=>obj.title);

                        
                        inquirer.prompt([
                            {
                            name: 'first',
                            message: "What is the employee's first name?",
                            type: 'input'
                           },
                           {
                            name: 'last',
                            message: "What is the employee's last name?",
                            type: 'input'
                           },
                           {
                            name: "role",
                            message: "What is the employee's role?",
                            type: "list",
                            choices: roles
                           },
                           {
                            name: "manager",
                            message: "Who will the employee's manager be?",
                            type: "list",
                            choices: managers
                           }
                        ])
                        .then((response) => {
                            mainMenuReponses.addEmployee(response)
                        })
        
                    })
                })
            })
            
            
            break;

        //Update Employee Role feature
        case "Update Employee Role":
            db.query('SELECT title FROM roles;', (err, res) => {
                let roles = res.map(obj => obj.title);

                db.query('SELECT first_name FROM employees;', (err, res) => {
                    let first_names = res.map(obj=>obj.first_name);
                    
                    

                    db.query('SELECT last_name FROM employees;', (err, res) => {
                        let last_names = res.map(obj => obj.last_name);
                        
                        let employees = [];
                      

                        for (let i = 0; i < last_names.length; i++) {
                            employees.push(first_names[i] + ' ' + last_names[i]);
                        }

                        console.log(employees);

                        inquirer.prompt([
                            {
                                name: "employee",
                                message: "Which employee's role would you like to change?",
                                type: "list",
                                choices: employees
                            },
                            {
                                name: "newRole",
                                message: "What would you like to change their role to?",
                                type: "list",
                                choices: roles
                            }
                        ])
                        .then((response) => mainMenuReponses.updateEmployeeRole(response))
        
        
                    })
                })
                
            })
            
            
            break;
       }

    })
    .catch((error) => {
        console.log(error)
    })
}


//object of functions to execute upon selection made on main menu
const mainMenuReponses = {
    viewDepartments: () => {
        db.query('SELECT departments.id AS ID, departments.name AS NAME FROM departments', (error, response) => {
            if (response) {
                console.table(response);
                mainMenu();
            } else {
                console.error(error);
            };
        })
    },
    viewRoles: () => {   
        db.query('SELECT * FROM roles', (error, response) => {
            if (response) {
                console.table(response)
                mainMenu();
            } else {
                console.error(error)};
        })
        },
    viewAllEmployees: () => {   
        db.query('SELECT * FROM employees', (error, response) => {
            if (response) {
                console.table(response);
                mainMenu();
             }else {
                console.error(error);
             }
            })
    },
    addDepartment: (response) => {  
       
        db.query(  `INSERT INTO departments (name) VALUES (?);`, response);
        db.query('SELECT * FROM departments;', (err, res) => {
            if (res) {
                console.table(res);
                mainMenu();
            } else {
                console.error(err);
            }
        })
            
    },
    addRole: (response) => {
        db.query('SELECT id FROM departments WHERE name = ?', response.department, (err, res) => {
            db.query( 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', [response.title, response.salary, res[0].id]);
            db.query('SELECT * FROM roles;', (err, res) => {
                if (res) {
                    console.table(res);
                    mainMenu();
                } else {
                    console.error(err);
                }
            })
        });
       
    },
    addEmployee: (response) => {
        const {first, last, role, manager} = response;
        const managerArr = manager.split(' ');
        const managerFirstName = managerArr[0]; 
        console.log(managerFirstName);
        
        db.query('SELECT id FROM roles WHERE title = ?', [role], (err,res)=>{
            let role_id = res[0].id;
            
                db.query('SELECT id FROM managers WHERE first_name = ?', managerFirstName, (err,res) => {
                    // console.log(res)
                    let manager_id = res[0].id;

                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, 
                        [first, last, role_id, manager_id]);
                    db.query('SELECT * FROM employees;', (error, response) => {
                        if (response) {
                            console.table(response);
                            mainMenu();
                        } else {
                            console.error(error);
                        }
                    }) 
                })
        })
        
    },

    updateEmployeeRole: (response) => {
        const {employee, newRole} = response;
        const employeeStr = employee.split(' ');
        const last_name = employeeStr[1];

        db.query('SELECT id FROM roles WHERE title = ?', newRole, (err, res) => {
            let role_id = res[0].id
            db.query(`UPDATE employees SET role_id = ? WHERE last_name = ?`, [role_id, last_name] );
            db.query('SELECT * FROM employees', (err, res) => {
                if (res) {
                    console.table(res)
                    mainMenu();
                } else {
                    console.error(err);
                }
            });
        })
      

        
    }
}

mainMenu();
