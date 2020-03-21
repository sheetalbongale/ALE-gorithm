import csv
import os
import config
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import ProgrammingError
import warnings

USER = "root"
PASSWORD = config.password
HOST = "127.0.0.1"
PORT = "3306"
DATABASE = "beers_db"

engine = create_engine(f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}")

try:
    engine.execute(f"CREATE DATABASE {DATABASE}")
except ProgrammingError:
    warnings.warn(
        f"Could not create database {DATABASE}. Database {DATABASE} may already exist."
    )
    pass

engine.execute(f"USE {DATABASE}")

BEERS_TABLENAME1 = "beers"
engine.execute(f"DROP TABLE IF EXISTS {BEERS_TABLENAME1}")

df = pd.read_csv(
    os.path.join( "..","csv","beers.csv")
).to_sql(
    name=BEERS_TABLENAME1,
    con=engine,
    index=False,
    dtype = {'id': sqlalchemy.types.String(length=50), 
    'name': sqlalchemy.types.STRING(length=300),
    'brewery_id': sqlalchemy.types.String(length=50),
    'state': sqlalchemy.types.String(length=50),
    'country': sqlalchemy.types.String(length=50),
    'style': sqlalchemy.types.String(length=100),
    'availability': sqlalchemy.types.String(length=50),
    'abv': sqlalchemy.types.INTEGER, 
    'retired': sqlalchemy.types.String(length=50)
    })

