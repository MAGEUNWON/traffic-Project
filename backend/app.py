from config.api import ApiRoute
from config.db import DataRoute
from flask import Flask, jsonify, request
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

#
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


if __name__ == '__main__':
    app.run(debug=True)