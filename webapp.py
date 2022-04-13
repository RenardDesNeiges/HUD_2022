from flask import Flask
import matplotlib.pyplot as plt
import numpy as np
import geopandas as gpd
import folium
import rasterio as rio


building_1830_path = 'data/b_1830.gpkg'
raster_1830_path = 'data/1830_modified.tif'

df = gpd.read_file(building_1830_path)
app = Flask(__name__)

    
with rio.open(raster_1830_path) as src:
    map_1830_boundary = src.bounds
    map_1830_img = src.read(1)

bnd = list(map_1830_boundary)
bnd = [[bnd[3], bnd[2]],[bnd[1], bnd[0]]]
clat = (bnd[0][0] + bnd[1][0])/2
clon = (bnd[0][1] + bnd[1][1])/2

display_map = folium.Map(location=[clat,clon], 
                  tiles="Stamen Terrain",
                  zoom_start=12) 

# folium.raster_layers.ImageOverlay(map_1830_img,
#                         bnd,
#                         opacity=1).add_to(display_map)
folium.GeoJson(data=df['geometry']).add_to(display_map)

print("Folium loaded!")

@app.route('/')
def index():

        

    


    

    return display_map._repr_html_()


if __name__ == '__main__':
    app.run(debug=True, port=3000)