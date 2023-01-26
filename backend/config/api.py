import json
import os

import requests
import xmltodict  # xml을 dicionary로 변경을 지원해 주는 모듈
from dotenv import load_dotenv

load_dotenv()
# 근원
api_key = os.environ.get("api_key")
api_keyI = os.environ.get("api_keyI")
api_keyP = os.environ.get("api_keyP")

# 화연
open_api_key = os.environ.get("API_KEY_POLICE")
# 연주


class ApiRoute():

    # 근원
    def dajuen_Api(self):

        api_key_decode = requests.utils.unquote(
            api_key)  # , "UTF-8" 넣어줘도 나오고 안넣어줘도 나옴

        url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?'
        # url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfo.do?'

        # parameters = {"serviceKey":api_key_decode, "pageNo":1,"numOfRows":14444}
        # req = requests.get(url, params = parameters)

        req = requests.get(
            f'{url}ServiceKey={api_key}&numOfRows=14444&pageNo=1')
        # print(req.text)

        # string으로 된 xml을 parse해 줌.
        xPars = xmltodict.parse(req.text)
        # parse된 xPars를 json.dumps를 통해 dictionary 문자열로 바꿈
        jsonDump = json.dumps(xPars)
        # json.loads를 통해 jsonDump를 python에서 읽을 수 있는 dictionary형으로 바꿈
        jsonBody = json.loads(jsonDump)
        dajeunJson = jsonBody['response']['body']['TRAFFIC-LIST']['TRAFFIC']

        # address = []
        # for i in range(len(dajeunJson)):
        #     if "대덕" in dajeunJson[i]['roadName']:
        #         address.append(dajeunJson[i])

        # print(dajeunJson)
        return dajeunJson

        # return address
    def danger_Api(self):
        url = 'http://www.utic.go.kr/guide/getRoadAccJson.do?'
        req = requests.get(f'{url}key={api_keyP}')
        jsonBody = req.json()
        data = jsonBody['items']
        print(jsonBody['items'])
        # address = []
        # for i in range(len(data)):
        #     if "대전" in data[i]['ADDRESS_JIBUN']:
        #         address.append(data[i])
        # print(address)
        return data
        # return address

    # 화연
    def safezone_api():
        json_data = []
        parameters = {"key": open_api_key, "sidoCd": 30}
        requestData = requests.get(
            'http://www.utic.go.kr/guide/getSafeOpenJson.do', params=parameters)
        jsonData = None

        if requestData.status_code == 200:
            jsonData = requestData.json()
            jsonItems = jsonData['items']

            for item in jsonItems:
                json_data.append(item)

        return json_data

    def accident_api():
        daejeon_data = []
        url = f'http://www.utic.go.kr/guide/imsOpenData.do?key=' + open_api_key
        resonse = requests.get(url)
        xmlData = resonse.text
        jsonData = json.dumps(xmltodict.parse(xmlData))
        loadJson = json.loads(jsonData)
        data = loadJson['result']['record']
        for i in range(len(data)):
            if '대전' in data[i]['addressJibun']:
                daejeon_data.append(data[i])

        return daejeon_data
