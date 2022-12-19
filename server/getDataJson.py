import os
import urllib.request as MyURL

import requests
from bs4 import BeautifulSoup
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
            
            result_data = []
            
            for item in jsonItems:
                result_data.append(
                    {
                    "보호구역ID": item['SNCT_SEQ'],
                    "데이터기준일자": item['REG_DT'],
                    "제한속도": item['MAX_SPD'],
                    "지자체 입력 제한속도": item['MAX_SPD_ORG'],
                    "CCTV설치대수": item['CCTV_CNT'],
                    "대상시설명": item['FCLTY_NM'],
                    "시도명": item['SIDO_NM'],
                    "보호구역도로폭(m)": item['ROAD_WDT'],
                    "CCTV설치여부": item['CCTV_YN'],
                    "소재지도로명주소": item['ADDR'],
                    "소재지지번주소": item['LADDR'],
                    "관할경찰서명": item['POL_NM'],
                    "시군구코드": item['SIGUN_CD'],
                    "시군구명": item['SIGUN_NM'],
                    "경도": item['X'],
                    "위도": item['Y'],
                    "관리기관명": item['GOV_NM'],
                    "관리기관전화번호": item['GOV_TEL'],
                    "시설종류(어린이보호구역, 노인보호구역, 장애인보호구역)": item ['FCLTY_TY'],
                    "지오매트리정보": item['GEOM'],
                    "데이터 구분": item['DATA_TYPE']
                    }
                )
                
            return result_data

    
    def api_police_ims():
        
        open_url = 'http://www.utic.go.kr/guide/imsOpenData.do?key=' + open_api_key
        # Open API URL 생성

        res = MyURL.urlopen(open_url)
        result = BeautifulSoup(res, 'html.parser')
        # XML도 HTML과 동일하게 html.parser 이용

        data = result.find_all('record')
        # XML 데이터에서 item 태그를 모두 불러와 data 변수에 저장
        # print(data)
        
        result_data = []
        
        for item in data:
            result_data.append(
                {
                    "고유아이디": item.incidentid.string,
                    "돌발유형": item.incidentetypecd.string,
                    "돌발 세부유형": item.incidentesubtypecd.string,
                    "주소(지번)": item.addressjibun.string,
                    "주소코드": item.addressjibuncd.string,
                    "도로명주소": item.addressnew.string,
                    "노드링크아이디": item.linkid.string,
                    "x좌표": item.locationdatax.string,
                    "y좌표": item.locationdatay.string,
                    "지점,영역,구간 구분코드": item.locationtypecd.string,
                    "좌표정보": item.locationdata.string,
                    "소통등급": item.incidentetrafficcd.string,
                    "돌발등급": item.incidentegradecd.string,
                    "돌발제목": item.incidenttitle.string,
                    "돌발지역코드": item.incidentregioncd.string,
                    "발생일": item.startdate.string,
                    "종료일": item.enddate.string,
                    "차선": item.lane.string,
                    "도로명": item.roadname.string,
                    "제보출처": item.sourcecode.string
                }
            )
            
        return result_data
