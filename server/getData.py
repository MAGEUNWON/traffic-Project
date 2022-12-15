import urllib.request as MyURL
from bs4 import BeautifulSoup

open_api_key = 'I85A3%2FsSJo0nHw8WV8QCKVFuvEvHx0rV7pUSOUGF3pz8aVlEud1y9T9X%2BlaxUxQbdobVT1ef%2B5%2B2SBTUQus86Q%3D%3D&numOfRows=20'
params = '&numOfRows=20&pageNo=1'
open_url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=' + open_api_key + params
# Open API URL 생성

res = MyURL.urlopen(open_url)
traffic = BeautifulSoup(res, 'html.parser')
# XML도 HTML과 동일하게 html.parser 이용

data = traffic.find_all('traffic')
# XML 데이터에서 item 태그를 모두 불러와 data 변수에 저장
for item in data:
    print("혼잡코드 :", item.congestion.string)
    print("링크개수 :", item.linkcount.string)
    print("링크식별번호 :", item.linkid.string)
    print("링크길이 :", item.linklength.string)
    print("링크순번 :", item.linksqc.string)
    print("통행속도 :", item.speed.string)
    print("도로명칭 :", item.roadname.string)
    print("시작노드명 :", item.startnodename.string)
    print("끝노드명 :", item.endnodename.string)
    print("링크길이 :", item.travelt.string)
    print("방향정보 :", item.udtype.string)
    print("")
    
data()
