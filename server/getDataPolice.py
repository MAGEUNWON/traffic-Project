import os
import urllib.request as MyURL

from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()
open_api_key = os.environ.get("API_KEY_POLICE")

class GetPublicData():
    
    def api_police_traffic():
        
        open_url = 'http://www.utic.go.kr/guide/imsOpenData.do?key=' + open_api_key
        # Open API URL 생성

        res = MyURL.urlopen(open_url)
        result = BeautifulSoup(res, 'html.parser')
        # XML도 HTML과 동일하게 html.parser 이용

        data = result.find_all('record')
        # XML 데이터에서 item 태그를 모두 불러와 data 변수에 저장
        # print(data)
        
        for item in data:
            print("고유아이디 :", item.incidentid.string)
            print("돌발유형 :", item.incidentetypecd.string)
            print("돌발 세부유형 :", item.incidentesubtypecd.string)
            print("주소(지번) :", item.addressjibun.string)
            print("주소코드 :", item.addressjibuncd.string)
            print("도로명주소 :", item.addressnew.string)
            print("노드링크아이디 :", item.linkid.string)
            print("x좌표 :", item.locationdatax.string)
            print("y좌표 :", item.locationdatay.string)
            print("지점,영역,구간 구분코드 :", item.locationtypecd.string)
            print("좌표정보 :", item.locationdata.string)
            print("소통등급 :", item.incidentetrafficcd.string)
            print("돌발등급 :", item.incidentegradecd.string)
            print("돌발제목 :", item.incidenttitle.string)
            print("돌발지역코드 :", item.incidentregioncd.string)
            print("발생일 :", item.startdate.string)
            print("종료일 :", item.enddate.string)
            print("차선 :", item.lane.string)
            print("도로명 :", item.roadname.string)
            print("제보출처 :", item.sourcecode.string)
            print("")

    api_police_traffic()
    