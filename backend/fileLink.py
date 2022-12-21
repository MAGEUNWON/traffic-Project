
import pandas as pd
import json
import numpy as np


# data = 'NodeLINK.json'
# df = pd.read_json(data, orient ='index', lines=False)

# print("DataFrame generated from Index Oriented JSON file:")
# print(df)


with open('LINK_Data.geojson', encoding="UTF-8") as f:
    data = json.load(f)

    df = pd.DataFrame(dict(data))
    
    # print(df['features'][0])
    # features = df['features'][0]['properties']
    # print(features)

    # print(df['features'][0:len(df['features'])]['properties']['NODE_ID'])
    # node_type = []
    # node_name = []
    # turn_p = []
    # node_Xcode = []
    # node_Ycode = []
    # node_id = []

    LINK_ID=[]
    F_NODE=[]
    T_NODE=[]
    LANES=[]
    ROAD_RANK=[]
    ROAD_TYPE=[]
    ROAD_NO=[]
    ROAD_NAME=[]
    ROAD_USE=[]
    MULTI_LINK=[]
    CONNECT=[]
    MAX_SPD=[]
    REST_VEH=[]
    REST_W=[]
    REST_H=[]
    LENGTH=[]
    REMARK=[]
    coordinates = []
    
    # print(df['features'])
        
    for ii in df['features']:
        if ii['properties']['LINK_ID'][0:3] == '183' or ii['properties']['LINK_ID'][0:3] == '184' or ii['properties']['LINK_ID'][0:3] == '185'or ii['properties']['LINK_ID'][0:3] == '186' or ii['properties']['LINK_ID'][0:3] == '187':
            LINK_ID.append(ii['properties']['LINK_ID'])
            F_NODE.append(ii['properties']['F_NODE'])
            T_NODE.append(ii['properties']['T_NODE'])
            LANES.append(ii['properties']['LANES'])
            ROAD_RANK.append(ii['properties']['ROAD_RANK'])
            ROAD_TYPE.append(ii['properties']['ROAD_TYPE'])
            ROAD_NO.append(ii['properties']['ROAD_NO'])
            ROAD_NAME.append(ii['properties']['ROAD_NAME'])
            ROAD_USE.append(ii['properties']['ROAD_USE'])
            MULTI_LINK.append(ii['properties']['MULTI_LINK'])
            CONNECT.append(ii['properties']['CONNECT'])
            MAX_SPD.append(ii['properties']['MAX_SPD'])
            REST_VEH.append(ii['properties']['REST_VEH'])
            REST_W.append(ii['properties']['REST_W'])
            REST_H.append(ii['properties']['REST_H'])
            LENGTH.append(ii['properties']['LENGTH'])
            REMARK.append(ii['properties']['REMARK'])


            # LINK_ID.append(ii['properties']['LINK_ID'])
            # F_NODE.append(ii['properties']['F_NODE'])
            # T_NODE.append(ii['properties']['T_NODE'])
            # LANES.append(ii['properties']['LANES'])
            # ROAD_RANK.append(ii['properties']['ROAD_RANK'])
            # ROAD_TYPE.append(ii['properties']['ROAD_TYPE'])
            # ROAD_NO.append(ii['properties']['ROAD_NO'])
            # ROAD_NAME.append(ii['properties']['ROAD_NAME'])
            # ROAD_USE.append(ii['properties']['ROAD_USE'])
            # MULTI_LINK.append(ii['properties']['MULTI_LINK'])
            # CONNECT.append(ii['properties']['CONNECT'])
            # MAX_SPD.append(ii['properties']['MAX_SPD'])
            # REST_VEH.append(ii['properties']['REST_VEH'])
            # REST_W.append(ii['properties']['REST_W'])
            # REST_H.append(ii['properties']['REST_H'])
            # LENGTH.append(ii['properties']['LENGTH'])
            # REMARK.append(ii['properties']['REMARK'])

            coordinates.append(ii['geometry']['coordinates'][0])

        # res_node = df[df['features'][0:]['properties']['NODE_ID'] == str(ii) ] # STNL_REG is not int.

    data = {
        "LINK_ID":LINK_ID,
        "F_NODE":F_NODE,
        "T_NODE":T_NODE,
        "LANES":LANES,
        "ROAD_RANK":ROAD_RANK,
        "ROAD_TYPE":ROAD_TYPE,
        "ROAD_NO":ROAD_NO,
        "ROAD_NAME":ROAD_NAME,
        "ROAD_USE":ROAD_USE,
        "MULTI_LINK":MULTI_LINK,
        "CONNECT":CONNECT,
        "MAX_SPD":MAX_SPD,
        "REST_VEH":REST_VEH,
        "REST_W":REST_W,
        "REST_H":REST_H,
        "LENGTH":LENGTH,
        "REMARK":REMARK,
        "coordinates":coordinates,
    }

    df15 = pd.DataFrame(data)

    list2 = sum(coordinates, [])

    for i in range(len(coordinates)):
        for j in coordinates[i]:
            print(i)
            print(j)


    # df16 = pd.DataFrame(list2)
    # print(df16)


    # columns = ["위도", "경도",'추가']

    # print(len(coordinates))
    # print(df15)

    # for i in coordinates:
    #     print(i)
        
    # data = {
    #     "LINK_ID":LINK_ID,
    #     "F_NODE":F_NODE,
    #     "T_NODE":T_NODE,
    #     "LANES":LANES,
    #     "ROAD_RANK":ROAD_RANK,
    #     "ROAD_TYPE":ROAD_TYPE,
    #     "ROAD_NO":ROAD_NO,
    #     "ROAD_NAME":ROAD_NAME,
    #     "ROAD_USE":ROAD_USE,
    #     "MULTI_LINK":MULTI_LINK,
    #     "CONNECT":CONNECT,
    #     "MAX_SPD":MAX_SPD,
    #     "REST_VEH":REST_VEH,
    #     "REST_W":REST_W,
    #     "REST_H":REST_H,
    #     "LENGTH":LENGTH,
    #     "REMARK":REMARK,
    #     # "coordinates":coordinates,
    # }

    # df15 = pd.DataFrame(data)
    # columns = ["위도", "경도",'추가']

  
    # df16 = pd.DataFrame(coordinates, columns=columns)
    
    # print(df16)
  # arr = np.array(coordinates, dtype=object)
    # newarr = arr.reshape(-1)
    # print(newarr,"프린트 출력!")
  
   
    # for i, val in enumerate(df16):
    #     print(df16)

    # print(df15)


    df15.to_csv("Daejeon_LINK_T.csv", encoding="utf-8-sig")
    # df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")
    # df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")
    # df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")
    # df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")

    # print(df_node)
 


