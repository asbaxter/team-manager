const inquirer = require("inquirer");

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
                console.log(name)
                console.log(id)
                console.log(email)
                console.log(titleAttribute)
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
                console.log(name)
                console.log(id)
                console.log(email)
                console.log(titleAttribute)
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
                console.log(name)
                console.log(id)
                console.log(email)
                console.log(titleAttribute)
            })

        }
    })

   
}

promptUser();