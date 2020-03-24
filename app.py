from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

db = SQLAlchemy(app)

#################################################
# Flask Routes
#################################################
@app.route('/')
def index():
    return render_template('index.html')
    
@app.route("/search", methods=["GET", "POST"])
def search():
     if request.method == "POST":
    
        search_text = request.form.get("search_text")
        print(search_text)
        #to get API's
        return render_template("brewries_result.html")


if __name__ == '__main__':
    app.run()