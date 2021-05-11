const mysql = require('mysql');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
// const { Router } = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',

    password: 'Doodle1994',
    database: 'employee_db'
});

const start = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start_prompt",
                message: "Welcome to the employee database. Pick an option.",
                choices: ["Add Department", "Add Employee", "Add Manager", "Add Role"],
            }
            // {
            //     type: "list",
            //     name: "nextChoice",
            //     message: 
            // }
        ])
        .then((answer) => {
            if (answer.start_prompt === "Add Department") {
                departmentAdd();
            } else if (answer.start_prompt === "Add Employee") {
                employeeAdd();
            } else if (answer.start_prompt === "Add Manager") {
                managerAdd();
            } else if (answer.start_prompt === "Add Role") {
                roleAdd();
            } else {
                connection.end();
            }

        });
};
start()

const departmentAdd = () => {
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the department?"
            },
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO department_info SET ?",
                {
                    department_name: answer.departmentName
                },
                (err) => {
                    if (err) throw err;
                    console.log("Department name added!");
                    start();
                })
        });
}

const roleAdd = () => {
    connection.query('SELECT * FROM department_info', (err, results) => {
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department",
                type: "list",
                choices() {
                    const departmentArray = [];
                    results.forEach(({ id, department_name }) => {
                        departmentArray.push(id + " " + department_name);
                    });
                    return departmentArray
                },
                message: "What department does this role belong to?"
            },

        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO role_id SET ?",
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.department[0]
                },
                (err) => {
                    if (err) throw err;
                    console.log("Role added!");
                    start();
                })
        });
    })
}

const managerAdd = () => {
    connection.query('SELECT * FROM manager', (err, results) => {
    inquirer
        .prompt([
            {
                name: "managerFirst",
                type: "input",
                message: "What is the first name of the manager?"
            },
            {
                name: "managerLast",
                type: "input",
                message: "What is the the last name?"
            }

        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO manager SET ?",
                {
                    first_name: answer.managerFirst,
                    last_name: answer.managerLast
        
                },
                (err) => {
                    if (err) throw err;
                    console.log("Manager added!");
                    start();
                })
        });
    })
}

const employeeAdd = () => {
    connection.query('SELECT * FROM role_id manager', (err, results) => {
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    type: "list",
                    choices() {
                        const roleArray = [];
                        results.forEach(({ title }) => {
                            roleArray.push(title);
                        });
                        return roleArray
                    },
                    message: "Select a role."
                },
                {
                    name: "managerChoice",
                    type: "list",
                    choices() {
                        const managerArray = [];
                        results.forEach(({ id, first_name, last_name }) => {
                            managerArray.push(id + " " + first_name + " " + last_name);
                        });
                        return managerArray
                    },
                    message: "Choose a manager."
                },
            ])
            .then((answer) => {
                connection.query(
                    "INSERT INTO employee_id SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.role[1],
                        manager_id: answer.managerChoice[0]

                    },
                    (err) => {
                        if (err) throw err;
                        console.log("Employee added!");
                        start();
                    })
            });
    })
}

// function databaseFunction() {
//     connection.query('SELECT * FROM department_info', (err, res) => {
//         if (err) throw err;
//         res.forEach(({ id, department_name, title, salary, department_id, first_name, last_name, role_id, manager_id }) => {
//             console.log(`${id} | ${department_name} | ${title} | ${salary} | ${department_id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`)
//         });
//         console.log(res);
//         connection.end();
//     });
// };

connection.connect(err => {
    if (err) throw err;
    console.log(`We in hur! ${connection.threadId}`);
});

                    // inquirer
                    //     .prompt([
                    //         {
                    //             name: "choice",
                    //             tupe: "rawlist",
                    //             message: "Which department do you choose?",
                    //         },
                    //         //     {
                    //         //         name: "return",
                    //         //         type: "input",
                    //         //         message: "Return to Start.",
                    //         //     }
                    //         // ])
                    //         // .then((answer) => {
                    //         //     const department_list;
                    //         //     results.forEach((item) => {

                    //         //     })
                    //         // })

                    //     ]
                    //     )