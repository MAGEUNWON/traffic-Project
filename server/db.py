import json
import os

import pymysql
from dotenv import load_dotenv
from getDataJson import GetPublicData

load_dotenv()
open_api_key = os.environ.get("API_KEY_POLICE")


def insertsql_from_json():
    # 접속
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='pass',
        database='projectb',
        charset='utf8',
    )
    # Cursor Object 가져오기
    curs = conn.cursor()
    
    check_number = 0
    try :
        with open(GetPublicData(), encoding='utf-8') as json_file:
            json_data = json.load(json_file)
            json_line = json_data['items']
            
            while(check_number != len(json_line)) :
                print(check_number)
                
                sql = "INSERT INTO projectb.safezone(SNCT_SEQ) VALUES(%s)"
                val = json_line['SNCT_SEQ']
                
                curs.execute(sql, val)
            
            conn.commit()
            
    finally :
        conn.close()
        
    print("record Inserted")
    
insertsql_from_json()
