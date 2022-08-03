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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
        <title>Team Manager</title>
    </head>
    <body>
        <header>
            <h1>Team Manager</h1>
        </header>

        <div class="row justify-content-center" id="team">
        
    `

    fs.writeFile("./dist/index.html", html, function (err) {
        if (err) {
          console.log(err);
        }
    })
    createEmployeeCards();
};

function footerHTML(){
    const htmlEnd = `
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
    </html>
    `
    fs.appendFile("./dist/index.html", htmlEnd, function (err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      });

    generateCSS();
}
function createEmployeeCards(){
    for (let i = 0; i < employees.length; i++){

        let jobAttribute;
        let attributeName;

        if (employees[i].office != null){
            jobTitle = 'Manager';
            jobAttribute = employees[i].office;
            attributeName = 'Office #:';
            jobIcon = '../assets/images/management.png'
        }
        else if(employees[i].github != null){
            jobTitle = 'Engineer';
            jobAttribute = employees[i].github;
            attributeName = 'GitHub: ';
            jobIcon = '../assets/images/engineer.png'
        } else {
            jobAttribute = employees[i].school;
            jobTitle = 'Intern';
            attributeName = 'School: ';
            jobIcon = '../assets/images/internship.png'
        }

        let employeeHTML = `
        <div class="col-sm-12 col-md-3"id="employeeCard">
            <div id="employeeHeader">
                <h2>${employees[i].name}</h2>
                <h3><img src="${jobIcon}" alt="" id="icons">${jobTitle}</h3>
            </div>
            <div id="employeeInfo">
                <ul>
                    <li>ID: ${employees[i].id}</li>
                    <li>Email: <a href="mailto:${employees[i].email}">${employees[i].email}</a></li>
                    <li>${attributeName + jobAttribute}</li>
                </ul>
            </div>
        </div>

        `
        fs.appendFile("./dist/index.html", employeeHTML, function (err) {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
    };
    footerHTML();
};

function generateCSS(){

    const css = `

    header {
        text-align: center;
        background-color: #E84756;
        color: white;
        padding: 50px;
    }
    li {
        list-style: none;
    }
    #employeeCard{
        border: black solid 2px;
        margin: 20px;
        box-shadow: 10px 10px 5px lightblue;
    }
    #employeeHeader{
        text-align: center;
        background-color: #0077F7;
        color: white;
        padding: 10px;
        margin-top: -1px;
        margin-right: -16px;
        margin-left: -16px;
    }
    #employeeInfo{
        padding: 5px;
        margin-top: 10px;
    }
    #employeeInfo ul li{
        border: grey solid .5px; 
        padding: 5px;
    }
    #icons{
        height: 40px;
        margin-right: 25px;
    }
    
    `

    fs.writeFile("./dist/style.css", css, function (err) {
        if (err) {
          console.log(err);
        }
    })
};
promptUser();
