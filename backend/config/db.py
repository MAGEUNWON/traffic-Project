import os
import sys

import pymysql.cursors
from dotenv import load_dotenv

load_dotenv()
config = {
    "user":os.environ.get("DB_USER"),
    "password":os.environ.get("DB_PASSWORD"),
    "host":os.environ.get("DB_HOST"),
    "port":int(os.environ.get("DB_PORT")),
    "database":os.environ.get("DB_DB")
}
class Database():    
    def cctv():
        db = pymysql.connect(**config)
        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute('SELECT * FROM cctv')
        row = cursor.fetchall()
        return row

