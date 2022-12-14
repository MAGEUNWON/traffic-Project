import shapefile  #the pyshp module : Should install pyshp module.
import pandas as pd
from pyproj import Proj, transform  #Should install pyproj module




shp_path_node = 'C:/Users/Administrator/Desktop/NODELINKDATA/MOCT_NODE.shp'
sf_node = shapefile.Reader(shp_path_node)

shp_path_link = 'C:/Users/Administrator/Desktop/NODELINKDATA//MOCT_LINK.shp'
sf_link = shapefile.Reader(shp_path_link)

print(sf_node.fields)
print(sf_link)

# construct pandas dataframe
#grab the shapefile's field names
fields_node = [x[0] for x in sf_node.fields][1:]
records_node = sf_node.records()
shps = [s.points for s in sf_node.shapes()]
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