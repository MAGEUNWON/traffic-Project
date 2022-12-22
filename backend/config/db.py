import pymysql
import os
import sys
from dotenv import load_dotenv

load_dotenv()

#db 연결 내용 객체로 묶어 놓은 것
config = {
    "user":os.environ.get("DB_USER"),
    "password":os.environ.get("DB_PASSWORD"),
    "host":os.environ.get("DB_HOST"),
    "port":int(os.environ.get("DB_PORT")),
    "database":os.environ.get("DB_DB")
}


class DataRoute(): 
    def __init__(self):
        try:
            self.db = pymysql.connect(**config) #config 객체안에 내용 한번에 다 가져옴
            self.cursor = self.db.cursor(pymysql.cursors.DictCursor) #명령어 미리 객체로 써놔서 한번만 해주면 됨

        #에러나면 출력하는 내용
        except pymysql.Error as e:
            print(f"Error connecting to MySQLDB platform: {e}")
            sys.exit(1)

    # def execute(self, query, args={}):
    #     self.cursor.execute(query, args)
    #     return

    def executeAll(self, query, args={}): #app.py
        # print(query, "출력")
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row
    