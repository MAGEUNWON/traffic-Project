import pandas as pd
from pandas.io.json import json_normalize
import requests
import xmltodict
import json
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
load_dotenv()

POLICE_KEY = os.getenv("POLICE_KEY")
SERVICE_KEY = os.getenv("SERVICE_KEY")


def all_accident():
    url = f'http://www.utic.go.kr/guide/imsOpenData.do?key={POLICE_KEY}'
    resonse = requests.get(url)
    xmlData = resonse.text
    jsonData = json.dumps(xmltodict.parse(xmlData))
    loadJson = json.loads(jsonData)
    data = loadJson['result']['record']
    return data


daejeon_data = []


def daejeon_accident():
    url = f'http://www.utic.go.kr/guide/imsOpenData.do?key={POLICE_KEY}'
    resonse = requests.get(url)
    xmlData = resonse.text
    jsonData = json.dumps(xmltodict.parse(xmlData))
    loadJson = json.loads(jsonData)
    data = loadJson['result']['record']
    for i in range(len(data)):
        if '대전' in data[i]['addressJibun']:
            daejeon_data.append(data[i])
    return daejeon_data


def parking_lot():
    url = f'http://apis.data.go.kr/6300000/pis/parkinglotIF'
    params = {'serviceKey': SERVICE_KEY,
              'pageNo': '10', 'numOfRows': '100'}
    response = requests.get(url, params=params)
    xmlData = response.text
    jsonData = json.dumps(xmltodict.parse(xmlData), indent=4)
    loadJson = json.loads(jsonData)
    data = loadJson
    return data['response']['body']


# 주차장 정보 csv파일롤 저장
# for i in range(15):
#     url = f'http://apis.data.go.kr/6300000/pis/parkinglotIF?serviceKey={SERVICE_KEY}&numOfRows=50&pageNo={i+1}'

#     # print(url)

#     response = requests.get(url)
#     contents = response.text
#     jsonData = json.dumps(xmltodict.parse(contents))
#     loadJson = json.loads(jsonData)
#     # print(loadJson)
#     body = loadJson['response']['body']['item']
#     # print(body)
#     dataframe = json_normalize(body)
#     dataframe.to_csv(f'parkinglot{i}.csv', encoding="UTF-8")
