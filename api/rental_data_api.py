import numpy as np
import pandas as pd
from pprint import pprint
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

#################################################
# Database Setup
#################################################
mongo = MongoClient("mongodb+srv://swetajoshi:Password234@project3.yny9jap.mongodb.net/") # port=27017 for local

db = mongo['rental_data']
rental_information = db['canadian_rental_market']

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app, support_credentials=True)


#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    return (
        f"Welcome to the Rental Data Analysis API!<br/>"
        f"Available Routes:<br/>"
        f"===============================================================<br/>"
        f"Filter Endpoints</br>"
        f"===============================================================<br/>"
        f"/api/v1.0/location_filter/provinces<br/>"
        f"/api/v1.0/location_filter/centers/&lt;province&gt;<br/>"
        f"/api/v1.0/location_filter/zones/&lt;province&gt;/&lt;center&gt;<br/>"
        f"/api/v1.0/location_filter/neighbourhoods/&lt;province&gt;/&lt;center&gt;/&lt;zone&gt;<br/>"
        f"/api/v1.0/location_filter/years<br/>"
        f"/api/v1.0/location_filter/dwellingtypes<br/>"
        f"===============================================================<br/>"
        f"Endpoint to get rental information for unqiue province + center combinations<br/>"
        f"===============================================================<br/>"
        f"/api/v1.0/province_centers<br/>"
        f"===============================================================<br/>"
        f"Endpoint to get rental information based on selected parameters<br/>"
        f"<br/>"
        f"*NOTE: For following routes pass 'na' for cases where you wan to skip<br/>"
        f"any filter that comes before the one you want to filter for<br/></br>"
        f"Example: if you want to filter on year, use /api/v1.0/rental_data/na/na/na/na/2018<br/>"
        f"===============================================================<br/>"
        f"/api/v1.0/rental_data<br/>"
        f"/api/v1.0/rental_data/&lt;province&gt;<br/>"
        f"/api/v1.0/rental_data/&lt;province&gt;/&lt;center&gt;<br/>"
        f"/api/v1.0/rental_data/&lt;province&gt;/&lt;center&gt;/&lt;zone&gt;<br/>"
        f"/api/v1.0/rental_data/&lt;province&gt;/&lt;center&gt;/&lt;zone&gt;/&lt;neighbourhood&gt;/&lt;year&gt;<br/>"
        f"/api/v1.0/rental_data/&lt;province&gt;/&lt;center&gt;/&lt;zone&gt;/&lt;neighbourhood&gt;/&lt;year&gt;/&lt;dwellingtype&gt;"
    )

@app.route("/api/v1.0/rental_data" , defaults={'p': None, 'c': None, 'z': None, 'n': None, 'y': None, 'dt': None })
@app.route("/api/v1.0/rental_data/<p>" , defaults={'c': None, 'z': None, 'n': None, 'y': None, 'dt': None })
@app.route("/api/v1.0/rental_data/<p>/<c>" , defaults={'z': None, 'n': None, 'y': None, 'dt': None })
@app.route("/api/v1.0/rental_data/<p>/<c>/<z>" , defaults={'n': None, 'y': None, 'dt': None })
@app.route("/api/v1.0/rental_data/<p>/<c>/<z>/<n>" , defaults={'y': None, 'dt': None })
@app.route("/api/v1.0/rental_data/<p>/<c>/<z>/<n>/<y>" , defaults={'dt': None })
@app.route("/api/v1.0/rental_data/<p>/<c>/<z>/<n>/<y>/<dt>")
def get_rental_information(p, c, z, n, y, dt):

    output = get_rental_data(p, c, z, n, y, dt)

    return jsonify(output)

@app.route("/api/v1.0/province_centers")
def get_province_centers():
    rental_data = []

    query = rental_information.aggregate( 
                [
                    {"$group": { "_id": { "Province": "$Location.Province", "Center": "$Location.Center" } } }
                ]
            )
    
    df = pd.json_normalize(query)

    for index, row in df.iterrows():
         rental_data.append(get_rental_data(row["_id.Province"], row["_id.Center"], 'na', 'na', 'na', 'na', True))

    return jsonify(rental_data)

@app.route("/api/v1.0/location_filter/provinces")
def get_province():
    provinces = list(rental_information.find().distinct("Location.Province"))
    return jsonify(provinces)

@app.route("/api/v1.0/location_filter/centers/<province>")
def get_center(province):
    query = { "Location.Province": province }
    centers = list(rental_information.find(query).distinct("Location.Center"))
    return jsonify(centers)

@app.route("/api/v1.0/location_filter/zones/<province>/<center>")
def get_zones(province, center):
    query = { "Location.Province": province, "Location.Center": center }
    zones = list(rental_information.find(query).distinct("Location.Zone"))
    return jsonify(zones)

@app.route("/api/v1.0/location_filter/neighbourhoods/<province>/<center>/<zone>")
def get_neighbourhood(province, center, zone):
    query = { "Location.Province": province, "Location.Center": center, "Location.Zone": zone }
    neighbourhood = list(rental_information.find(query).distinct("Location.Neighbourhood"))
    return jsonify(neighbourhood)

@app.route("/api/v1.0/location_filter/years")
def get_years():
    years = list(rental_information.find().distinct("Year"))
    return jsonify(years)

@app.route("/api/v1.0/location_filter/dwellingtypes")
def get_dwellingtypes():
    dwellingtypes = list(rental_information.find().distinct("DwellingType"))
    return jsonify(dwellingtypes)

def get_query(p, c, z, n, y, dt):
    query = {}

    if(p is not None and p != "na"):
        query["Location.Province"] = p

    if(c is not None and c != "na"):
        query["Location.Center"] = c

    if(z is not None and z != "na"):
            query["Location.Zone"] = z

    if(n is not None and n != "na"):
            query["Location.Neighbourhood"] = n

    if(y is not None and y != "na"):
            query["Year"] = int(y)

    if(dt is not None and dt != "na"):
            query["DwellingType"] = dt

    return query

def get_average(df, field):
     vals = list(df.loc[df[field] != 0, field])
     if(len(vals) > 0):
          return sum(vals) / len(vals)
     else:
          return 0

def get_sum(df, field):
     vals = list(df.loc[df[field] != 0, field])
     if(len(vals) > 0):
          return sum(vals)
     else:
          return 0

def get_rental_data(p, c, z, n, y, dt, geo = False):
     # Create query based on parameter
    query = get_query(p, c, z, n, y, dt)

    df = pd.json_normalize(rental_information.find(query))

    output = {}

    #location rent
    filter_dict = {}
    filter_dict["Province"] = p
    filter_dict["Center"] = c
    filter_dict["Zone"] = z
    filter_dict["Neighbourhood"] = n
    filter_dict["Year"] = y
    filter_dict["DwellingType"] = dt

    output["Filters"] = filter_dict

    if(len(df.index) > 0):

        if(geo):
            geo_dict = {}
            geo_dict["Lat"] = df["Location.CenterGeo.lat"].iloc[0]
            geo_dict["Lon"] = df["Location.CenterGeo.lon"].iloc[0]
            output["Filters"]["CenterGeo"] = geo_dict

        #avearage rent
        ar_dict = {}
        ar_dict["Bachelor"] = get_average(df, "RentalInformation.AverageRent.Bachelor")
        ar_dict["1br"] = get_average(df, "RentalInformation.AverageRent.1br")
        ar_dict["2br"] = get_average(df, "RentalInformation.AverageRent.2br")
        ar_dict["3br+"] = get_average(df, "RentalInformation.AverageRent.3br+")
        ar_dict["Total"] = get_average(df, "RentalInformation.AverageRent.Total")

        #vacancy rate
        vr_dict = {}
        vr_dict["Bachelor"] = get_average(df, "RentalInformation.VacancyRate.Bachelor")
        vr_dict["1br"] = get_average(df, "RentalInformation.VacancyRate.1br")
        vr_dict["2br"] = get_average(df, "RentalInformation.VacancyRate.2br")
        vr_dict["3br+"] = get_average(df, "RentalInformation.VacancyRate.3br+")
        vr_dict["Total"] = get_average(df, "RentalInformation.VacancyRate.Total")

        #total number of units
        nu_dict = {}
        nu_dict["Bachelor"] = get_sum(df, "RentalInformation.NumberofUnits.Bachelor")
        nu_dict["1br"] = get_sum(df, "RentalInformation.NumberofUnits.1br")
        nu_dict["2br"] = get_sum(df, "RentalInformation.NumberofUnits.2br")
        nu_dict["3br+"] = get_sum(df, "RentalInformation.NumberofUnits.3br+")
        nu_dict["Total"] = get_sum(df, "RentalInformation.NumberofUnits.Total")

        output["AverageRents"] = ar_dict
        output["AvearageVacancytRate"] = vr_dict
        output["TotalNumberOfUnits"] = nu_dict

    return output

if __name__ == '__main__':
    app.run(debug=True)

