create table user (
	id int auto_increment not null primary key,
    email varchar(50) not null,
    username varchar(50) not null,
    first_name varchar(15) not null,
    password varchar(25) not null,
    date_created date not null,
    phone int null
);

create table goal (
	id int auto_increment not null primary key,
    name varchar(25) not null,
    amount int not null,
    start_date date not null,
    end_date date not null,
    notes varchar(100) not null,
    user_id int not null,
    foreign key (user_id) references user (id)
);

create table type (
	id int auto_increment not null primary key,
    name varchar(15) not null
);

create table category (
	id int auto_increment not null primary key,
    name varchar(15) not null,
    type_id int not null,
    foreign key (type_id) references type (id)
);

create table transaction (
	id int auto_increment not null primary key,
	identifier char(36) not null,
    amount int not null,
    start_date date not null,
    end_date date null,
    notes varchar(100) null,
    category_id int not null,
    user_id int not null,
    foreign key (category_id) references category (id),
    foreign key (user_id) references user (id)
);

insert into type (name) values ('income'), ('expense');