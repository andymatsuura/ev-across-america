-- Active: 1708568248123@@127.0.0.1@5432@EV_Database
drop table if exists car_data;
drop table if exists station_data;

create table car_data(
    Brand VARCHAR(15) not null,
    Model VARCHAR(40) not null,
    AccelSec FLOAT not null,
    Top_Speed_MPH FLOAT not null,
    Range_miles FLOAT not null,
    Efficiency_WhM FLOAT not null,
    RapidCharge VARCHAR(10) not null,
    PowerTrain VARCHAR(5) not null,
    PlugType VARCHAR(40) not null,
    BodyStyle VARCHAR (15) not null,
    Segment VARCHAR(3) not null,
    Seats int not null,
    Price_USD float not null
);

create table station_data(
    
)
-- Import the CSV files via the copy method 
copy car_data(
    Brand,
    Model,
    AccelSec,
    Top_Speed_MPH,
    Range_miles,
    Efficiency_WhM,
    RapidCharge,
    PowerTrain,
    PlugType,
    BodyStyle,
    Segment,
    Seats,
    Price_USD
)
from '/tmp/snake_print.csv' DELIMITER ',' csv header;
-- create table station_data;

select max(Range_miles) from car_data GROUP BY model;
select * from car_data;