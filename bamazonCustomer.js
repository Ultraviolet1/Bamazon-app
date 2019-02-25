var inquirer = require("inquirer");

var mysql = require("mysql");
// connect to database
var connection = mysql.createConnection({
    host: 'LocalHost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

//scrollable list in inquirer prompt
var productList = [];

connection.connect(function (err) {
    //sends error message to console if one exists
    if (err) throw err;
    //logs success upon success
    console.log('Connnected to localhost ' + connection.port);
});

connection.query('SELECT * FROM products ORDER BY products.id', function (err, res) {
    //logs out error if present
    if (err) throw err;

    console.log("Welcome to Bamazon.com.  What would you like to buy today?")

    for (var i = 0; i < res.length; i++) {
        console.log('Product ID: ' + res[i].id + " | " + res[i].product_name + " | $" + res[i].price);
        //Builds selectable list for purchase prompt
        productList.push(res[i].product_name);
    }


    customerChoice();
});

var customerChoice = function () {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'Hello, what would you like to do?',
        choices: ['View Products for Sale', 'Quit Program']
    }).then(function (user) {
        switch (user.options) {
            case 'View Products for Sale':
                purchase();
                break;

            case 'Quit Program':
                connection.end();
                break;

            default:
                console.log("Sorry, that is unavailable, please try again.");
        };
    });
};

var purchase = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'product',
            message: "Which product would you like to purchase today?",
            //list built on initial connection 
            choices: productList
        },
        {
            type: 'input',
            name: 'amount',
            message: 'How many would you like to buy?',
            //makes sure an actual number was entered
            validate: function (value) {
                if (isNaN(value) == true || value == null) {
                    console.log('Please enter a number');
                    return false;
                }
                return true;
            }
        }

    ]).then(function (user) {
        //selections = integers to compare to database
        var stockQuantity = parseInt(answer.quantity);
        var productChosen = parseInt(answer.products);

        // Connects to SQL Database
        connection.query('SELECT * FROM bamazon_products', function (err, products) {
            if (err) throw err;

            //loop through data to check quantity
            for (let i = 0; i < products.length; i++) {
                if (stockQuantity <= products[i].stock_quantity && productChosen === products[i].id) {



                    //
                    if (user.amount > (res[0].stock_quantity - user.amount)) {
                        console.log('Sorry, we do not have that many.  Please select less to buy.\n')
                        //re-runs the program so that the user can try again
                        purchase();
                    } else {
                        //shows user what they purchased, how many, and at what price
                        console.log('You have purchased ' + user.amount + ' ' + user.product + '(s) at $' + res[0].price + '\n');
                        //gives user the total amount of purchase
                        console.log('Your total cost is $' + (res[0].price * user.amount) + '\n');
                        //updates databases
                        connection.query('UPDATE products SET stock_quantity = "' + (res[0].stock_quantity - user.amount) + '" WHERE product_name = "' + user.product + '"');
                        connection.query('UPDATE departments SET TotalSales = "' + (res[0].TotalSales + (res[0].price * user.amount)) + '" WHERE department_name = "' + res[0].department_name + '"')
                    }
                    customerChoice();
                };
    };
});

//ends connection to allow new program to be run if user wants
var disconnect = function () {
    inquirer.prompt({
        type: 'list',
        name: 'quit',
        message: 'Would you like to quit?',
        choices: ['Yes', 'No']
    }).then(function (user) {
        if (user.quit == 'Yes') {
            connection.end();
        } else {
            purchase();
        };
    });
}
})
};