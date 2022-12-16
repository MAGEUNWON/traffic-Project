import requests
import xmltodict
import json

class DataRoute():

  def daejeon() :
    # url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?serviceKey=3mzcord3q5w6kIIDIkzfjbApi4SmCWPYnUpazaf4qx4Ro1qn44qKhG69pl3aydYWaJHhEDp0LxHvx1kEyF8o%2FA%3D%3D&pageNo=1&numOfRows=50'

    url = 'https://openapi.its.go.kr:9443/trafficInfo?apiKey=test&type=all&minX=127.247048&maxX=127.559557&minY=36.199923&maxY=36.499564&getType=json'
  # params = {"serviceKey":"3mzcord3q5w6kIIDIkzfjbApi4SmCWPYnUpazaf4qx4Ro1qn44qKhG69pl3aydYWaJHhEDp0LxHvx1kEyF8o%2FA%3D%3D","pageNo":'1',"numOfRows":'20'}

    res = requests.get(url)
    xmldata = res.text
    jsonStr = json.dumps(xmltodict.parse(xmldata),ensure_ascii=False)   
    dict = json.loads(jsonStr)    
    return dict




