const mysql = require('myspl');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const { Router } = require('express');

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
                choices: ["Department", "Employee", "Manager" ]
            },
            {
                type: "list",
                name: "nextChoice",
                message
            }
    ])
    .then((answer) => {
        if (answer.start_prompt === "Department") {
            departmentSearch();
        } else if (answer.start_prompt === "Employee") {
            employeeSearch();
        } else if ( answer.start_prompt === "Manager") {
            managerSearch();
        } else {
            connection.end();
        }

    });
};
start()

const departmentSearch = () => {
    inquirer
        .prompt([
            {
                name: "departmentType",
                type: "list",
                message: "Pick a department or add department.",
                choices: ["Departments"]
            },
            {}
        ])
        .then((answer) => {
            connection.query(
                "SELECT * FROM department_info", (err, results) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: "choice",
                                tupe: "rawlist",
                                message: "Which department do you choose?",
                                choices() {
                                        const choiceArray = [];
                                        results.forEach(({department_name}) => {
                                            choiceArray.push(department_name);
                                        });
                                        return choiceArray
                                    },
                                
                            },
                        //     {
                        //         name: "return",
                        //         type: "input",
                        //         message: "Return to Start.",
                        //     }
                        // ])
                        // .then((answer) => {
                        //     const department_list;
                        //     results.forEach((item) => {

                        //     })
                        // })
                }
            )
        })
}

function databaseFunction() {
    connection.query('SELECT * FROM department_info', (err, res) => {
        if (err) throw err;
        res.forEach(({ id, department_name, title, salary, department_id, first_name, last_name, role_id, manager_id}) => {
            console.log(`${id} | ${department_name} | ${title} | ${salary} | ${department_id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`)
        });
        console.log(res);
        connection.end();
    });
};

connection.connect(err => {
    if(err) throw err;
    console.log(`We in hur! ${connection.threadId}`);
    databaseFunction();
});

module.exports = Router