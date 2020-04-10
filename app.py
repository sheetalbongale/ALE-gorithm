from flask import Flask, render_template, request, jsonify
import sqlalchemy as sql
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import config
import pymysql
import json
import pandas as pd
from flask import Response
import json

################################################################
#               Flask Setup and Database Connection            #
################################################################
app = Flask(__name__)

USER = "root"
PASSWORD = config.password
HOST = "127.0.0.1"
PORT = "3306"
DATABASE = "alegorithm_db"

CONN = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

sql_engine = sql.create_engine(CONN)


################################################################
#                        Flask Routes                          #
################################################################
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

#--------------------------------------------------------------#
#                       recommender routes                     #
#--------------------------------------------------------------#

@app.route('/recommender.html')
def recommender():
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT DISTINCT Category FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    categories = df['Category'].tolist()
    categories.insert(0,"Choose a Category")
    return render_template('recommender.html', categories=categories)

# populate beerstyle dropdown - * Needs work(Dynamic Dropdown) *
@app.route("/beerstyle_names")
def beer_style():
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT DISTINCT Style FROM {TABLENAME}"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

# populate beerstyle dropdown based upon Category input 
@app.route("/beerstyle_filtered/<category>")
def beer_style_filtered(category):
    TABLENAME = "ba_beerstyles"
    query = f"SELECT Style FROM {TABLENAME} WHERE Category = '{category}'"
    df = pd.read_sql_query(query, sql_engine)
    df2 = pd.DataFrame({"Style":["Select a Beer Style"]})
    df = df2.append(df)
    # return json of the dataframe
    return Response(df.to_json(orient="records"), mimetype="application/json")

# selector for beerstyle for gaugechart
@app.route("/beerstyle/<beerstyle>")
def guagechart(beerstyle):
    TABLENAME = 'ba_beerstyles'
    query = f"SELECT * FROM {TABLENAME} WHERE Style = '{beerstyle}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"),mimetype='application/json')

# route to display top 5 beer recommendations
@app.route("/recommender/<beerstyle>")
def selector(beerstyle):
    TABLENAME1 = 'top_5_beers'
    TABLENAME2 = 'final_beers'
    query = f"select {TABLENAME2}.*, {TABLENAME1}.avg_rating, {TABLENAME1}.review_count from {TABLENAME2} cross join {TABLENAME1} on {TABLENAME1}.beer_id = {TABLENAME2}.beer_id where {TABLENAME1}.beer_style = '{beerstyle}'"
    df = pd.read_sql_query(query, sql_engine)
    isempty = df.empty
    if isempty == True:
          df2 = pd.DataFrame({"beer_name":["Sorry, we dont have a recommendation for that style"]})
          df = df2.append(df)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"),mimetype='application/json')

# route to generate wordcloud for top beerstyles
@app.route("/category")
def top_beerstyles():
    TABLENAME = 'final_beers'
    query = f"SELECT COUNT(beer_style) AS count, beer_style, category FROM {TABLENAME} GROUP BY beer_style, category"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

# route to add beerstyle image
@app.route("/beerstyles_links/<beerstyle>")
def beer_style_links(beerstyle):
    TABLENAME = 'beer_styles_links'
    query = f"SELECT * FROM {TABLENAME} WHERE beer_style = '{beerstyle}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

#--------------------------------------------------------------#
#                       dashboard routes                       #
#--------------------------------------------------------------#

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
    query = f"SELECT beer_style, review_count FROM {TABLENAME} ORDER BY review_count DESC LIMIT 10"
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


# state selector
@app.route("/statedata/<state>")
def state_stat(state):
    TABLENAME = 'us_state_data'
    query = f"SELECT * FROM {TABLENAME} WHERE state = '{state}'"
    df = pd.read_sql_query(query, sql_engine)
    # return json of the dataframe
    return Response(df.to_json(orient = "records"), mimetype='application/json')

#--------------------------------------------------------------#
#                       breweries routes                       #
#--------------------------------------------------------------#
@app.route('/breweries.html')
def breweries():
    return render_template('breweries.html')

################################################################
#                           Main                               #
################################################################
if __name__ == '__main__':
    app.run(debug=True)