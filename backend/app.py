from flask import Flask, jsonify, request
from flask_cors import CORS 
from config.db import DataRoute
from config.api import ApiRoute
import requests
import json
import xmltodict
import os
# from config import db


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/', methods=['GET'])
def test():
    
    return "HELLO WROLED"

# 두진
@app.route('/cctv')
def daejeon():
        db_class  = DataRoute()
        sql  = f"SELECT * From CCTV"
        row = db_class.executeAll(sql)

        return jsonify(row)
# -----------------------------------------


# 팀장님
@app.route('/dajeun', methods=['GET'])
def dajuen_Api():
    data = ApiRoute()
    result = data.dajuen_Api()
   
    return result


@app.route('/unexpected', methods=['GET'])
def Unexpected_Api():
    data = ApiRoute().Unexpected_Api()
    return data


@app.route('/safe', methods=['GET'])
def SafeData_Api():
    data = ApiRoute()
    result = data.SafeData_Api()
    return result
    


@app.route('/danger', methods=['GET'])
def danger_Api():
    data = ApiRoute()
    result = data.danger_Api()
    return result

#db 테이블 내용 get요청으로 가져옴
@app.route('/hazard', methods=['GET'])
def execute():
    db_class = DataRoute()
    sql  = f"SELECT * FROM danger" #danger 테이블 내용 다 가져와라
    row = db_class.executeAll(sql) #executeAll은 전체 내용 다 가져오라는 명령문
    print(row)
    return row
# ----------------------------------------------------------------


#연주

@app.route('/parkinglot', methods=['GET'])
def parking_lot():
    dbdate = DataRoute()
    sql = 'SELECT * FROM parking_lot'
    row = dbdate.executeAll(sql)

    return row


@app.route("/accident")
def accident():
    daejeon_data = []
    url = f'http://www.utic.go.kr/guide/imsOpenData.do?key={os.getenv("POLICE_KEY")}'
    resonse = requests.get(url)
    xmlData = resonse.text
    jsonData = json.dumps(xmltodict.parse(xmlData))
    loadJson = json.loads(jsonData)
    data = loadJson['result']['record']
    for i in range(len(data)):
        if '대전' in data[i]['addressJibun']:
            daejeon_data.append(data[i])
   
    return daejeon_data
#------------------------------------------------------------------

#화연 
@app.route('/safezone', methods=['GET'])
def safe_zone():

        parameters = {"key": os.environ.get("POLICE_KEY"), "sidoCd": 30}
        requestData = requests.get('http://www.utic.go.kr/guide/getSafeOpenJson.do', params=parameters)
        
        jsonData = None
        
        if requestData.status_code == 200 :
            jsonData = requestData.json()
            jsonItems = jsonData['items']
            
            result_data = []
            
            for item in jsonItems:
                result_data.append(
                    {
                    "보호구역ID": item['SNCT_SEQ'],
                    "데이터기준일자": item['REG_DT'],
                    "제한속도": item['MAX_SPD'],
                    "지자체 입력 제한속도": item['MAX_SPD_ORG'],
                    "CCTV설치대수": item['CCTV_CNT'],
                    "대상시설명": item['FCLTY_NM'],
                    "시도명": item['SIDO_NM'],
                    "보호구역도로폭(m)": item['ROAD_WDT'],
                    "CCTV설치여부": item['CCTV_YN'],
                    "소재지도로명주소": item['ADDR'],
                    "소재지지번주소": item['LADDR'],
                    "관할경찰서명": item['POL_NM'],
                    "시군구코드": item['SIGUN_CD'],
                    "시군구명": item['SIGUN_NM'],
                    "경도": item['X'],
                    "위도": item['Y'],
                    "관리기관명": item['GOV_NM'],
                    "관리기관전화번호": item['GOV_TEL'],
                    "시설종류": item ['FCLTY_TY'],
                    "지오매트리정보": item['GEOM'],
                    "데이터 구분": item['DATA_TYPE']
                    }
                )

        return result_data


#------------------------------------------------------------------


#상호 

@app.route('/directions', methods = ['POST']) # 접속하는 url
def dirCall():
        nodeData = request.json['markerArr']
        finalData = []
        trafficLink = []
        trafficData = []
        
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
                                

                        print(trafficData)
                        print('end')
                
                else:
                        navi(dataObj,end)


        navi(nodeData[0],nodeData[1])

        return {"finalData":finalData, "trafficData":trafficData}


#------------------------------------------------------------------





if __name__ == '__main__':
    app.run(debug=True)