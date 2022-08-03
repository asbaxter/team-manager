const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let employees = [];

function promptUser(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees name: ",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employees ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employees email:",
        name: "email",
      },
      {
        type: "list",
        message: "Provide employees title:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "title",
      }
    ])
    .then(function ({ name, id, email, title }){
        let employee;
        if (title == "Manager"){
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your manager's office number: ",
                    name: "titleAttribute"
                }
            ])
            .then(function ({titleAttribute}){
                employee = new Manager(name, id, email, titleAttribute);
                employees.push(employee);
                addEmployeePrompt();
            })
        } else if(title == "Engineer"){
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your engineer's GitHub",
                    name: "titleAttribute"
                }
            ])
            .then(function ({titleAttribute}){
                employee = new Engineer(name, id, email, titleAttribute);
                employees.push(employee);
                addEmployeePrompt();
            })
        } else{
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your interns school: ",
                    name: "titleAttribute"
                }
            ])
            .then(function ({titleAttribute}){
                employee = new Intern(name, id, email, titleAttribute);
                employees.push(employee);
                addEmployeePrompt();
            })

        }
    }) 
}

function addEmployeePrompt() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Would you like to add another employee",
            choices: ["Yes", "No"],
            name: "addEmployees"
        }
    ])
    .then(function ({ addEmployees }){
        if (addEmployees == 'Yes'){
            promptUser();
        }
        else {
            createHTML();
        }
    })

}
function createHTML(){
    
    
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Manager</title>
    </head>
    <body>
        <header>
            <h1>Team Manager</h1>
        </header>
        
    </body>
    </html>
    `

    fs.writeFile("./dist/index.html", html, function (err) {
        if (err) {
          console.log(err);
        }
    })
    createEmployeeCards();
};
function createEmployeeCards(){
    for (let i = 0; i < employees.length; i++){

        let jobAttribute;
        let attributeName;

        if (employees[i].office != null){
            console.log("created Manager")
            jobAttribute = employees[i].office;
            attributeName = 'Office #:';
        }
        else if(employees[i].github != null){
            console.log("created engineer")
            jobAttribute = employees[i].github;
            attributeName = 'GitHub: ';
        } else {
            console.log("created intern")
            jobAttribute = employees[i].school;
            attributeName = 'School: ';
        }

        let employeeHTML = `
            <div>
                <h2>${employees[i].name}</h2>
                <ul>
                    <li>ID: ${employees[i].id}</li>
                    <li>Email: ${employees[i].email}</li>
                    <li>${attributeName + jobAttribute}</li>
                </ul>
            </div>
        `
        fs.appendFile("./dist/index.html", employeeHTML, function (err) {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
    };
};
promptUser();