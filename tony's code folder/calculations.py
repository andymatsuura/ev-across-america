


# Aggregate funcitons to prove efficiency between gas powered and battery powered cars

# find the distance for cross country trip (in miles)

trip = 2779 #miles

# the average range of a nissan leaf is 150 miles on a single charge
# find out how many charges it would take to travel across the US
full_battery = 150 #miles
charges_over_trip = trip / full_battery
print(f'You would need to charge your EV a total of {round(charges_over_trip, 2)} times')

# find the average efficient cost to charge an electric vehichle over the trip

eff_charge_cost = 12
total_eff_cost = eff_charge_cost * charges_over_trip
print(f"Efficiently, it would cost ${round(total_eff_cost, 2)} to drive across the US in an electric vehichle.")

# find the average fast cost to charge an electric vehichle over the trip 

fast_charge_cost = 16
total_fast_cost = fast_charge_cost * charges_over_trip
print(f"For the fastest charging, it would cost ${round(total_fast_cost, 2)} to drive across the US")
