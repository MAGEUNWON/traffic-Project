from flask import Flask, jsonify
from flask_cors import CORS
from config.db import Database, daejeon_accident


app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/', methods=['GET'])
def test():
    return "a"


@app.route('/parkinglot', methods=['GET'])
def parking_lot():
    dbdate = Database()
    sql = 'SELECT * FROM traffic.parking_lot'
    row = dbdate.executeAll(sql)

    return row


@app.route("/accident")
def accident():
    data = daejeon_accident()
    return data


if __name__ == '__main__':
    app.run(debug=True)
