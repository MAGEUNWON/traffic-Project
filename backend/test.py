
import pandas as pd
import json


# data = 'NodeLINK.json'
# df = pd.read_json(data, orient ='index', lines=False)

# print("DataFrame generated from Index Oriented JSON file:")
# print(df)


with open('test.json', encoding="UTF-8") as f:
    data = json.load(f)

    df = pd.DataFrame(data['data'])

    # print(df['geometry']['coordinates'][0][0])
    # print(df)
    
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

    # LINK_ID=[]
    # F_NODE=[]
    # T_NODE=[]
    # LANES=[]
    # ROAD_RANK=[]
    # ROAD_TYPE=[]
    # ROAD_NO=[]
    # ROAD_NAME=[]
    # ROAD_USE=[]
    # MULTI_LINK=[]
    # CONNECT=[]
    # MAX_SPD=[]
    # REST_VEH=[]
    # REST_W=[]
    # REST_H=[]
    # LENGTH=[]
    # REMARK=[]
    # node_Xcode = []
    # node_Ycode = []
    
    # # print(df['features'])
        
    for ii in df:
            print(df['geometry']['coordinates'][0])
            print(len(df['geometry']['coordinates'][0]))

    #     # res_node = df[df['features'][0:]['properties']['NODE_ID'] == str(ii) ] # STNL_REG is not int.

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
    # }
    # df15 = pd.DataFrame(data)

    # print(df15)

    
    # df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")

    # print(df_node)
 


