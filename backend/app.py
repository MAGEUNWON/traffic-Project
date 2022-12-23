from flask import Flask, jsonify
from config.db import DataRoute
from config.api import ApiRoute
from flask_cors import CORS 


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

#axios cors에러 떠서 해놓음
CORS(app,resources={r'*':{'origins':'http://localhost:3000'}},supports_credentials=True)


@app.route('/', methods=['GET'])
def home():
    return "home"


@app.route('/dajeun', methods=['GET'])
def dajuen_Api():
    data = ApiRoute.dajuen_Api()
    return data


@app.route('/unexpected', methods=['GET'])
def Unexpected_Api():
    data = ApiRoute.Unexpected_Api()
    return data


@app.route('/safe', methods=['GET'])
def SafeData_Api():
    data = ApiRoute.SafeData_Api()
    return data


@app.route('/danger', methods=['GET'])
def danger_Api():
    data = ApiRoute.danger_Api()
    return data

#db 테이블 내용 get요청으로 가져옴
@app.route('/hazard', methods=['GET'])
def execute():
    db_class = DataRoute()  #얘가 변수 query인듯?
    sql  = f"SELECT * FROM traffic.danger" #danger 테이블 내용 다 가져와라
    # sql  = f"SELECT LOCATION_DATA FROM danger" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return row

@app.route('/hazard/<polygon>', methods=['GET'])
def Polygon(polygon):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA, DATA_DESC FROM traffic.danger WHERE LOCATION_DATA Like '%%{polygon}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문

    data_stack = list()
    for i in range(len(row)):
        # print(row[i])
        data_stack.append(row[i])
    # print(data_stack)
    # data_stack[i]["LOCATION_DATA"]

    # str = row[46]["LOCATION_DATA"]
    # result = str[9:-2]
    # print(result)
    # List = result.split(',')
    # # print(List)
    # for i in range(len(result)):
    #     print(result[i])
    # for i in range(len(List)): # = index, value in enumerate(List)
    #     SList = List[i].split(' ')
    #     print(SList)
    #     data_stack.append(SList)
    return jsonify(data_stack)

@app.route('/hazard/<line>', methods=['GET'])
def Line(line):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA FROM traffic.danger WHERE LOCATION_DATA Like '%%{line}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return jsonify(row)

@app.route('/hazard/<point>', methods=['GET'])
def Point(point):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA FROM traffic.danger WHERE LOCATION_DATA Like '%%{point}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return jsonify(row)

    
if __name__ == '__main__':
    app.run(debug=True)