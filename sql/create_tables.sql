create database transaction_tracker;

use transaction_tracker;

create table user (
	id int primary key auto_increment not null,
    email varchar(50) not null,
    first_name varchar(20) not null,
    last_name varchar(20) null,
    password varchar(25) not null,
    date_created date not null
);

create table notification (
	id int primary key auto_increment not null,
    name varchar(25) not null
);

create table user_notification (
	user_id int not null,
    notification_id int not null,
    occurrence_rate varchar(10) not null,
    preferred_time time null,
    primary key (user_id, notification_id)
);

create table goal (
	id int primary key auto_increment not null,
    name varchar(25) not null,
    amount int not null,
    start_date date not null,
    end_date date not null,
    notes varchar(100) null,
    user_id int not null,
    foreign key (user_id) references user (id)
);

create table type (
	id int primary key auto_increment not null,
    name varchar(15) not null
);

create table transaction (
	id int primary key auto_increment not null,
    amount int not null,
    start_date date null,
    end_date date null,
    recurs bit not null,
    occurrence_rate varchar(10) null,
    notes varchar(100) null,
    type_id int not null,
    user_id int not null,
    foreign key (type_id) references type (id),
	foreign key (user_id) references user (id)
);
