import os

import requests
from dotenv import load_dotenv

load_dotenv()
open_api_key = os.environ.get("API_KEY_POLICE")


class GetPublicData():
    
    def api_police_safe():
        
        parameters = {"key": open_api_key, "sidoCd": 30}
        requestData = requests.get('http://www.utic.go.kr/guide/getSafeOpenJson.do', params=parameters)
        
        jsonData = None
        
        if requestData.status_code == 200 :
            jsonData = requestData.json()
            jsonItems = jsonData['items']
            
            return jsonItems
            
            # count = 0
            
            # for item in jsonItems:
            #     count += 1
            #     print(count)
            #     print("보호구역ID :", item['SNCT_SEQ'])
            #     print("데이터기준일자 :", item['REG_DT'])
            #     print("제한속도 :", item['MAX_SPD'])
            #     print("지자체 입력 제한속도 :", item['MAX_SPD_ORG'])
            #     print("CCTV설치대수 :", item['CCTV_CNT'])
            #     print("대상시설명 :", item['FCLTY_NM'])
            #     print("시도명 :", item['SIDO_NM'])
            #     print("보호구역도로폭(m) :", item['ROAD_WDT'])
            #     print("CCTV설치여부 :", item['CCTV_YN'])
            #     print("소재지도로명주소 :", item['ADDR'])
            #     print("소재지지번주소 :", item['LADDR'])
            #     print("관할경찰서명 :", item['POL_NM'])
            #     print("시군구코드 :", item['SIGUN_CD'])
            #     print("시군구명 :", item['SIGUN_NM'])
            #     print("경도 :", item['X'])
            #     print("위도 :", item['Y'])
            #     print("관리기관명 :", item['GOV_NM'])
            #     print("관리기관전화번호 :", item['GOV_TEL'])
            #     print("시설종류(어린이보호구역, 노인보호구역, 장애인보호구역) :", item['FCLTY_TY'])
            #     print("지오매트리정보 :", item['GEOM'])
            #     print("데이터 구분 :", item['DATA_TYPE'])
            #     print("")


    print(api_police_safe())
    