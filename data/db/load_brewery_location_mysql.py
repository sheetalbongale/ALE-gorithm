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

BEERS_TABLENAME1 = "brewery_addresses"
engine.execute(f"DROP TABLE IF EXISTS {BEERS_TABLENAME1}")

df = pd.read_csv("../csv/brewery_address_final.csv").to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    dtype = {
    'brewery_name': sqlalchemy.types.String(length=100), 
    'address': sqlalchemy.types.String(length=300), 
    'phone': sqlalchemy.types.String(length=50),  
    'latitude': sqlalchemy.types.Float, 
    'longitude': sqlalchemy.types.Float, 
    })
