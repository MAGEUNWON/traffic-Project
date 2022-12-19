from flask import Flask, jsonify, request, json
import requests
import xmltodict
import pandas as pd
from config.db import Database
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route('/') # 접속하는 url
def index():
    db_class = Database()
    sql  = f"SELECT * FROM lk_master where ROUTE_nm = '대덕대로'"
    row = db_class.executeAll(sql)
    print(row)
    return row
    



@app.route('/test') # 접속하는 url
def test():
        test= 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=ZEZs4lBh8JvrR1NlN1TOVkuL/gfojiZfZDkToH3jm4tNCg7bYk57heMG8VIUdfzrcmqn3VRhSkI2yXbWF3VOcA==&pageNo=1&numOfRows=14444'
        response = requests.get(test)
        xpars = xmltodict.parse(response.text)
        jsonDump = jsonify(xpars).json
        df = pd.DataFrame(jsonDump['response']['body']['TRAFFIC-LIST']['TRAFFIC'])
        df.to_csv("test.csv", index = False, encoding='utf-8')
        print(df)
        
        # data_df = pd(jsonDump.text)


        # print(jsonDump)
        return jsonDump


if __name__=="__main__":
  app.run(debug=True, port="8000")
  # host 등을 직접 지정하고 싶다면
  # app.run(host="127.0.0.1", port="5000", debug=True)