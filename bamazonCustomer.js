// Stores access to Node package "mysql" in variable of same name
var mysql = require("mysql");
// Stores access to Node package "inquirer" in variable of same name
var inquirer = require("inquirer");

// Stores connection to MySQL in a variable for future reference
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`
    
        Welcome to Bamazon!
    
        Have a look at our wares!
    
    `);
    getProducts();
});

// getProducts function pulls all listed items and logs to terminal
// this function runs as soon as the js file is run through node
function getProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(`
        ${res[i].product_name} - $${res[i].price}
            Category: ${res[i].department_name}
            In Stock: ${res[i].stock_quantity}
            Item ID: ${res[i].item_id}
                `);
        }
        connection.end();
        runInquirer();
    });
}

function runInquirer() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the Item ID of the product you would like to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log(`

        Please enter a listed Item ID.
                `);
                return false;
              }
        },
        {
            name: "units",
            type: "input",
            message: "Please enter how many units of the product you would like to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log(`

        Please enter a listed Item ID. 
                `);
                return false;
              }
        }
    ])
    .then(function(answer) {
        console.log("working");
    });
}

// user is then prompted to input id of product they want to buy
// user will specify how many units of product they want
// program will check user number against db number
// if user number > db number, prompt "Insufficient Quantity!"
// then cancel order
// if user number <= db number, fulfill order
// change quantity of item in mysql and show user purchase total