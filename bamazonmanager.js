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
    displayItems(startmanager);
});

function startmanager() {
    inquirer.prompt([
        {
            type: "list",
            message: "Hi manager, what would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add to inventory", "Add New Product"],
            name: "selection"
        }
    ])
        .then(function (response) {
            switch (response.selection) {
                case "View Products":
                    displayItems();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to inventory":
                    addInventory();
                    break;

                case "Add New Products":
                    addProducts();
                    break;

                case "Nothing":
                    connection.end();
                    break;
            }
        });
}

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
        cb();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",  function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock Quantity']
            , colWidths: [10, 20, 20, 20, 20]
        })
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        startmanager();

    })
}
