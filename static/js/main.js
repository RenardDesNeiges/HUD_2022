// var map = L.map("map").setView([51.505, -0.09], 13);

$(document).ready(function () {
  var map = L.map("map").setView([46.51924129322557, 6.6315754917602625], 13);

  var Stamen_Toner = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
      ext: "png",
    }
  );
  map.addLayer(Stamen_Toner);

  // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution:
  //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  // }).addTo(map);

  var latLngBounds = [
    [46.55027628387409, 6.684811216405238],
    [46.49942980642084, 6.587568581887281],
  ];

  var sieg_1830 = L.imageOverlay(
    "/static/img/1830_modified.jpg",
    latLngBounds,
    {
      opacity: 0.8,
      name: "Siegfried 1830",
    }
  ).addTo(map);

  fetch("/static/json/b_1830.geojson")
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, { name: "Bati 1830" }).addTo(map);
    });

  $("#hide-layer").on("click", function () {
    if (map.hasLayer(sieg_1830)) {
      map.removeLayer(sieg_1830);
    } else {
      map.addLayer(sieg_1830);
    }
  });
});
