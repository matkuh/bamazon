var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon_db"
});

var table = new Table({
    head: ['ID', 'Name', 'Department', 'Price', 'Stock Quantity']
    , colWidths: [10, 20, 20, 20, 20]
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems(purchaseitems);
    // purchaseitems();
});

function displayItems(cb) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock Quantity']
            , colWidths: [10, 20, 20, 20, 20]
        })
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        cb()
    })
}

function purchaseitems() {
    inquirer.prompt([
        {
            message: "Enter the ID of the item you want to buy?",
            name: "what_id",
            type: "input"
        },
        {
            message: "How many units do you want to buy?",
            name: "number_units",
            type: "input"
        }
    ])
        .then(function (response) {
            console.log(response.what_id)
            console.log(response.number_units)
            connection.query("SELECT * FROM products WHERE id=?", [response.what_id], function (err, resp) {
                if (err) throw err;
                // console.log(resp);
                var usernumunits = parseInt(response.number_units)
                if (usernumunits <= resp[0].stock_quantity) {
                    connection.query("UPDATE products SET stock_quantity =? WHERE id=? ", [(parseInt(resp[0].stock_quantity) - usernumunits), response.what_id], function (err, res) {
                        console.log("Your total cost is: " + (usernumunits * resp[0].price))
                        // if (err) throw err;
                    });
                }
                else {
                    console.log("Not enough in Stock!");
                }
                displayItems(buyanother);
                // buyanother();
            });
        }
        )
}

function buyanother() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to buy another item?",
            choices: ["Yes", "No"],
            name: "selection"
        }
    ])
        .then(function (response) {
            switch (response.selection) {
                case "Yes":
                    displayItems(purchaseitems);
                    break;

                case "No":
                    connection.end();
                    break;
            }
        });
}