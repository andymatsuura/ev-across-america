# ev-across-america
project 3 questions: can you drive an EV across America? What are the challenges to making this happen. Should we really have range anxiety? Can this anxiety be quelled based on the type of EV you purchase?



# Engineering/Database

## Summary and Instructions
For this section of the full stack project we wanted to integrate the data
we managed to pull from online resources into a database so the users 
viewing this project can not only see the possibilities of driving an electric vehichle across the US, but can effectively make a fact driven decision on which Electric Vehichle they can purchase based on budget and over all EV needs.

## ETL Process
The initial phases of the ETL process included the utilization of Pandas to create Dataframes that we could transform before storing it into our SQL Database. Most notably, snake_casing all of the csv files to avoid errors while importing them into SQL and, formulas executed with numpy to convert data from the metric system to imperial. The decision was made also to use Seaborn, which is a dependency built on top of Matplotlib to create more visually appealing graphs, and above all to add inclusivity, the color palette "colorblind" was chosen for the graphs in the Car_Data.ipynb file. 


## Choice of storing data
Provided the given csv files were all structured and could follow ACID requirements, a PostgreSQL database suited best for storage neccessities. Inititialized in pgAdmin 4, the Database named "EV_Database" was created and connected via VS Code. From there, an assortment of tables were created in the schema.sql file including car_data, station_data, ev_sales, and us_ev_stations. Utilizing the copy method, the transformed csv files that underwent an ETL process were successfully imported into our database. 

### Further manipulation of data
To provide more assurance to users as to how feasible it would be to purchase an electric vehichle to drive across the US, a query was ran to show (from least expensive to most), a table of Brands/Models of EV's and their respective price. Along with other queries demonstrating locations of EV stations and their latitude/longitude, the difference of amounts of EV Stations from the year 2011 to 2023, and purchase trends of EV's in the years 2011, 2015, and 2019.

## Sources for Engineering