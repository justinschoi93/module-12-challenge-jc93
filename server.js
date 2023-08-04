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
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is the name of the role?",
                    type: 'input'
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?",
                    type: 'input' 
                }

            ])
            .then((response) => mainMenuReponses.addRole(response));
            
            break;

        case "Add Employee":
            // first name, last name, role, and manager,
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
                type: "input", 
                valdiate: () => {
                    // make array of valid roles using db.query. select for specific column of roles table.
                    //if the input is equal to one of the roles in the array, return true.
                }
               }
            ])
            .then((response) => {
                mainMenuReponses.addEmployee(response)
            })
            break;

        case "Update Employee Role":
            inquirer.prompt([
                {
                    name: "employee",
                    message: "Which employee's role would you like to change?",
                    type: "list",
                    choices: () => {
                            // generate array of employee names and return as an array.
                        }
                },
                {
                    name: "newRole",
                    message: "What would you like to change their role to?",
                    type: 'input'
                }
            ])
            .then((response) => mainMenuReponses.updateEmployeeRole(response))
            break;
       }

    })
    .catch((error) => {
        console.log(error)
    })


const mainMenuReponses = {
    'viewDepartments': () => {
        db.query('SELECT * FROM departments', (error, response) => {
            if (response) {
                console.table(response);
            } else {
                console.error(error);
            };
        })
    },
    'viewRoles': () => {   
        db.query('SELECT * FROM roles', (error, response) => {
            if (response) {
                console.table(response)
            } else {
                console.error(error)};
        })
        },
    'viewAllEmployees': () => {   
        db.query('SELECT * FROM employees', (error, response) => {
            if (response) {
                console.table(response);
             }else {
                console.error(error);
             }
            })
    },
    'addDepartment': (response) => {   
        db.query(`INSERT INTO departments (name) VALUES (${response}); SELECT * FROM departments`, (error, response) => {
            if (response) {
                console.table(response);
            } else {
            console.error(error);
            }
        })
    },
    'addRole': (response) => {
        db.query(`INSERT INTO roles (name, salary) VALUES (${response.name}, ${response.salary}); SELECT * FROM roles`, (error, response) => {
            if (response) {
                console.table(response);
            } else {
                console.error(error);
            }
        })
    },
    // 'addEmployee': (response) => {
    //     //first name, last name, role, and manager,
    //     //How do I get the right role id?
    //     db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    //             VALUES (${response.firstName}, ${response.lastName}, ${response.role}, ${response.manager}); 
    //             SELECT * FROM employees`, 
    //         (error, response) => {
    //             if (response) {
    //                 console.table(response);
    //             } else {
    //                 console.error(error);
    //             }
    //     })
    // },
    // 'updateEmployeeRole': (response) => {
    //     db.query(`${response.ROLE}`, (error, response) => {
    //         if (response) {
    //             console.table(response)
    //         } else {
    //             console.error(error);
    //         }
    //     })
    // }
}
