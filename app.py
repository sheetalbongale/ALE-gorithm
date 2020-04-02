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


# populate category dropdown
@app.route("/category_names")
def category():
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT DISTINCT Category FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

# populate beerstyle dropdown
@app.route("/beerstyle_names/<category>")
def beer_style(category):
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT Style FROM {TABLENAME} WHERE Category = '{category}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')
 
# # selector for beerstyle ****broken top_5_beers has been changed****
# @app.route("/beerstyle/<beerstyle>")
# def selector1(beerstyle):
#     TABLENAME = 'top_5_beers'
#     query = f"SELECT beer_name FROM {TABLENAME} WHERE beer_style = '{beerstyle}'"
#     df = pd.read_sql_query(query, sql_engine)
#     # return json of the dataframe
#     return Response(df.to_json(orient = "records"),mimetype='application/json')

# selector for category - Works 
@app.route("/style/<Style>")
def selector2(Style):
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT * FROM {TABLENAME} WHERE Style = '{category}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

# @app.route("/selector/<selection>") ****broken top_5_beers has been changed****
# def selector(selection):
#     TABLENAME = 'top_5_beers'
#     query = f"SELECT beer_name FROM {TABLENAME} WHERE beer_style = '{selection}'"
#     df = pd.read_sql_query(query, sql_engine)
#     # return json of the dataframe
#     return Response(df.to_json(orient = "records"),mimetype='application/json')

# @app.route("/top_beers") ****broken top_5_beers has been changed****
# def top_beers():
#     TABLENAME = 'top_5_beers'
#     query = f"SELECT beer_style FROM {TABLENAME}"
#     df = pd.read_sql_query(query, sql_engine)
#     # return json of the dataframe
#     return Response(df.to_json(orient = "records"), mimetype='application/json')

# Returns links and images from craft beers 
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

@app.route("/state_data")
def state_data():
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


@app.route("/category_data")
def category_data():
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT * FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

#-------------- breweries routes --------------#
@app.route('/breweries.html')
def breweries():
    return render_template('breweries.html')

@app.route('/test')
def tester():
    return render_template('test.html')

#################################################
#                  Main
#################################################
if __name__ == '__main__':
    app.run()