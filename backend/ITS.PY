import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key2 = os.environ.get("api_key2")

def get_cctv_ulr(minX, maxX, minY, maxY):
    minX = str(minX)
    maxX = str(maxX)
    minY = str(minY)
    maxY = str(maxY)
    # https://openapi.its.go.kr:9443/eventInfo
    # https://openapi.its.go.kr:9443/cctvInfo?ex&cctvType=2

    #개인key 입력
    api_call = 'https://openapi.its.go.kr:9443/eventInfo?'\
                'apiKey=api_key2'\
                '&type=all'\
                '&eventType=all'\
                '&minX='+minX + \
                '&maxX='+maxX + \
                '&minY='+minY + \
                '&maxY='+maxY + \
                '&getType=json'

    print(api_call)
    
    w_dataset = requests.get(api_call).json()
    print(w_dataset)
    # cctv_data = w_dataset['response']['coordtype']
    # print(cctv_data)
    
#     coordx_list = []
#     for index, data in enumerate(cctv_data):
#       xy_couple = (float(cctv_data[index]['coordy']), float(cctv_data)[index]['coordx'])
#       coordx_list.append(xy_couple)
# #       #입력한 위경도 좌표에서 가장 가까운 위치에 있는 cctv를 찾는 과정
#       coordx_list = np.array(coordx_list)
#       leftbottom = np.array((lat, lng))
#       distances = np.linalg.norm(coordx_list - leftbottom, axis=1)
#       min_index = np.argmin(distances)

#       return cctv_data[min_index]

cctv_data = get_cctv_ulr(127.3793641, 127.3793706, 36.355093, 36.35357633)
# print('CCTV명', cctv_data['cctvname'])
# print('CCTV 영상 URL:', cctv_data['cctvurl'])