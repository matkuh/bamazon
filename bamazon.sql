DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lion", "exotic pets", 20000, 100)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tiger", "exotic pets", 15000, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "fruit", 5, 1000)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grape", "fruit", 2, 10000)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airplane", "vehicles", 2000000, 5)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spaceship", "vehicles", 20000000, 2)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fruitloops", "cereal", 10, 100000)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chex", "cereal", 20, 100000000)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Handgun", "weapons", 500, 300)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocket Launcher", "weapons", 5000, 100)

