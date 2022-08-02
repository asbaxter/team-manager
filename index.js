const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

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
        let employees;
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
                employees = new Manager(name, id, email, titleAttribute);
                console.log(employees);
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
                employees = new Engineer(name, id, email, titleAttribute);
                console.log(employees);
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
                employees = new Intern(name, id, email, titleAttribute);
                console.log(employees);
            })

        }
    })

   
}

promptUser();