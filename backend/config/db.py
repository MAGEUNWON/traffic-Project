import pymysql
import os
import sys
from dotenv import load_dotenv
import requests
import json
import xmltodict
load_dotenv()

POLICE_KEY = os.getenv("POLICE_KEY")


config = {
    "user": os.environ.get("DB_USER"),
    "password": os.environ.get("DB_PASSWORD"),
    "host": os.environ.get("DB_HOST"),
    "port": int(os.environ.get("DB_PORT")),
    "database": os.environ.get("DB_DB")
}


class Database:
    def __init__(self):
        try:
            self.db = pymysql.connect(**config)
            self.cursor = self.db.cursor(pymysql.cursors.DictCursor)
        except pymysql.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

    def execute(self, query, args={}):
        self.cursor.execute(query, args)
        return

    def excuteOne(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchone()
        return row

    def executeAll(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.db.commit()


def daejeon_accident():
    daejeon_data = []
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
