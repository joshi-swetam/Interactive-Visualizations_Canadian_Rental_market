import numpy as np
import pandas as pd
from pprint import pprint
from pymongo import MongoClient
from flask import Flask, jsonify, render_template
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
    return render_template("index.html")

@app.route("/api")
def api():
    return (
        f"Welcome to the Rental Data Analysis API!<br/>"
        f"Available Routes:<br/>"
        f"===============================================================<br/>"
        f"/api/v1.0/province_centers<br/>"
        f"/api/v1.0/province_trend_by_year<br/>"
    )

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

@app.route("/api/v1.0/province_trend_by_year")
def get_province_trend_by_year():
    query = rental_information.aggregate( [
                {
                    "$project": 
                    {
                        "_id": 1 
                        , "Location.Province": 1
                        , "Year": 1
                        , "RentalInformation.AverageRent.Total": 
                            { "$cond": 
                                { 
                                    "if": { "$eq": ["$RentalInformation.AverageRent.Total", 0.0] }
                                    , "then": "null"
                                    , "else": "$RentalInformation.AverageRent.Total"  
                                }
                            }
                        , "RentalInformation.VacancyRate.Total": 
                            { "$cond": 
                                { 
                                    "if": { "$eq": ["$RentalInformation.VacancyRate.Total", 0.0] }
                                    , "then": "null"
                                    , "else": "$RentalInformation.VacancyRate.Total"  
                                }
                            }
                        , "RentalInformation.NumberofUnits.Total": 1
                    }
                },
                {
                    "$group": 
                    { 
                        "_id": { "Province": "$Location.Province", "Year": "$Year" } 
                        , "AverageRent":{ "$avg": "$RentalInformation.AverageRent.Total" }
                        , "VacancyRate":{ "$avg": "$RentalInformation.VacancyRate.Total" }
                        , "NumberOfUnits":{ "$sum": "$RentalInformation.NumberofUnits.Total" }
                    } 
                }
                , { "$sort":{"_id.Province":1, "_id.Year": 1} },
            ])

    df = pd.json_normalize(query)
    df = df.rename(columns={'_id.Province': 'Province', '_id.Year': 'Year'})
    df = df[["Province","Year","AverageRent","VacancyRate","NumberOfUnits"]]

    province_list = ["Alta", "B.C.", "Ont.", "Que", "Man."]

    output = []

    for province in province_list:
        dict = {}
        dict["Province"] = province

        province_df = df[df['Province'] == province]

        average_rents = []
        vacancy_rates = []
        number_of_units = []

        for index, row in province_df.iterrows():
            ar_dict = {}
            ar_dict["Year"] = row["Year"]
            ar_dict["AverageRent"] = row["AverageRent"]

            vr_dict = {}
            vr_dict["Year"] = row["Year"]
            vr_dict["VacancyRate"] = row["VacancyRate"]

            nu_dict = {}
            nu_dict["Year"] = row["Year"]
            nu_dict["NumberOfUnits"] = row["NumberOfUnits"]

            average_rents.append(ar_dict)
            vacancy_rates.append(vr_dict)
            number_of_units.append(nu_dict)

        dict["AverageRents"] = average_rents
        dict["VacancyRates"] = vacancy_rates
        dict["NumberOfUnits"] = number_of_units
        
        output.append(dict)

    return jsonify(output)

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

