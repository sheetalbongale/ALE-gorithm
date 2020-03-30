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

BEERS_TABLENAME1 = "ba_beerstyles"
engine.execute(f"DROP TABLE IF EXISTS {BEERS_TABLENAME1}")

df = pd.read_csv("../../csv/ba_beerstyles.csv").to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    chunksize = 10000,
    dtype = {
    'Style': sqlalchemy.types.String(length=200),
    'Category': sqlalchemy.types.String(length=200),
    'ABV_min': sqlalchemy.types.FLOAT,
    'ABV_max': sqlalchemy.types.FLOAT,
    'ABV_avg': sqlalchemy.types.FLOAT,
    'IBU_min': sqlalchemy.types.INTEGER,
    'IBU_max': sqlalchemy.types.INTEGER,
    'IBU_avg': sqlalchemy.types.FLOAT,
    'SRM_min': sqlalchemy.types.INTEGER,
    'SRM_max': sqlalchemy.types.INTEGER,
    'Glassware': sqlalchemy.types.String(length=100),
    'Description': sqlalchemy.types.String(length=1500)
    })
