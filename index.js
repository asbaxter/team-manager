const inquirer = require("inquirer");
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');


function init(){
    
    new Employee().initialPrompt();

    //new Manager().promptOffice();

    //new Engineer().promptGitHub();

    //new Intern().promptSchool();
}

init();