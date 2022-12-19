import requests
import xmltodict
import json
import os
from dotenv import load_dotenv

load_dotenv()

POLICE_KEY = os.getenv("POLICE_KEY")


def all_accident():
    url = f'http://www.utic.go.kr/guide/imsOpenData.do?key={POLICE_KEY}'
    resonse = requests.get(url)
    xmlData = resonse.text
    jsonData = json.dumps(xmltodict.parse(xmlData))
    loadJson = json.loads(jsonData)
    data = loadJson['result']['record']
    return data


daejeon_data = []


def accident():
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

# def accident_construction():
#   for i in range(len(daejeon_data)):
#     if
