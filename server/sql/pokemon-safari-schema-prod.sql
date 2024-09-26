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

create table user_role_assignment (
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

-- Set a known good state with dummy data 
delimiter //
create procedure set_known_good_prod_state()
begin

    -- Clear all tables in the required order
    delete from pokemon_instance; 
    delete from user_role_assignment;
    delete from area_encounter; 
    delete from app_role; 
    delete from area; 
    delete from app_user;

    -- Reset auto-increment values
    alter table pokemon_instance auto_increment = 1;
    alter table user_role_assignment auto_increment = 1;
    alter table area_encounter auto_increment = 1;
    alter table app_role auto_increment = 1;
    alter table area auto_increment = 1;
    alter table app_user auto_increment = 1;
	
    insert into app_role(role_name) values
		('admin'),
        ('user');
    
    insert into `area`(area_name) values
		('Sinnoh'),
        ('Kanto'), 
        ('Unova');
        
insert into area_encounter(area_id, pokemon_name, encounter_rate, flee_rate) values
        (1, 'pikachu', 87.3, 3),
        (2, 'pikachu', 87.3, 3),
        (1, 'spidops', 6, 13),
        (1, 'tyrantrum', 2, 10),
        (3, 'tyrantrum', 2, 10),
        (1, 'trumbeak', 31, 22),
        (2, 'trumbeak', 31, 22),
        (3, 'trumbeak', 31, 22),
        (1, 'feeroseed', 52, 6),
        (1, 'feeroseed', 52, 6),
        (2, 'fearow', 14, 31),
        (3, 'fearow', 14, 31),
        (1, 'bulbasaur', 25.5, 12),
        (2, 'charizard', 10, 15),
        (3, 'squirtle', 40, 8),
        (1, 'scyther', 17, 18),
        (2, 'electabuzz', 20.1, 13),
        (3, 'magmar', 22, 10),
        (1, 'gengar', 8.3, 25),
        (2, 'nidoran', 45, 5),
        (3, 'vaporeon', 27, 20),
        (1, 'eevee', 33.7, 12),
        (2, 'sandslash', 21, 19),
        (3, 'poliwrath', 11.5, 23),
        (1, 'pidgeotto', 50.2, 10),
        (3, 'alakazam', 15, 25),
        (2, 'machamp', 9.5, 17),
        (1, 'dragonite', 4, 30),
        (3, 'lapras', 12, 21),
        (2, 'rhydon', 19.8, 14),
        (1, 'nidoking', 16, 18),
        (3, 'arcanine', 23.6, 9);
end //
delimiter ;