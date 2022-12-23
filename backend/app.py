# from getData import GetPublicData
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

        return jsonify(row)
    
# safezone
@app.route('/safezone')
def safe_zone_db():
    db_class = DataRoute()
    sql = f"SELECT * FROM safezone_db"
    row = db_class.executeAll(sql)
    
    return jsonify(row)

# parkinglot
@app.route('/parkinglot', methods=['GET'])
def parking_lot():
    dbdate = DataRoute()
    sql = 'SELECT * FROM parking_lot'
    row = dbdate.executeAll(sql)

    return row

# accident
# @app.route("/accident")
# def accident():
#     daejeon_data = []
#     url = f'http://www.utic.go.kr/guide/imsOpenData.do?key={os.getenv("POLICE_KEY")}'
#     resonse = requests.get(url)
#     xmlData = resonse.text
#     jsonData = json.dumps(xmltodict.parse(xmlData))
#     loadJson = json.loads(jsonData)
#     data = loadJson['result']['record']
#     for i in range(len(data)):
#         if '대전' in data[i]['addressJibun']:
#             daejeon_data.append(data[i])

#     return daejeon_data


if __name__ == '__main__':
    app.run(debug=True)