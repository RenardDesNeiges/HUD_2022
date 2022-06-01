# Le développement des transports publics Lausannois en 1900

"Une histoire géographique du développement des transports dans le centre ville de Lausanne"

Construction d'un site internet permettant d'explorer le développement des transports publics Lausannois de 1830 a 1928. Projet réalisé dans le cadre du cours Histoire Urbaine et Digitale à l'EPFL. 

![demo_2](demo_2.gif)

Visiter le site internet en ligne, [lien ici](https://renarddesneiges.github.io/HUD_2022/).

# Organisation des fichiers et du code

## *Site internet*

La carte est implémentée avec la librairie `Leaflet.js`, le site utilise la librairie `tailwind` pour le css.

## *Données géographiques*

```
 - data
 |--- 1830
 |-------> batiments shapefile
 |-------> raster 1830
 |-------- transports
 |----------> diligences
 |--- 1845
 |-------> batiments shapefile
 |-------> raster 1845 siegfried
 |-------- transports
 |----------> funiculaires
 |----------> trains
 |--- 1903
 |-------> batiments shapefile
 |-------> raster 1903
 |-------- transports
 |----------> + de funiculaires
 |----------> trams
 |----------> trains
 |--- 1923
 |-------> batiments shapefile
 |-------> raster 1903
 |----------> trams
 |----------> trains
```

## *Parsing des données*

Le fichier python `build_folium.py` converti des shapefiles générés par QGIS en `geojson` lisibles par le site internet. Les modules requis pour l'utiliser sont listés dans `requirements.txt`.