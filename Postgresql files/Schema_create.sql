-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Provinces" (
    "Province_id" varchar   NOT NULL,
    "Provinces" varchar   NOT NULL,
    CONSTRAINT "pk_Provinces" PRIMARY KEY (
        "Province_id"
     )
);

CREATE TABLE "Centres" (
    "Centre_id" varchar   NOT NULL,
    "Centres" varchar   NOT NULL,
    "Lat" float   NOT NULL,
    "Lon" float   NOT NULL,
    CONSTRAINT "pk_Centres" PRIMARY KEY (
        "Centre_id"
     )
);

CREATE TABLE "Zones" (
    "Zone_id" varchar   NOT NULL,
    "Zones" varchar   NOT NULL,
    "Lat" float   NOT NULL,
    "Lon" float   NOT NULL,
    CONSTRAINT "pk_Zones" PRIMARY KEY (
        "Zone_id"
     )
);

CREATE TABLE "Dwelling" (
    "Dwelling_id" varchar   NOT NULL,
    "Dwelling_Type" varchar   NOT NULL,
    CONSTRAINT "pk_Dwelling" PRIMARY KEY (
        "Dwelling_id"
     )
);

CREATE TABLE "Neighbourhood" (
    "Neighbourhood_id" varchar   NOT NULL,
    "Neighbourhood" varchar   NOT NULL,
    CONSTRAINT "pk_Neighbourhood" PRIMARY KEY (
        "Neighbourhood_id"
     )
);

CREATE TABLE "Rental" (
    "Rent_ID" varchar   NOT NULL,
    "Bachelor" float   NOT NULL,
    "1_Bedroom" float   NOT NULL,
    "2_Bedroom" float   NOT NULL,
    "3_Bedroom" float   NOT NULL,
    "Total" float   NOT NULL,
    "Year" int   NOT NULL,
    "Province_id" varchar   NOT NULL,
    "Centre_id" varchar   NOT NULL,
    "Zone_id" varchar   NOT NULL,
    "Neighbourhood_id" varchar  NOT NULL,
    "Dwelling_id" varchar NOT NULL,
    CONSTRAINT "pk_Rental" PRIMARY KEY (
        "Rent_ID"
     )
);

CREATE TABLE "Vacancy_Rate" (
    "VR_ID" varchar   NOT NULL,
    "Bachelor" float   NOT NULL,
    "1_Bedroom" float   NOT NULL,
    "2_Bedroom" float   NOT NULL,
    "3_Bedroom" float   NOT NULL,
    "Total" float   NOT NULL,
    "Year" int   NOT NULL,
    "Province_id" varchar   NOT NULL,
    "Centre_id" varchar   NOT NULL,
    "Zone_id" varchar   NOT NULL,
    "Neighbourhood_id" varchar   NOT NULL,
    "Dwelling_id" varchar   NOT NULL,
    CONSTRAINT "pk_Vacancy_Rate" PRIMARY KEY (
        "VR_ID"
     )
);

CREATE TABLE "Number_of_Units" (
    "Units_ID" varchar   NOT NULL,
    "Bachelor" float   NOT NULL,
    "1_Bedroom" float   NOT NULL,
    "2_Bedroom" float   NOT NULL,
    "3_Bedroom" float   NOT NULL,
    "Total" float   NOT NULL,
    "Year" int   NOT NULL,
    "Province_id" varchar   NOT NULL,
    "Centre_id" varchar   NOT NULL,
    "Zone_id" varchar   NOT NULL,
    "Neighbourhood_id" varchar  NOT NULL,
    "Dwelling_id" varchar   NOT NULL,
    CONSTRAINT "pk_Number_of_Units" PRIMARY KEY (
        "Units_ID"
     )
);

ALTER TABLE "Rental" ADD CONSTRAINT "fk_Rental_Province_id" FOREIGN KEY("Province_id")
REFERENCES "Provinces" ("Province_id");

ALTER TABLE "Rental" ADD CONSTRAINT "fk_Rental_Centre_id" FOREIGN KEY("Centre_id")
REFERENCES "Centres" ("Centre_id");

ALTER TABLE "Rental" ADD CONSTRAINT "fk_Rental_Zone_id" FOREIGN KEY("Zone_id")
REFERENCES "Zones" ("Zone_id");

ALTER TABLE "Rental" ADD CONSTRAINT "fk_Rental_Neighbourhood_id" FOREIGN KEY("Neighbourhood_id")
REFERENCES "Neighbourhood" ("Neighbourhood_id");

ALTER TABLE "Rental" ADD CONSTRAINT "fk_Rental_Dwelling_id" FOREIGN KEY("Dwelling_id")
REFERENCES "Dwelling" ("Dwelling_id");

ALTER TABLE "Vacancy_Rate" ADD CONSTRAINT "fk_Vacancy_Rate_Province_id" FOREIGN KEY("Province_id")
REFERENCES "Provinces" ("Province_id");

ALTER TABLE "Vacancy_Rate" ADD CONSTRAINT "fk_Vacancy_Rate_Centre_id" FOREIGN KEY("Centre_id")
REFERENCES "Centres" ("Centre_id");

ALTER TABLE "Vacancy_Rate" ADD CONSTRAINT "fk_Vacancy_Rate_Zone_id" FOREIGN KEY("Zone_id")
REFERENCES "Zones" ("Zone_id");

ALTER TABLE "Vacancy_Rate" ADD CONSTRAINT "fk_Vacancy_Rate_Neighbourhood_id" FOREIGN KEY("Neighbourhood_id")
REFERENCES "Neighbourhood" ("Neighbourhood_id");

ALTER TABLE "Vacancy_Rate" ADD CONSTRAINT "fk_Vacancy_Rate_Dwelling_id" FOREIGN KEY("Dwelling_id")
REFERENCES "Dwelling" ("Dwelling_id");

ALTER TABLE "Number_of_Units" ADD CONSTRAINT "fk_Number_of_Units_Province_id" FOREIGN KEY("Province_id")
REFERENCES "Provinces" ("Province_id");

ALTER TABLE "Number_of_Units" ADD CONSTRAINT "fk_Number_of_Units_Centre_id" FOREIGN KEY("Centre_id")
REFERENCES "Centres" ("Centre_id");

ALTER TABLE "Number_of_Units" ADD CONSTRAINT "fk_Number_of_Units_Zone_id" FOREIGN KEY("Zone_id")
REFERENCES "Zones" ("Zone_id");

ALTER TABLE "Number_of_Units" ADD CONSTRAINT "fk_Number_of_Units_Neighbourhood_id" FOREIGN KEY("Neighbourhood_id")
REFERENCES "Neighbourhood" ("Neighbourhood_id");

ALTER TABLE "Number_of_Units" ADD CONSTRAINT "fk_Number_of_Units_Dwelling_id" FOREIGN KEY("Dwelling_id")
REFERENCES "Dwelling" ("Dwelling_id");
