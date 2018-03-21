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

// Initializes connection to MySQL and greets user
connection.connect(function(err) {
    if (err) throw err;
    console.log(`
    
        Welcome to Bamazon!
    
        Have a look at our wares!
    `);
    // Calls getProducts function
    getProducts();
});

// Pulls all listed items from database and logs to terminal
function getProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            // Template strings help format presentation to user in terminal
            console.log(`
        ${res[i].product_name} - $${res[i].price}
            Category: ${res[i].department_name}
            In Stock: ${res[i].stock_quantity}
            Item ID: ${res[i].item_id}
                `);
        }
        // Calls runInquirer function
        runInquirer();
    });
}


// Prompts user for the id of the product they wish to purchase
function runInquirer() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the Item ID of the product you would like to purchase.",
            // Validates user input, so as to require a number
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
            // Prompts user for the number of units they wish to purchase of specified product
            name: "units",
            type: "input",
            message: "Please enter how many units of the product you would like to purchase.",
            // Validates user input, so as to require a number
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
        // Stores Inquirer user answers in local variables
        var chosenItem = answer.id;
        var chosenUnits = answer.units;
        // MySQL query is defined as local variable and then passed in
        var query = "SELECT * FROM products WHERE item_id=?";
        connection.query(query, [chosenItem], function(err, res) {
            // If user orders more of a product than is available, the order is cancelled
            if (chosenUnits > res[0].stock_quantity) {
        
                console.log(`
        Insufficient stock to fulfill your request!

        Your order has been cancelled!
            `);
                // The MySQL connection is then closed and the program must be run again
                connection.end();
            } else {
                // If user orders all of the remaining stock or less, remainder is stored in local variable
                var remainingStock = res[0].stock_quantity - chosenUnits;
                // MySQL database is then updated to reflect stock change
                query = "UPDATE products SET ? WHERE ?";
                connection.query(query,
                    [
                        {stock_quantity: remainingStock},
                        {item_id: chosenItem}
                    ],
                    function(err, res) {
                        if (err) throw err;
                });
                // Number of units ordered is multiplied by product price to get total cost
                var totalCost = chosenUnits * res[0].price;
                // Total cost is then fixed to two decimal places to reflect real-world values
                var totalCostDollars = totalCost.toFixed(2);
                // Communicates order-fulfillment to user
                console.log(`
        BAM!!!

        Your order has been fulfilled!

        Your total cost is $${totalCostDollars}.
        
        Please come again!`);
        // Closes connection to MySQL, ending the program
        connection.end();
            }
        });
    });
}