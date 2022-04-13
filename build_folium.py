import folium
import geopandas as gpd
import rasterio as rio
from skimage.transform import resize


class BuildFolium:
    @staticmethod
    def rio_to_folium_coords(rio_coords):
        bnd = list(rio_coords)
        bnd = [[bnd[3], bnd[2]],[bnd[1], bnd[0]]]
        clat = (bnd[0][0] + bnd[1][0])/2
        clon = (bnd[0][1] + bnd[1][1])/2
        return bnd, clat, clon


    @staticmethod
    def add_raster(path,subsample=1):
        
        with rio.open(path) as src:
            map_boundary = src.bounds
            map_img = src.read(1)

        bnd, clat, clon = BuildFolium.rio_to_folium_coords(map_boundary)
        
        map_low_res = resize(map_img, (map_img.shape[0]//subsample, map_img.shape[1]//subsample))
        
        raster = folium.raster_layers.ImageOverlay(map_low_res,
                                bnd,
                                opacity=1)
        
        return raster, clat, clon

    
    @staticmethod
    def add_shape(path):
        df = gpd.read_file(path)
        return folium.GeoJson(data=df['geometry'])
        
    
    @staticmethod
    def build():        
        
        building_1830_path = 'data/b_1830.gpkg'
        raster_1830_path = 'data/1830_modified.tif'
        
        raster, clat, clon = BuildFolium.add_raster(raster_1830_path,3)
        shape = BuildFolium.add_shape(building_1830_path)
        display_map = folium.Map(location=[clat,clon], 
                        tiles="Stamen Terrain",
                        zoom_start=15) 

        raster.add_to(display_map)
        
        shape.add_to(display_map)

        print("Folium loaded!")
        return display_map