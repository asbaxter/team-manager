const inquirer = require("inquirer");

class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    initialPrompt(){
        inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'What is your Employees name?'
            })
            .then(({ name }) => {
                this.Employee = new Employee(name)
                this.promptID(name);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    promptID(name){
        inquirer
            .prompt({
                type: 'text',
                name: 'id',
                message: 'What is your Employees id number?'
            })
            .then(({ id }) => {
                this.Employee = new Employee(id)
                this.promptEmail(name, id);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    promptEmail(name, id){
        inquirer
            .prompt({
                type: 'text',
                name: 'email',
                message: 'What is your Employees email?'
            })
            .then(({ email }) => {
                this.Employee = new Employee(name, id, email)
                this.displayStats();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    displayStats(){
        console.log(this.Employee);
    }

}


module.exports = Employee;