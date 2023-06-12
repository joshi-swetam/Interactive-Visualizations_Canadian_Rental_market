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
        f"/api/v1.0/province_trend_by_year<br/>"
    )

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

if __name__ == '__main__':
    app.run(debug=True)

