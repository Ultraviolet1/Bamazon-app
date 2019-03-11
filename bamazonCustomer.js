var inquirer = require("inquirer");

var mysql = require("mysql");
// connect to database
var connection = mysql.createConnection({
    host: 'LocalHost',
    port: 3306,
    user: 'root',
    password: '403700!Qq',
    database: 'bamazon'
});

var itemID;
var orderquantity;
var stockquantity;
var currentCost;
var totalCost = 0;
var totalSale;

//start of connection
connection.connect(function(err) {
  if (err) throw err;
  readProducts(); //list all products first
});//end of connection


function readProducts() {
  console.log("Listing all available products: \n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
  //   console.log(res); 
  for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].id +
          " || Product Name: " +
          res[i].product_name +
          " || Department Name: " +
          res[i].department_name +
          " || Price: " +
          res[i].price +
          " || Stock Quantity: " +
          res[i].stock_quantity
      );
    }
    purchase();
  });
}

function purchase() {

  //put inquirer inside the connection function
  inquirer.prompt([
    {
      name: "itemID",
      message: "What is the item ID of the product you are ordering?"
    }, {
      name: "quantity",
      message: "How many would you like to order?"
    }
  ]).then(function(answers) {
    
    //PLACE TO ADD INPUT VALIDATE!!!
    itemID = answers.id;
    orderquantity = parseInt(answers.quantity);
    orderProduct();
    totalSale = 0;
  }); //end of inquirer callback
}//end of purchase() function


function orderProduct() {
  
  var query = connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function(err, res) {
  stockquantity = res.stock_quantity;
  totalSale = res.product_sales;
  price = res.price;

  

  updateProduct(); //call updateProduct() inside the orderProduct() function
 
  });

}//end of orderProduct() function

function startOver() {
  inquirer
    .prompt( {
      type: "confirm",
      message: "Do you want to order more products? ",
      name: "confirm",
      default: false
    },)
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.confirm) {
        purchase();
      }
      else {
        console.log("Your total cost is: $", totalCost);
        connection.end();
      }
    });
}

function updateProduct() {
//  console.log(typeof(orderquantity));
 console.log("Updating below: \n");
 if((stockquantity-orderquantity)>0){
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stockquantity-orderquantity,
        product_sales: totalSale+=(price * orderquantity)
      },
      {
        id: itemID
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // readProducts();
    }
  );
   // logs the actual query being run
   console.log(query.sql);
   calculateCost();
   startOver();
}

  else{
 console.log("Sorry, we do not have that many!")
 console.log("Your total cost is: $", totalCost);
 connection.end();
  }
} //end of updateProruct() function


function calculateCost() {
  currentCost = price * orderquantity;
  totalCost+=currentCost;
  console.log("Your current cost is: $", currentCost);
  console.log("Your total cost is: $", totalCost);
  console.log("The " + itemID + " product total sale now is: $" + totalSale)
};