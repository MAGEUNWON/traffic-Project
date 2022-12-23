import requests
import os
from dotenv import load_dotenv
import xmltodict
import json

load_dotenv()
api_key = os.environ.get("api_key")
api_keyI = os.environ.get("api_keyI")
api_keyP = os.environ.get("api_keyP")


class ApiRoute():

        # def dajuen_Api():
            
        #     api_key_decode = requests.utils.unquote(api_key) #, "UTF-8" 넣어줘도 나오고 안넣어줘도 나옴

        #     url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?'
        #     # url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfo.do?'

        #     # parameters = {"serviceKey":api_key_decode, "pageNo":1,"numOfRows":14444}

        #     # req = requests.get(url, params = parameters)
        #     req = requests.get(f'{url}ServiceKey={api_key}&numOfRows=14444&pageNo=1')
            
        #     # print(req.text)


        #     xPars = xmltodict.parse(req.text)
        #     jsonDump = json.dumps(xPars)
        #     jsonBody = json.loads(jsonDump)
        #     dajeunJson = jsonBody['response']['body']['TRAFFIC-LIST']['TRAFFIC']

        #     # address = []
        #     # for i in range(len(dajeunJson)):
        #     #     if "대덕" in dajeunJson[i]['roadName']:
        #     #         address.append(dajeunJson[i])
            

        #     # print(dajeunJson)
        #     return dajeunJson

        # dajuen_Api()

        # def Unexpected_Api():
            
        #     # url = 'http://www.utic.go.kr/etc/telMap.do?'
        #     # 돌발 정보 데이터
        #     url = 'http://www.utic.go.kr/guide/imsOpenData.do?'
        #     req = requests.get(f'{url}key={api_keyP}')

        #     xPars = xmltodict.parse(req.text)
        #     jsonDump = json.dumps(xPars)
        #     jsonBody = json.loads(jsonDump)
        #     event = jsonBody['result']['record']

        #     address = []
        #     for i in range(len(event)):
        #         if "대전" in event[i]['addressJibun']: #if A in B문법 : B안에 A가 있으면 참, 없으면 거짓(B에는 리스트, 튜플, 문자열을 사용할 수 있음), if A not in B로도 가능
        #             address.append(event[i]) 
                

        #     # print(address)

        #     return address
            
        # Unexpected_Api()


        # def SafeData_Api():

        #     url = 'http://www.utic.go.kr/guide/tsdmsOpenData.do?'
        #     req = requests.get(f'{url}key={api_keyP}')

        #     # print(req.text)
        #     return req.text

        # SafeData_Api()

        def danger_Api():

            url = 'http://www.utic.go.kr/guide/getRoadAccJson.do?'
            req = requests.get(f'{url}key={api_keyP}')
            jsonBody =req.json()
            data = jsonBody['items']
            # print(jsonBody['items'])

            # address = []
            # for i in range(len(data)):
            #     if "대전" in data[i]['ADDRESS_JIBUN']:
            #         address.append(data[i])

            # print(address)
            return data
            # return address


        danger_Api()