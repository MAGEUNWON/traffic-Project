import json
import os

import requests
import xmltodict
from dotenv import load_dotenv
from pandas.io.json import json_normalize

load_dotenv()
open_api_key = os.environ.get("API_KEY_POLICE")

class DataAPI:

    def safezone_api():
        json_data = []
        parameters = {"key": open_api_key, "sidoCd": 30}
        requestData = requests.get('http://www.utic.go.kr/guide/getSafeOpenJson.    do', params=parameters)
        jsonData = None

        if requestData.status_code == 200 :
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

dataframe = json_normalize(DataAPI.safezone_api())
dataframe.to_csv('safezone_db.csv', index=False)