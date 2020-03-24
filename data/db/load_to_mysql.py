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
    dtype = {
    'beer_id': sqlalchemy.types.String(length=50), 
    'score': sqlalchemy.types.INTEGER, 
    'beer_name': sqlalchemy.types.String(length=300), 
    'brewery_id': sqlalchemy.types.String(length=50), 
    'state': sqlalchemy.types.String(length=50), 
    'country': sqlalchemy.types.String(length=10), 
    'beer_style': sqlalchemy.types.String(length=300), 
    'availability': sqlalchemy.types.String(length=100), 
    'abv': sqlalchemy.types.INTEGER, 
    'brewery_name': sqlalchemy.types.String(length=100), 
    'city': sqlalchemy.types.String(length=50), 
    'types': sqlalchemy.types.String(length=50), 
    'Category': sqlalchemy.types.String(length=50), 
    'ABV (min)': sqlalchemy.types.INTEGER, 
    'ABV (max)': sqlalchemy.types.INTEGER, 
    'ABV (avg)': sqlalchemy.types.INTEGER, 
    'IBU (min)': sqlalchemy.types.INTEGER, 
    'IBU (max)': sqlalchemy.types.INTEGER, 
    'IBU (avg)': sqlalchemy.types.INTEGER, 
    'SRM Range': sqlalchemy.types.String(length=50), 
    'Glassware': sqlalchemy.types.String(length=50), 
    'Description': sqlalchemy.types.String(length=500)
    })
