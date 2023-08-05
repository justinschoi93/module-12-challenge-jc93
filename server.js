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

//array of questions for inquirer
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

//inquirer code. used prompt to collect responses from user. 
function mainMenu () {
    inquirer
    .prompt(questions)
    .then((response) => {

       switch (response.SELECTION) {
        case "View All Departments":
            mainMenuReponses.viewDepartments();
            break;

        case "View All Roles":
           mainMenuReponses.viewRoles();
    
            break;

        case "View All Employees":
           mainMenuReponses.viewAllEmployees();
            break;

        case "Add Department":
            inquirer.prompt([
                {
                name: "department",
                message: 'Enter the name of the department you would like to create',
                type: 'input'
            }   
            ]).then( response => mainMenuReponses.addDepartment(response.department));
            
            break;

        case "Add Role":
            //collect information about role from user via inquirer prompt
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

        case "Add Employee":
            db.query('SELECT title FROM roles', (err, res) => {
                inquirer.prompt([
                    {
                    name: 'firstName',
                    message: "What is the employee's first name?",
                    type: 'input',
                   },
                   {
                    name: "lastName", 
                    message: "What is the employee's last name?",
                    type: "input"
                   },
                   {
                    name: "role",
                    message: "What is the employee's role?",
                    type: "list",
                    choices: res.map(obj=>obj.name) 
                    
                   }
                ])
                .then((response) => {
                    mainMenuReponses.addEmployee(response)
                })

            })
            
            break;

        case "Update Employee Role":
            db.query('SELECT name FROM employees;', (err, res) => {
                inquirer.prompt([
                    {
                        name: "employee",
                        message: "Which employee's role would you like to change?",
                        type: "list",
                        choices: res.map(obj => obj.name)
                    },
                    {
                        name: "newRole",
                        message: "What would you like to change their role to?",
                        type: 'input'
                    }
                ])
                .then((response) => mainMenuReponses.updateEmployeeRole(response))


            })
            
            break;
       }

    })
    .catch((error) => {
        console.log(error)
    })
}



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
        //first name, last name, role, and manager,
        //How do I get the right role id?
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                VALUES (?, ?, ?, ?); 
                SELECT * FROM employees`, 
                [response.firstName, response.lastName, response.roleID, response.managerID],
                    (error, response) => {
                        if (response) {
                            console.table(response);
                            mainMenu();
                        } else {
                            console.error(error);
                        }
                })
    },
    updateEmployeeRole: (response) => {
        db.query(`${response.ROLE}`, (error, response) => {
            if (response) {
                console.table(response)
                 mainMenu();
            } else {
                console.error(error);
            }
        })
    }
}

mainMenu();
