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

BEERS_TABLENAME1 = "beer_styles_links"
engine.execute(f"DROP TABLE IF EXISTS {BEERS_TABLENAME1}")

df = pd.read_csv("../csv/beer_styles_links.csv").to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    dtype={
        "beer_style": sqlalchemy.types.String(length=300),
        "info_link": sqlalchemy.types.String(length=300),
        "image_link": sqlalchemy.types.String(length=300),
    },
)
