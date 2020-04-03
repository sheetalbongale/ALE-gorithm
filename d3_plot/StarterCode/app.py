from flask import Flask, render_template, request
# from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# db = SQLAlchemy(app)

#################################################
# Flask Routes
#################################################
@app.route('/')
def index():
    return render_template('index.html')
    

if __name__ == '__main__':
    app.run()