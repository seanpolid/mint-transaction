create database transaction_tracker;

use transaction_tracker;

create table if not exists user (
	id int auto_increment not null primary key,
    email varchar(50) not null,
    username varchar(50) not null,
    first_name varchar(15) not null,
    password varchar(25) not null,
    date_created date not null,
    phone int null
);

create table if not exists goal (
	id int auto_increment not null primary key,
    name varchar(25) not null,
    amount int not null,
    start_date date not null,
    end_date date not null,
    user_id int not null,
    foreign key (user_id) references user (id)
);

create table if not exists type (
	id int auto_increment not null primary key,
    name varchar(15) not null
);

create table if not exists category (
	id int auto_increment not null primary key,
    name varchar(15) not null,
    type_id int not null,
    foreign key (type_id) references type (id)
);

create table if not exists transaction (
	id int auto_increment not null primary key,
    amount int not null,
    start_date date not null,
    end_date date null,
    notes varchar(100) null,
    category_id int not null,
    user_id int not null,
    foreign key (category_id) references category (id),
    foreign key (user_id) references user (id)
);
