from flask import Flask
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
    db_class = DataRoute()
    sql  = f"SELECT * FROM danger" #danger 테이블 내용 다 가져와라
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return row

    
if __name__ == '__main__':
    app.run(debug=True)