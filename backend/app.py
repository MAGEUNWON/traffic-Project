from api import DataAPI
from config.db import DataRoute
from flask import Flask, jsonify
from flask_cors import CORS

# from config import db

app = Flask(__name__)
# axios cors에러 떠서 해놓음
CORS(app, resources={
     r'*': {'origins': 'http://localhost:3000'}}, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False


@app.route('/', methods=['GET'])
def test():

    return "a"

# CCTV


@app.route('/cctv')
def daejeon():
    db_class = DataRoute()
    sql = f"SELECT * From CCTV"
    row = db_class.executeAll(sql)

    return jsonify(row)

# safezone


@app.route('/safezone')
def safe_zone_db():
    db_class = DataRoute()
    sql = f"SELECT * FROM safezone_db"
    row = db_class.executeAll(sql)

    return jsonify(row)

# parkinglot


@app.route('/parkinglot')
def parking_lot_db():
    db_class = DataRoute()
    sql = 'SELECT * FROM parking_lot'
    row = db_class.executeAll(sql)

    return row

# accident


@app.route('/accident')
def accident():
    data = DataAPI.accident_api()
    return data


if __name__ == '__main__':
    app.run(debug=True)
