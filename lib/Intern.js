const inquirer = require("inquirer");
const Employee = require('./Employee');


class Intern extends Employee{
    constructor(school = ''){
        super(school);
        this.school = school;
    }

    promptSchool(){
        inquirer
            .prompt({
                type: 'text',
                name: 'school',
                message: 'What is your Interns school?'
            })
            .then(({ school }) => {
                this.Intern = new Intern(school)
                this.displayResults(school);
            })
    }
    displayResults(school){
        console.log(school)
    }


}


module.exports = Intern;