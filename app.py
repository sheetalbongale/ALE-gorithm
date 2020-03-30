from flask import Flask, render_template, request
import sqlalchemy as sql
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import config
import pymysql
import json
import pandas as pd
from flask import Response

#################################################
#       Flask Setup and Database Connection
#################################################
app = Flask(__name__)

USER = "root"
PASSWORD = config.password
HOST = "127.0.0.1"
PORT = "3306"
DATABASE = "alegorithm_db"

CONN = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

sql_engine = sql.create_engine(CONN)


#################################################
#                  Flask Routes
#################################################
@app.route('/')
def index():
    return render_template('index.html')


#-------------- recommender routes --------------#

@app.route('/recommender.html')
def recommender():
    return render_template('recommender.html')

@app.route("/selector/<selection>")
def selector(selection):
    TABLENAME = 'top_5_beers'
    query = f"SELECT beer_name FROM {TABLENAME} WHERE beer_style = '{selection}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"),mimetype='application/json')

@app.route("/top_beers")
def top_beers():
    TABLENAME = 'top_5_beers'
    query = f"SELECT * FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"),mimetype='application/json')

@app.route("/beer_style")
def beer_style():
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT * FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

@app.route("/beer_styles_links")
def beer_style_links():
    TABLENAME = 'beer_styles_links'
    query = f"SELECT * FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

#-------------- dashboard routes --------------#

@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')

@app.route("/brewery_data")
def brewery_data():
    TABLENAME = 'us_state_data'
    query = f"SELECT * FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

@app.route("/style_rank")
def style_rank():
    TABLENAME = 'beer_style_pop'
    query = f"SELECT beer_style, review_count FROM {TABLENAME} ORDER BY review_count DESC LIMIT 25"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

#-------------- breweries routes --------------#
@app.route('/breweries.html')
def breweries():
    return render_template('breweries.html')


#################################################
#                  Main
#################################################
if __name__ == '__main__':
    app.run()