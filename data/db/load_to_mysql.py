import csv
import os
import config
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.exc import ProgrammingError
import warnings
import pymysql

USER = "root"
PASSWORD = config.password
HOST = "127.0.0.1"
PORT = "3306"
DATABASE = "alegorithm_db"

engine = create_engine(f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}")

try:
    engine.execute(f"CREATE DATABASE {DATABASE}")
except ProgrammingError:
    warnings.warn(
        f"Could not create database {DATABASE}. Database {DATABASE} may already exist."
    )
    pass

engine.execute(f"USE {DATABASE}")

BEERS_TABLENAME1 = "beers_and_reviews"
engine.execute(f"DROP TABLE IF EXISTS {BEERS_TABLENAME1}")

df = pd.read_csv("../csv/final_merged_data.csv").to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    chunksize = 10000,
    dtype = {
    'beer_id': sqlalchemy.types.INTEGER,
    'score': sqlalchemy.types.FLOAT,
    'beer_name': sqlalchemy.types.String(length=300),
    'brewery_id': sqlalchemy.types.INTEGER,
    'state': sqlalchemy.types.String(length=50),
    'country': sqlalchemy.types.String(length=10),
    'beer_style': sqlalchemy.types.String(length=300),
    'availability': sqlalchemy.types.String(length=100),
    'abv': sqlalchemy.types.FLOAT,
    'brewery_name': sqlalchemy.types.String(length=100),
    'city': sqlalchemy.types.String(length=50),
    'types': sqlalchemy.types.String(length=50),
    'Category': sqlalchemy.types.String(length=50),
    'ABV_min': sqlalchemy.types.FLOAT,
    'ABV_max': sqlalchemy.types.FLOAT,
    'ABV_avg': sqlalchemy.types.FLOAT,
    'IBU_min': sqlalchemy.types.INTEGER,
    'IBU_max': sqlalchemy.types.INTEGER,
    'IBU_avg': sqlalchemy.types.FLOAT,
    'SRM_min': sqlalchemy.types.String(length=50),
    'SRM_max': sqlalchemy.types.String(length=50),
    'Glassware': sqlalchemy.types.String(length=50),
    'Description': sqlalchemy.types.String(length=1500)
    })
