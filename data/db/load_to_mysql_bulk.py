import csv
import os
import config
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.exc import ProgrammingError
import warnings
import pymysql
import sys

user = "root"
pass_word = config.password
host = "127.0.0.1"
port = "3306"
charset = "utf8mb4"

def csv_to_mysql(load_sql, host, user, pass_word, port, charset):
 
    try:
        con = pymysql.connect(host=host,
                                user=user,
                                password=pass_word,
                                autocommit=True,
                                local_infile=1,
                                port = port,
                                charset = charset)
        print('Connected to DB: {}'.format(host))
        # Create cursor and execute Load SQL
        cursor = con.cursor()
        cursor.execute(load_sql)
        print('Succuessfully loaded the table from csv.')
        con.close()
       
    except Exception as e:
        print('Error: {}'.format(str(e)))
        sys.exit(1)

load_sql = """LOAD DATA LOCAL INFILE '../csv/final_merged_data.csv' 
            INTO TABLE alegorithm_db2.beers_and_reviews
            FIELDS TERMINATED BY ','
            ENCLOSED BY '"' 
            IGNORE 1 LINES;"""

csv_to_mysql(load_sql, host, user, pass_word, port, charset)
