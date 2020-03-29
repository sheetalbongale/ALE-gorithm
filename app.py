from flask import Flask, render_template, request
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float, Date
from flask_sqlalchemy import SQLAlchemy
import config

#################################################
#       Flask Setup and Database Connection
#################################################
app = Flask(__name__)

USER = "root"
PASSWORD = config.password
HOST = "127.0.0.1"
PORT = "3306"
DATABASE = "alegorithm_db"

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

db = SQLAlchemy(app)


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

#-------------- dashboard routes --------------#

@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')

#-------------- breweries routes --------------#
@app.route('/breweries.html')
def breweries():
    return render_template('breweries.html')


#################################################
#                  Main
#################################################
if __name__ == '__main__':
    app.run()