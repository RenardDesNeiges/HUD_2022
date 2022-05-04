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
    def add_raster(path,name,subsample=1):
        
        with rio.open(path) as src:
            map_boundary = src.bounds
            map_img = src.read(1)

        bnd, clat, clon = BuildFolium.rio_to_folium_coords(map_boundary)
        
        map_low_res = resize(map_img, (map_img.shape[0]//subsample, map_img.shape[1]//subsample))
        
        raster = folium.raster_layers.ImageOverlay(map_low_res,
                                bnd,
                                opacity=1,
                                name=name)
        
        return raster, clat, clon

    
    @staticmethod
    def add_shape(path,name):
        df = gpd.read_file(path)
        return folium.GeoJson(data=df['geometry'],name=name)
        
    
    @staticmethod
    def build():        
        
        building_1830_path = 'data/b_1830.gpkg'
        raster_1830_path = 'data/1830_modified.tif'
        
        
        
        raster, clat, clon = BuildFolium.add_raster(raster_1830_path,'Carte 1830',3)
        shape = BuildFolium.add_shape(building_1830_path, 'Bati 1830')

        display_map = folium.Map(location=[clat,clon], 
                        tiles=None,
                        zoom_start=15) 

        raster.add_to(display_map)
        
        shape.add_to(display_map)
        
        folium.LayerControl(collapse=False).add_to(display_map)


        print("Folium loaded!")
        return display_map


if __name__ == '__main__':
    with rio.open('data/1830_modified.tif') as src:
            map_boundary = src.bounds
            map_img = src.read(1)
    bnd, clat, clon = BuildFolium.rio_to_folium_coords(map_boundary)
    print("Boundaries :", bnd)
    df = gpd.read_file('data/b_1830.gpkg')
    df.geometry = df.geometry.to_crs('EPSG:4326')
    df.to_file('static/json/b_1830.geojson', driver='GeoJSON')