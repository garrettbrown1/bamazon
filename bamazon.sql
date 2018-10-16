-- Creates the table "people" within animals_db --
CREATE TABLE Products (
 -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  Item_id INT NOT NULL AUTO_INCREMENT,
  Product_name VARCHAR (50)  NOT NULL,
  Department_name VARCHAR (25)  NOT NULL,
  Price Decimal (6,2) NOT NULL,
  Stock_quantity INTEGER(11)  NOT NULL,
  Primary Key (item_id)
  );
  
--Inserting Data into new rows-- 
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Canon EOS-1D X Mark ii", "Canon", 5499.00, 10); 

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Canon EOS 5D Mark IV", "Canon", 3099.00, 10);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Canon EOS C200", "Canon", 7499.00, 10);


INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Sony F-S5M2", "Sony", 4748.00, 5);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Sony Alpha a7 III", "Sony", 1998.00, 7);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Sony Alpha a7R III", "Sony", 2998.00, 2);


INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("GH5S", "Panasonic", 2297.99, 10);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("GH5", "Panasonic", 1697.99, 5);


INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Blackmagic Pocket Cinema  Camera", "Blackmagic" , 1295.00, 1);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Blackmagic URSA Mini Pro", "Blackmagic" , 5995.00, 3);




