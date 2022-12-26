from config.api import ApiRoute
from config.db import DataRoute
from flask import Flask, jsonify
from flask_cors import CORS

# from config import db

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/', methods=['GET'])
def test():
    
    return "a"

# CCTV
@app.route('/cctv')
def daejeon():
    db_class  = DataRoute()
    sql  = f"SELECT * From CCTV"
    row = db_class.executeAll(sql)
    print(row,"얍!")
    return jsonify(row)
    
# safezone
@app.route('/safezone')
def safe_zone_db():
    db_class = DataRoute()
    sql = f"SELECT * FROM safezone_db"
    row = db_class.executeAll(sql)
    print(row)
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
    data = ApiRoute.accident_api()
    print(data)
    return data



if __name__ == '__main__':
    app.run(debug=True)