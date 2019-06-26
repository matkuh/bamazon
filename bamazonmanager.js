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
    startmanager();
});

function startmanager() {
    inquirer.prompt([
        {
            type: "list",
            message: "Hi manager, what would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add to inventory", "Add New Products"],
            name: "selection"
        }
    ])
        .then(function (response) {
            switch (response.selection) {
                case "View Products":
                    displayItems();
                    setTimeout(startmanager, 100);
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to inventory":
                    displayItems();
                    setTimeout(addInventory, 100);
                    break;

                case "Add New Products":
                    console.log("hi")
                    addProducts();
                    break;

                case "Nothing":
                    connection.end();
                    break;
            }
        });
}

function displayItems() {
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
        // cb();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
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

function addInventory() {
    inquirer.prompt([
        {
            message: "Enter the ID of the item you want to change stock?",
            name: "what_id",
            type: "input"
        },
        {
            message: "How many units do you want to add to this stock?",
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
                connection.query("UPDATE products SET stock_quantity =? WHERE id=? ", [(parseInt(resp[0].stock_quantity) + usernumunits), response.what_id], function (err, res) {
                    // if (err) throw err;
                });
                console.log("That item now has a stock of: " + (resp[0].stock_quantity + usernumunits))
                startmanager(displayItems);
            });
        }
        )
}

function addProducts() {
    inquirer.prompt([
        {
            message: "Enter the name of the product",
            name: "what_name",
            type: "input"
        },
        {
            message: "Enter the department the product belongs in",
            name: "what_department",
            type: "input"
        },
        {
            message: "Enter the price of the product",
            name: "what_price",
            type: "input"
        },
        {
            message: "How much stock of that product?",
            name: "what_stock",
            type: "input"
        }
    ])
        .then(function (response) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: response.what_name,
                    department_name: response.what_department,
                    price: response.what_price,
                    stock_quantity: response.what_stock
                },
                function (err, res) {
                    if (err) throw err;
                    displayItems();
                    setTimeout(startmanager, 100);
                })
        }
        )
}

