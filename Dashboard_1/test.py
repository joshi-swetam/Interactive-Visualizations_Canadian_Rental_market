import numpy as np
import pandas as pd
from pprint import pprint
from pymongo import MongoClient
mongo = MongoClient("mongodb+srv://rimpledabas:Password123@project3.yny9jap.mongodb.net/") # port=27017 for local

db = mongo['rental_data']
rental_information = db['canadian_rental_market']
rental_information.find_one()
query = {'Location.Province': 'Nfld.Lab.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result1 = list(rental_information.find(query, fields))
query = {'Location.Province': 'N.S.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result2 = list(rental_information.find(query, fields))
query = {'Location.Province': 'N.B.' }
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result3= list(rental_information.find(query, fields))
query = {'Location.Province': 'Que'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result4 = list(rental_information.find(query, fields))
query = {'Location.Province': 'Ont.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result5 = list(rental_information.find(query, fields))
query = {'Location.Province': 'Man.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result6 = list(rental_information.find(query, fields))
query = {'Location.Province': 'Sask.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result7 = list(rental_information.find(query, fields))
query = {'Location.Province': 'Alta'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result8 = list(rental_information.find(query, fields))
query = {'Location.Province': 'B.C.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}
# Cast the results as a list and save the results to a variable
result9 = list(rental_information.find(query, fields))
query = {'Location.Province': 'Nfld.Lab.'}
fields = {"Location.Province": 1, "Location.Center" :1, "Location.CenterGeo" : 1,"RentalInformation.AverageRent.Total": 1,"RentalInformation.VacancyRate.Total": 1,"RentalInformation.NumberofUnits.Total": 1,'Year' : 1}

# Cast the results as a list and save the results to a variable
results = list(rental_information.find(query, fields))

def province(result):
    df = pd.json_normalize(result)
    df = df[['Year', 'Location.Province', 'Location.Center',
       'Location.CenterGeo.lat', 'Location.CenterGeo.lon',
       'RentalInformation.AverageRent.Total',
       'RentalInformation.VacancyRate.Total','RentalInformation.NumberofUnits.Total']]
    df= df.rename(columns = {'Location.Province': 'Province', 'Location.Center': 'Center',
       'Location.CenterGeo.lat' : 'Lat', 'Location.CenterGeo.lon': 'Lon',
       'RentalInformation.AverageRent.Total' :'Average Rent','RentalInformation.VacancyRate.Total' : 'Vacancy Rate','RentalInformation.NumberofUnits.Total' : 'Units' })
    return df
    
NF_df = province(result1)
NS_df = province(result2)
NB_df = province(result3)
Que_df =province(result4)
ON_df = province(result5)
Man_df = province(result6)
SK_df = province(result7)
AL_df = province(result8)
BC_df = province(result9)

final_df = pd.concat([NF_df , NS_df ,NB_df , Que_df ,ON_df ,Man_df ,SK_df ,AL_df ,BC_df])

#Create a funtion to extract based on the province and year 
def data_set(df,Province,Year,column):
    df = df.loc[(df["Year"] == Year ) & (df["Province"] == Province)]
    df_Province = df[(df[column]!=0)]
    return df_Province

Year = 2022
column = "Average Rent"
df_Ontario = data_set(final_df, "Ont.",Year,column)
df_Quebec = data_set(final_df,"Que",Year,column)
df_BC = data_set(final_df, "B.C.",Year,column)
df_Alberta = data_set(final_df, "Alta",Year,column)
df_sask = data_set(final_df,"Sask.",Year,column)
df_NovaScotia = data_set(final_df,"N.S.",Year,column)

def Centres_list(df, Province):
    df_1 = df.groupby(['Center']).mean()
    Centres = df['Center'].unique()
    df_1['Centres'] = Centres
    df_1['Province'] = Province
    output =[]

    for index, row in df_1.iterrows():
        dict_df = {}
        dict_df['Province'] = row["Province"]
        dict_df["Centres"] = row["Centres"]
        dict_df["Year"] = row["Year"]
        dict_df["Lat"] = row['Lat']
        dict_df["Lon"] = row['Lon']
        dict_df["AverageRent"] = row["Average Rent"]
        dict_df["VacancyRate"] = row["Vacancy Rate"]
        dict_df["Units"] = row['Units']
        output.append(dict_df)
        
    return(output)

Ontario = Centres_list(df_Ontario,"Ontario")
Quebec = Centres_list(df_Quebec,"Quebec")
BC = Centres_list(df_BC, "British Columbia")
Alberta = Centres_list(df_Alberta,"Alberta")
NS = Centres_list(df_NovaScotia, "Nova Scotia")
Sask= Centres_list(df_sask, "Saskatchewan")
list_2022 = [["Ontario", "Quebec", "British Columbia", "Alberta","Nova Scotia","Saskatchewan"],[Ontario,Quebec, BC ,Alberta ,NS ,Sask]]

import json
with open("data_2022.json", "w") as outfile:
    json.dump(list_2022, outfile)