create database bamazon;

use bamazon;

create table products (
	item_id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(item_id),
    product_name VARCHAR(80) NOT NULL,
    department_name VARCHAR(80) NOT NULL,
    price DECIMAL (5,2) NOT NULL,
    stock_quantity INT NOT NULL
);

insert into products (product_name, department_name, price, stock_quantity)
values ('iPhone case', 'Electronics', '15.49', '19');

insert into products (product_name, department_name, price, stock_quantity)
values ('Lawn chair', 'Furniture', '24.99', '7');

insert into products (product_name, department_name, price, stock_quantity)
values ('Fender Stratocaster electric guitar', 'Musical Instruments', '649.99', '12');

insert into products (product_name, department_name, price, stock_quantity)
values ('Pour over coffee/tea kettle', 'Kitchen', '22.49', '12');

insert into products (product_name, department_name, price, stock_quantity)
values ('Spalding basketball', 'Sporting Goods', '8.99', '15');

insert into products (product_name, department_name, price, stock_quantity)
values ('Mario Kart', 'Electronics', '59.99', '22');

insert into products (product_name, department_name, price, stock_quantity)
values ('Shrek 2', 'Movies', '6.99', '83');

insert into products (product_name, department_name, price, stock_quantity)
values ('Eloquent Javascript', 'Books', '31.96', '86');

insert into products (product_name, department_name, price, stock_quantity)
values ('Han Solo action figure', 'Toys', '7.49', '30');

insert into products (product_name, department_name, price, stock_quantity)
values ('The Real Book (B Flat, 6th Edition)', 'Books', '30.24', '59');

select * from products;
