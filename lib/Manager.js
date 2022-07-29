const inquirer = require("inquirer");
const Employee = require('./Employee');


class Manager extends Employee {
    constructor(office = ''){
        super(office);
        
        this.office = office;
    }

    promptOffice(){
        inquirer
            .prompt({
                type: 'text',
                name: 'office',
                message: 'What is your Managers office number?'
            })
            .then(({ office }) => {
                this.Manager = new Manager(office)
                this.displayResults(office);
            })
    }
    displayResults(office){
        console.log(office)
    }


}


module.exports = Manager;