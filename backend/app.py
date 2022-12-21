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



        # print(jsonDump)
        return jsonDump['response']['body']['TRAFFIC-LIST']['TRAFFIC']

@app.route('/dot') # 접속하는 url
def dot():
        db_class = Database()
        sql  = f"SELECT * FROM daejeon_node"
        row = db_class.executeAll(sql)

        # test= 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=ZEZs4lBh8JvrR1NlN1TOVkuL/gfojiZfZDkToH3jm4tNCg7bYk57heMG8VIUdfzrcmqn3VRhSkI2yXbWF3VOcA==&pageNo=1&numOfRows=14444'
        # response = requests.get(test)
        # xpars = xmltodict.parse(response.text)
        # jsonDump = jsonify(xpars).json

        # daejeon_API = jsonDump['response']['body']['TRAFFIC-LIST']['TRAFFIC']

        # print(daejeon_API)

        return row
        
        # data_df = pd(jsonDump.text)


        # print(jsonDump)

@app.route('/directions', methods = ['POST']) # 접속하는 url
def dirCall():
        nodeData = request.json['markerArr']

        # print(nodeData[0]['node_id'])
        # print(nodeData[0]['node_Xcode'])
        # print(nodeData[0]['node_Ycode'])

        finalData = []
        def navi(start, end):
                db_class = Database() 
                sql  = f"SELECT * FROM daejeon_link where F_NODE = {start['node_id']}"
                row = db_class.executeAll(sql)
                
                print(start['node_id'])
                dataObj = 0
                minData = 99999999
                for i in range(len(row)):
                        db_class = Database()
                        sql  = f"SELECT * FROM daejeon_node where node_id = {row[i]['T_NODE']}"
                        dataRow = db_class.executeAll(sql)
                        Xgap = end['node_Xcode'] - dataRow[0]['node_Xcode']
                        Ygap = end['node_Ycode'] - dataRow[0]['node_Ycode']
                        line = Xgap**2+Ygap**2

                        # print(line)
                        if line < minData:
                                minData = line
                                dataObj = dataRow[0]
                finalData.append(dataObj)


                if dataObj['node_id'] == end['node_id']:
                        print('end')
                else:
                        navi(dataObj,end)


        navi(nodeData[0],nodeData[1])

        return finalData


if __name__=="__main__":
  app.run(debug=True, port="8000")
  # host 등을 직접 지정하고 싶다면
  # app.run(host="127.0.0.1", port="5000", debug=True)