import requests
import os
from dotenv import load_dotenv
import xmltodict
import json

load_dotenv()
api_key = os.environ.get("api_key")

class DataRoute():

        def dajuen_Api():
        
            api_key_decode = requests.utils.unquote(api_key) #, "UTF-8" 넣어줘도 나오고 안넣어줘도 나옴

            parameters = {"serviceKey":api_key_decode, "pageNo":1,"numOfROws":30}

            req = requests.get('http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do', params = parameters)

            xPars = xmltodict.parse(req.text)
            jsonDump = json.dumps(xPars)
            jsonBody = json.loads(jsonDump)
            dajeunJson = jsonBody['response']['body']['TRAFFIC-LIST']['TRAFFIC']

            print(dajeunJson)
            return dajeunJson

        dajuen_Api()


# print(dajuen_Api())

# req = requests.get('http://openapitraffic.daejeon.go.kr/traffic/rest/serviceKey=${api_key_decode}&pageNo=1&numOfRows=10')

# url = "http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do/serviceKey=MT5mnnKZD8Y9GOF+0kHtowxuoRgzp0MEW3YKX5e1r2OipaZHxgMVZ+AxTAA/U0dRylLhIdSOSvoYAv/romYhDg==&pageNo=1&numOfRows=10"

# url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do'
# params = {'serviceKey':'HiPtcx4ky%2F9U1bMNShvDswXrMZVY0DYRq1v%2FJ6%2BaOoCf5ACUJBNbVxg423FgtzOiCI5v%2BQX1eAWM%2BoGFaPH9JA%3D%3D','pageNo':'2', 'numOfRows':'10' }

# response = requests.get(url)
# print(response)
# contents = response.text
# print(contents)