Drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
id int not null auto_increment,
product_name varchar(200) not null,
department_name varchar(200) not null,
price int(25) not null,
stock_quantity int(25) not null,
primary key (id)
);

insert into products(product_name, department_name, price, stock_quantity)
value("Armchair", "Furniture", 300, 20);

insert into products(product_name, department_name, price, stock_quantity)
value("Sectional", "Furniture", 1700, 4);

insert into products(product_name, department_name, price, stock_quantity)
value("Dinning Table and chairs", "Furniture", 999, 6);

insert into products(product_name, department_name, price, stock_quantity)
value("Hammock", "Outdoor", 55, 5);

insert into products(product_name, department_name, price, stock_quantity)
value("Globe String Lights", "Outdoor", 30, 10);

insert into products(product_name, department_name, price, stock_quantity)
value("Birdbath", "Outdoor", 150, 5);

insert into products(product_name, department_name, price, stock_quantity)
value("Calvin Klein Perfume", "Luxury Beauty", 110, 15);

insert into products(product_name, department_name, price, stock_quantity)
value("Chi Flat Iron", "Luxury Beauty", 156, 7);

insert into products(product_name, department_name, price, stock_quantity)
value("Nail Polish", "Luxury Beauty", 15, 20);

insert into products(product_name, department_name, price, stock_quantity)
value("Fitness Tracker", "Sports", 65, 21);