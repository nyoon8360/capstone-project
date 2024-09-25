drop database if exists pokemon_safari_test;
create database pokemon_safari_test;
use pokemon_safari_test;

-- Create Tables
create table app_role (
    app_role_id int primary key auto_increment,
    role_name varchar(25) not null
);

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(25),
    password varchar(200),
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

-- Set a known good state with dummy data 
delimiter //
create procedure set_known_good_state()
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
    
    insert into app_user(username, `password`) values
		('user1', 'password1'),
        ('user2', 'password2'),
        ('user3', 'password3');
    
    insert into user_role_assignment(app_role_id, app_user_id) values
		(1, 1),
        (2, 2),
        (2, 3);
        
	insert into pokemon_instance(pokemon_name, app_user_id, max_hp, attack, defense, special_attack, special_defense, speed) values
		('Pikachu', 2, 35, 55, 40, 50, 60, 90),
        ('Spidops', 3, 60, 79, 92, 52, 86, 35),
        ('Tyrantrum', 3, 82, 121, 119, 69, 59, 71),
        ('Trumbreak', 2, 55, 85, 50, 40, 50, 75),
        ('Ferroseed', 3, 44, 50, 91, 24, 86, 10),
        ('Fearow', 2, 65, 90, 65, 61, 61, 100);
    
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
        (3, 'fearow', 14, 31);

end //
delimiter ;

