import os

import requests
from dotenv import load_dotenv
from pandas.io.json import json_normalize

load_dotenv()
open_api_key = os.environ.get("API_KEY_POLICE")

def safezone_api():
    json_data = []
    parameters = {"key": open_api_key, "sidoCd": 30}
    requestData = requests.get('http://www.utic.go.kr/guide/getSafeOpenJson.do', params=parameters)
    jsonData = None

    if requestData.status_code == 200 :
        jsonData = requestData.json()
        jsonItems = jsonData['items']
            
        for item in jsonItems:
            json_data.append(item)
    
    return json_data

dataframe = json_normalize(safezone_api())
dataframe.to_csv('safezone_db.csv', index=False)