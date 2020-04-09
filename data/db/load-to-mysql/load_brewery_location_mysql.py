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

df = pd.read_csv("../csv/brewery_addresses_final.csv").to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    dtype={
        "brewery_name": sqlalchemy.types.String(length=300),
        "street": sqlalchemy.types.String(length=300),
        "city": sqlalchemy.types.String(length=100),
        "locality": sqlalchemy.types.String(length=100),
        "zip_code": sqlalchemy.types.String(length=100),
        "full_address": sqlalchemy.types.String(length=500),
    },
)
