const inquirer = require("inquirer");
const Employee = require('./Employee');


class Engineer extends Employee{
    constructor(github = ''){
        super(github);
        this.github = github;
    }

    promptGitHub(){
        inquirer
            .prompt({
                type: 'text',
                name: 'github',
                message: 'What is your engineers github?'
            })
            .then(({ github }) => {
                this.Engineer = new Engineer(github)
                this.displayResults(github);
            })
    }
    displayResults(github){
        console.log(github)
    }


}


module.exports = Engineer;