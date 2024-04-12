# Import dependencies to read Database
import psycopg2 as pg
import pandas.io.sql as psql

# set up connection 
connection = pg.connect("host=localhost dbname=EV_Database user=your_username password=your_password") # Enter your own Postgresql username and password
dataframe = psql.read_sql('SELECT * FROM "car_data"', connection)
car_data = psql.read_sql_query('select * from product_category', connection)

#show the results
print(car_data)