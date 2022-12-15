import geopandas as gpd
import matplotlib.pyplot as plt



# shp_path_link = 'C:/Users/Administrator/Desktop/NODELINKDATA//MOCT_LINK.shp'
# sf_link = shapefile.Reader(shp_path_link)

# print(sf_node.fields)
# print(sf_link)

plt.rcParams['font.family'] = 'NanumGothic'
plt.rcParams['figure.figsize'] = (10,10)

shp_path_node = 'C:/Users/Administrator/Desktop/NODELINKDATA/MOCT_NODE.shp'
node = gpd.read_file(shp_path_node)
print(node)

# construct pandas dataframe
#grab the shapefile's field names
# fields_node = [x[0] for x in sf_node.fields][1:]
# records_node = sf_node.records()
# shps = [s.points for s in sf_node.shapes()]
# records_node = sf_node.records()
# shps = [s.points for s in sf_node.shapes()] # node has coordinate data.
# # link
# fields_link = [x[0] for x in sf_link.fields][1:]
# records_link = sf_link.records()

# #write the records into a dataframe
# #node
# node_dataframe = pd.DataFrame(columns=fields_node, data=records_node)
# #add the coordinate data to a column called "coords"
# node_dataframe = node_dataframe.assign(coords=shps)
# # link
# link_dataframe = pd.DataFrame(columns=fields_link, data=records_link)