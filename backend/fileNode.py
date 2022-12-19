
import pandas as pd
import json


# data = 'NodeLINK.json'
# df = pd.read_json(data, orient ='index', lines=False)

# print("DataFrame generated from Index Oriented JSON file:")
# print(df)


with open('LINK_Data.geojson', encoding="UTF-8") as f:
    data = json.load(f)
    # print(data['features'])


    # range_STNL_REG=range(0,201494) # STNL_REG for Incheon
    # print(range_STNL_REG)

    # df_node = pd.DataFrame()
    # df_link = pd.DataFrame()
  

    df = pd.DataFrame(dict(data))
    # print(df['features'][0])
    print(df)
    # features = df['features'][0]['properties']
    # print(features)

    # print(df['features'][0:len(df['features'])]['properties']['NODE_ID'])
    node_type = []
    node_name = []
    turn_p = []
    node_Xcode = []
    node_Ycode = []
    node_id = []

        
    for ii in df['features']:
        if ii['properties']['NODE_ID'][0:3] == '183' or ii['properties']['NODE_ID'][0:3] == '184' or ii['properties']['NODE_ID'][0:3] == '185'or ii['properties']['NODE_ID'][0:3] == '186' or ii['properties']['NODE_ID'][0:3] == '187':
            # print(ii['properties'])
            # print(ii['geometry']['coordinates'])
            node_id.append(ii['properties']['NODE_ID'])
            node_type.append(ii['properties']['NODE_TYPE'])
            node_name.append( ii['properties']['NODE_NAME'])
            turn_p.append(ii['properties']['TURN_P'])
            node_Xcode.append(ii['geometry']['coordinates'][0])
            node_Ycode.append(ii['geometry']['coordinates'][1])

        # res_node = df[df['features'][0:]['properties']['NODE_ID'] == str(ii) ] # STNL_REG is not int.


    data = {
        "node_id":node_id,
        "node_type":node_type,
        "node_name":node_name,
        "turn_p":turn_p,
        "node_Xcode":node_Xcode,
        "node_Ycode":node_Ycode
    }
    df15 = pd.DataFrame(data)

    print(df15)
    
    df15.to_csv("Daejeon_LINK.csv", encoding="utf-8-sig")

    # print(df_node)
 


