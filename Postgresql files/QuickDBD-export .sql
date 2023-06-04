-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Centres" (
    "Centre_id" varchar(15)   NOT NULL,
    "Centres" Varchar(50)   NOT NULL,
    "Lat" float   NOT NULL,
    "Lon" float   NOT NULL,
    CONSTRAINT "pk_Centres" PRIMARY KEY (
        "Centre_id"
     )
);

CREATE TABLE "Zones" (
    "Zone_id" varchar(15)   NOT NULL,
    "Zones" varchar(50)   NOT NULL,
    "Lat" float   NOT NULL,
    "Lon" float   NOT NULL,
    CONSTRAINT "pk_Zones" PRIMARY KEY (
        "Zone_id"
     )
);

CREATE TABLE "Combined_Dataset" (
    "ID" varchar(10)   NOT NULL,
    "Province" varchar(40)   NOT NULL,
    "Centres" varchar(50)   NOT NULL,
    "Zones" varchar(50)   NOT NULL,
    "Neighbourhood" varchar(60)   NOT NULL,
    "Year" int   NOT NULL,
    "Centre_id" varchar(15)   NOT NULL,
    "Zone_id" varchar(15)   NOT NULL,
    "AR_Bachelor" float   NOT NULL,
    "AR_1_Bedroom" float   NOT NULL,
    "AR_2_Bedroom" float   NOT NULL,
    "AR_3_Bedroom" float   NOT NULL,
    "AR_Total" float   NOT NULL,
    "VR_Bachelor" float   NOT NULL,
    "VR_1_Bedroom" float   NOT NULL,
    "VR_2_Bedroom" float   NOT NULL,
    "VR_3_Bedroom" float   NOT NULL,
    "VR_Total" float   NOT NULL,
    "Units_Bachelor" float   NOT NULL,
    "Units_1_Bedroom" float   NOT NULL,
    "Units_2_Bedroom" float   NOT NULL,
    "Units_3_Bedroom" float   NOT NULL,
    "Units_Total" float   NOT NULL,
    CONSTRAINT "pk_Combined_Dataset" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Combined_Dataset" ADD CONSTRAINT "fk_Combined_Dataset_Centre_id" FOREIGN KEY("Centre_id")
REFERENCES "Centres" ("Centre_id");

ALTER TABLE "Combined_Dataset" ADD CONSTRAINT "fk_Combined_Dataset_Zone_id" FOREIGN KEY("Zone_id")
REFERENCES "Zones" ("Zone_id");

