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

-- create table station_data;
create table station_data(
    Fuel_Type_Code VARCHAR(50),
    Station_Name VARCHAR (200),
    Street_Address VARCHAR (201),
    City VARCHAR (202),
    State VARCHAR(5),
    ZIP VARCHAR(51),
    Station_Phone VARCHAR (52), 
    Status_Code VARCHAR (25),
    Groups_With_Access_Code VARCHAR (203),
    Access_Days_Time VARCHAR (204),
    Cards_Accepted VARCHAR (205),
    EV_Level1_EVSE_Num varchar (50),
    EV_Level2_EVSE_Num VARCHAR (50),
    EV_DC_Fast_Count VARCHAR (50),
    EV_Other_Info VARCHAR (206),
    EV_Network VARCHAR (207),
    EV_Network_Web VARCHAR (208),
    Geocode_Status VARCHAR (209),
    Latitude FLOAT,
    Longtitude FLOAT,
    Date_Last_Confirmed VARCHAR (50),
    ID VARCHAR (50),
    Updated_At VARCHAR (40),
    Owner_Type_Code VARCHAR (53),
    Open_Date varchar(50),
    EV_Connector_Types VARCHAR(54),
    Country VARCHAR (5),
    Facility_Type VARCHAR (150),
    EV_Pricing VARCHAR (151),
    EV_Workplace_Charging VARCHAR (25)
);
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

copy station_data(
    Fuel_Type_Code,
    Station_Name,
    Street_Address,
    City,
    State,
    ZIP,
    Station_Phone,
    Status_Code,
    Groups_With_Access_Code,
    Access_Days_Time,
    Cards_Accepted,
    EV_Level1_EVSE_Num,
    EV_Level2_EVSE_Num,
    EV_DC_Fast_Count,
    EV_Other_Info,
    EV_Network,
    EV_Network_Web,
    Geocode_Status,
    Latitude,
    Longtitude,
    Date_Last_Confirmed,
    ID,
    Updated_At,
    Owner_Type_Code,
    Open_Date,
    EV_Connector_Types,
    Country,
    Facility_Type,
    EV_Pricing,
    EV_Workplace_Charging
)
from '/tmp/andy_snake_df.csv' DELIMITER ',' csv header;

select max(Range_miles) from car_data GROUP BY model;
select * from car_data;

select * from station_data;