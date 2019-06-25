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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // displayItems();
    // purchaseitems();
});

var table = new Table({
    head: ['ID', 'Name', 'Department', 'Price', 'Stock Quantity']
  , colWidths: [10, 20, 20, 20, 20]
})

displayItems();

var userquantity;

function purchaseitems() {
    inquirer.prompt([
        {
            message: "Enter the ID of the item you want to buy?",
            name: "what_id"
        },
        {
            message: "How many units do you want to buy?",
            name: "number_units"
        }
    ])
        .then(function (response) {
            updateItems();
             }
        )}


function displayItems(){
    connection.connect("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("-------------------------------------------")
        console.log(res)
        connection.end();
    })
}

function updateItems() {
    connection.query("SELECT * FROM products WHERE item_id =?", [response.what_id], function (err, res) {
        if (err) throw err;
        if (parseFloat(response.number_units) > res[0].stock_quantity) {
            connection.query("UPDATE product SET stock_quantity =?", [res.stock_quantity - response.number_units], function (err, res) {
                console.log("Your total cost is: " + (parseFloat(response.number_units) * (res.price)))
                if (err) throw err;
            });
        }
        else {
            console.log("Not enough in Stock!");
        }
    });
}