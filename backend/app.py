import json
import os

import requests
import xmltodict
from config.api import ApiRoute
from config.db import DataRoute
from flask import Flask, jsonify, request
from flask_cors import CORS

# from config import db

# from config import db

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/', methods=['GET'])
def test():
    
    return "HELLO WROLED"

# CCTV
@app.route('/cctv')
def daejeon():
    db_class  = DataRoute()
    sql  = f"SELECT * From CCTV"
    row = db_class.executeAll(sql)
    return jsonify(row)
    
# -----------------------------------------


# 팀장님
# @app.route('/dajeun', methods=['GET'])
# def dajuen_Api():
#     data = ApiRoute()
#     result = data.dajuen_Api()

#     return result


@app.route('/danger', methods=['GET'])
def danger_Api():
    data = ApiRoute.danger_Api()
    return data

#db 테이블 내용 get요청으로 가져옴
@app.route('/hazard', methods=['GET'])
def execute():
    db_class = DataRoute()  #얘가 변수 query인듯?
    sql  = f"SELECT * FROM danger" #danger 테이블 내용 다 가져와라
    # sql  = f"SELECT LOCATION_DATA FROM danger" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return row

@app.route('/hazard/<polygon>', methods=['GET'])
def Polygon(polygon):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA, DATA_DESC FROM danger WHERE LOCATION_DATA Like '%%{polygon}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문

    data_stack = list()
    for i in range(len(row)):
        # print(row[i])
        data_stack.append(row[i])
    return jsonify(data_stack)

@app.route('/hazard/<line>', methods=['GET'])
def Line(line):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA FROM danger WHERE LOCATION_DATA Like '%%{line}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return jsonify(row)

@app.route('/hazard/<point>', methods=['GET'])
def Point(point):
    db_class = DataRoute()
    sql  = f"SELECT LOCATION_DATA FROM danger WHERE LOCATION_DATA Like '%%{point}%%'" #location 좌표만 가져옴
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return jsonify(row)
# ----------------------------------------------------------------


#연주

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
#------------------------------------------------------------------

#화연 
# safezone
@app.route('/safezone')
def safe_zone_db():
    db_class = DataRoute()
    sql = f"SELECT * FROM safezone_db"
    row = db_class.executeAll(sql)
    
    return jsonify(row)


#------------------------------------------------------------------


#상호 

@app.route('/dot') # 접속하는 url
def dot():
        db_class = DataRoute()
        sql  = f"SELECT * FROM daejeon_node"
        row = db_class.executeAll(sql)

        return row


@app.route('/directions', methods = ['POST']) # 접속하는 url
def dirCall():
        nodeData = request.json['markerArr']
        finalData = []
        trafficLink = []
        trafficData = []
        print("aa")
        finalData.append(nodeData[0])

        
        def navi(start, end):
                db_class = DataRoute() 
                sql  = f"SELECT * FROM daejeon_link where F_NODE = {start['node_id']}"
                row = db_class.executeAll(sql)
                
                
                dataObj = 0
                minData = 99999999
                lastLink = '';
                for i in range(len(row)):
                        db_class = DataRoute()
                        sql  = f"SELECT * FROM daejeon_node where node_id = {row[i]['T_NODE']}"
                        dataRow = db_class.executeAll(sql)
                        

                        Xgap = end['node_Xcode'] - dataRow[0]['node_Xcode']
                        Ygap = end['node_Ycode'] - dataRow[0]['node_Ycode']
                        line = Xgap**2+Ygap**2

                        if line < minData:
                                minData = line
                                dataObj = dataRow[0]
                                lastLink = row[i]['LINK_ID']

                finalData.append(dataObj)
                trafficLink.append(lastLink)




                if dataObj['node_id'] == end['node_id']:
                        for i in trafficLink:
                                sql  = f"SELECT * FROM daejeon_traffic where linkID = {i}"
                                row = db_class.executeAll(sql)
                                if len(row) != 0:
                                        trafficData.append(row[0])
                                else:
                                        trafficData.append({
                                                            "congestion": "정보없음",
                                                            "endNodeID": "정보없음",
                                                            "endNodeName": "정보없음",
                                                            "linkCount": "정보없음",
                                                            "linkID": "정보없음",
                                                            "linkLength": "정보없음",
                                                            "linkSqc": "정보없음",
                                                            "roadName": "정보없음",
                                                            "speed":"정보없음",
                                                            "startNodeId": "정보없음",
                                                            "startNodeName": "정보없음",
                                                            "travelT": "정보없음",
                                                            "udType": "정보없음"
                                                            })
                                

                        print('end')
                
                else:
                        navi(dataObj,end)


        navi(nodeData[0],nodeData[1])

        return {"finalData":finalData, "trafficData":trafficData}


#------------------------------------------------------------------








if __name__ == '__main__':
    app.run(debug=True)