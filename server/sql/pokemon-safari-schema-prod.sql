drop database if exists pokemon_safari;
create database pokemon_safari;
use pokemon_safari;

-- Create Tables
create table app_role (
    app_role_id int primary key auto_increment,
    role_name varchar(25) not null
);

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(25),
    `password` varchar(200),
    disabled boolean not null default(0)
);

create table app_role_assignment (
    app_role_id int not null,
    app_user_id varchar(25) not null,
    constraint pk_app_role_assignment
		primary key(app_role_id, app_user_id)
);

create table pokemon_instance (
	pokemon_instance_id int primary key auto_increment,
    app_user_id int not null,
    pokemon_name varchar(25),
    max_hp int not null,
    attack int not null,
    defense int not null,
    special_attack int not null,
    special_defense int not null,
    speed int not null,
    constraint fk_pokemon_instance_app_user 
		foreign key(app_user_id)
		references app_user(app_user_id)
);

create table `area`(
	area_id int primary key auto_increment,
    area_name varchar(50)
);

create table area_encounter (
	area_id int not null,
    pokemon_name varchar(25),
    encounter_rate int,
    flee_rate int,
	constraint fk_area_encounter_area
		foreign key(area_id)
        references `area`(area_id)
);

insert into app_role(role_name) values
	('admin'),
	('user');
