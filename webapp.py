from flask import Flask
from build_folium import BuildFolium




app = Flask(__name__)


display_map = BuildFolium.build()

@app.route('/')
def index():

    return display_map._repr_html_()


if __name__ == '__main__':
    app.run(debug=True, port=3000)