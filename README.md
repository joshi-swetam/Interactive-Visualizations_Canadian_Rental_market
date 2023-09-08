# Canadian Rental Market - Dashboard
## Inspiration 

Rents across the major cities surged due to higher net immigration.We wanted to build an app to get insights for the rental market with interactive visualizations.

Explore our app [here](https://canadian-rental-market.fly.dev/) deployed using [fly.io](https://fly.io/)


## App building process 
Building this app involved steps which are summarized in the diagram below 

![image](/Images/Block%20diagram.png)

## ETL

The data for the analysis was collected from Canada Mortgage and Housing Corporation (CMHC) can be found [here](https://www.cmhc-schl.gc.ca/en/professionals/housing-markets-data-and-research/housing-data/data-tables/).
Additional geographical information was [extracted](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/Resources/API_Calls.ipynb) using [Geopify](https://www.geoapify.com/).

For the transformation cleaning was done using jupyter. Data was transformed for both [relational](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/Resources/Extraction_tranformation.ipynb) and [non relational databases](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/api/tranformation/mongo_import.ipynb). 
The datasets for these were converted in [csv](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/tree/main/Postgresql%20files) and [json formats](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/tree/main/api/output).

We used MongoDB Atlas cloud database and AWS as a cloud service proivider for our project.

## Devlopment 
Following were used for the building process :
- Flask
- PyMongo
- Python
- Javascript
- CSS
- HTML
- D3
- Charts.js
- Plotly 
- Leaflet


## Description 
Flask code for the app can be located [here](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/app/app.py).

The dashboard for our app has click buttons for four tabs and html script can be located [here](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/app/templates/index.html). 

 The first one is yearly trend by years. It is built using [charts](!https://www.chartjs.org/) javascript library and code for the same is [here](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/app/static/js/app.js).


![image](/Images/dashboard%20page%201.png)
 It provides the insights for the Average rents and Vacancy rates across provinces over the years 2018-2022. Clickable buttons allow to add or delete the province based on the selection.

The second is the number of units available across provinces over the years 2018-2022 using charts library.
![Image](/Images/dashboard%20page%202.png)

The dropdown selection allows the user year selection.

The third visualization tab is the average rents and units available in the centres across provinces using [plotly](https://plotly.com/) and code is [here](https://github.com/RimpleDabas/Interactive-Visualizations_Canadian_Rental_market/blob/main/app/static/js/logic.js) along with forth tab. 
![Image](/Images/dashboard%20page%203.png)

The fourth visualization is bulit using [leaflet](https://leafletjs.com/) which has layers for the average rents and vacancy rates.The size of the markers are based on the data for the location.It allows the user to get the information using pop up feature as below 

![Image](/Images/dashboard%20page%204.png)

## Refrences
 - https://www.chartjs.org/docs/latest/
 - https://plotly.com/javascript/
 - Leaflet
 - Youtube videos




