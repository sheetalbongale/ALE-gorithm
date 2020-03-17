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
DATABASE = "beer_db"
TABLENAME = "review"

path = os.path.join( "..","data","beers.csv")
df = pd.read_csv(path)

engine = create_engine(f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}")

try:
    engine.execute(f"CREATE DATABASE {DATABASE}")

except ProgrammingError:
    warnings.warn(
        f"Could not create database {DATABASE}. Database {DATABASE} already exists."
    )
    pass

engine.execute(f"USE {DATABASE}")
engine.execute(f"DROP TABLE IF EXISTS {TABLENAME}")
df.to_sql(name=TABLENAME, con=engine)
