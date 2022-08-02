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
                addEmployee();
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
                addEmployee();
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
                addEmployee();
            })

        }
    }) 
}

function addEmployee() {
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
            console.log(employees)
        }
    })

}

promptUser();