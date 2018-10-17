// Dependencies
require("dotenv").config();
var mysql = require("mysql");
//var inquirer = require("inquirer");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    promptUserPurchase()

  });
}


// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole non-zero number.';
  }
};

// Start of Prompt
function promptUserPurchase() {
  //// promptUserPurchase will prompt the user for the item/quantity they would like to purchase

  inquirer.prompt([{
    type: 'input',
    name: 'Item_id',
    message: 'Please enter the Item ID which you would like to purchase.',
    validate: validateInput,
    filter: Number
  },
  {
    type: 'input',
    name: 'Stock_quantity',
    message: 'How many do you need?',
    validate: validateInput,
    filter: Number

  }]).then(function (input) {
    console.log('Customer has selected: \n    item_id = ' + input.Item_id + '\n    Stock_quantity = ' + input.Stock_quantity);

    var item = input.Item_id;
    var quantity = input.Stock_quantity;

    // Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, { Item_id: item }, function (err, data) {
      if (err) throw err;

      // If the user has selected an invalid item ID, data attay will be empty
      // console.log('data = ' + JSON.stringify(data));

      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayInventory();

      } else {
        var productData = data[0];

        // console.log('productData = ' + JSON.stringify(productData));
        // console.log('productData.stock_quantity = ' + productData.stock_quantity);

        // If the quantity requested by the user is in stock
        if (quantity <= productData.Stock_quantity) {
          console.log('Congratulations, the product you requested is in stock! Placing order!');
          console.log('Your order has been placed! Your total is $' + productData.Price * quantity);
          console.log('Thank you for shopping with us!');

          // Construct the updating query string
          var updateQueryStr = 'UPDATE products SET Stock_quantity = ' + (productData.Stock_quantity - quantity) + ' WHERE item_id = ' + item;
          // console.log('updateQueryStr = ' + updateQueryStr);

          // Update the inventory
          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err;


            console.log("\n---------------------------------------------------------------------\n");

            // End the database connection
            connection.end();
          })
        } else {
          console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
          console.log('Please modify your order.');
          console.log("\n---------------------------------------------------------------------\n");

          displayInventory();
        }
      }
    })
  })
}
// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.log('Existing Inventory: ');
    console.log('...................\n');

    var strOut = '';
    for (var i = 0; i < data.length; i++) {
      strOut = '';
      strOut += 'Item_iD: ' + data[i].Item_id + '  //  ';
      strOut += 'Product_name: ' + data[i].Product_name + '  //  ';
      strOut += 'Department_name: ' + data[i].Department_name + '  //  ';
      strOut += 'Price: $' + data[i].Price + '\n';
      strOut += 'Stock_quantity:' + data[i].Price + '\n';

      console.log(strOut);
    }

    console.log("---------------------------------------------------------------------\n");

    //Prompt the user for item/quantity they would like to purchase
    promptUserPurchase();
  })
}


