
$(document).ready(function () {

  var _tile_background =  L.tileLayer.wms('https://wms.geo.admin.ch/?', {
    layers: 'ch.bafu.schutzgebieten-emeraude',
    'transparent' : true,
})

  var map = L.map("map").setView([46.51924129322557, 6.6315754917602625], 14);

  // cartes
  // 1830
  var latLngBounds = [
    [46.55027628387409, 6.684811216405238],
    [46.49942980642084, 6.587568581887281],
  ];

  const sieg_1830 = L.imageOverlay("static/img/1830.jpeg", latLngBounds, {
    opacity: 0.8,
    name: "Siegfried 1830",
  });

  // 1873
  latLngBounds = [
    [
      [46.536230907060336, 6.653243828313067],
      [46.49817591683952, 6.61402808053038],
    ],
  ];

  const sieg_1873 = L.imageOverlay("static/img/1873.jpeg", latLngBounds, {
    opacity: 0.8,
    name: "Siegfried 1873",
  });

  // 1894
  latLngBounds = [
    [
      [46.53624321482287, 6.653235426700275],
      [46.49817075312506, 6.614001674523649],
    ],
  ];

  const sieg_1894 = L.imageOverlay("static/img/1894.jpeg", latLngBounds, {
    opacity: 0.8,
    name: "Siegfried 1894",
  });

  // 1873
  latLngBounds = [
    [
      [46.53623237843531, 6.653260670017674],
      [46.49817893730855, 6.614010242714632],
    ],
  ];

  const sieg_1928 = L.imageOverlay("static/img/1928.jpeg", latLngBounds, {
    opacity: 0.8,
    name: "Siegfried 1928",
  });

  const map_dict = {
    1830: sieg_1830,
    1873: sieg_1873,
    1894: sieg_1894,
    1928: sieg_1928,
  };

  const bases_dict = {};

  let control = null;

  _tile_background.addTo(map);
  // base vectorielle de Lausanne
  fetch("static/json/base_1830.geojson")
    .then((res) => res.json())
    .then((data) => {
      bases_dict[1830] = L.geoJSON(data, {
        style: {
          color: "gray",
        },
      }).addTo(map);
    });
  fetch("static/json/base_1873.geojson")
    .then((res) => res.json())
    .then((data) => {
      bases_dict[1873] = L.geoJSON(data, {
        style: {
          color: "gray",
        },
      });
    });
  fetch("static/json/base_1894.geojson")
    .then((res) => res.json())
    .then((data) => {
      bases_dict[1894] = L.geoJSON(data, {
        style: {
          color: "gray",
        },
      });
    });
  fetch("static/json/base_1928.geojson")
    .then((res) => res.json())
    .then((data) => {
      bases_dict[1928] = L.geoJSON(data, {
        style: {
          color: "gray",
        },
      });
    });

  // bati
  const b_dict = {};

  fetch("static/json/b_1830.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1830] = L.geoJSON(data, {
        style: {
          color: "#00B9E3",
        },
      }).addTo(map);
      control = L.control
        .layers(null, {
          Bati: b_dict[1830],
          Carte: map_dict[1830],
        })
        .addTo(map);
    });
  fetch("static/json/b_1873.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1873] = L.geoJSON(data, {
        style: {
          color: "#00C19F",
        },
      });
    });
  fetch("static/json/b_1894.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1894] = L.geoJSON(data, {
        style: {
          color: "#619CFF",
        },
      });
    });
  fetch("static/json/b_1928.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1928] = L.geoJSON(data, {
        style: {
          color: "#F8766D",
        },
      });
    });

  // moyens de transport
  const t_dict = {
    1873: {},
    1894: {},
    1928: {},
  };

  fetch("static/json/1873_train.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1873]["Train"] = L.geoJSON(data, {
        style: {
          color: "#FFBDFF",
        },
      });
    });
  fetch("static/json/1894_funiculaire.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1894]["Funiculaire"] = L.geoJSON(data, {
        style: {
          color: "#FFD64C",
        },
      });
    });
  fetch("static/json/1896_tramway.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1894]["Tramway (1896)"] = L.geoJSON(data, {
        style: {
          color: "#D7EF16",
        },
      });
    });
  fetch("static/json/1928_tramway_1.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1928]["Tramway 1 (1928)"] = L.geoJSON(data, {
        style: {
          color: "#55FF8A",
        },
      });
    });
  fetch("static/json/1928_tramway_2.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1928]["Tramway 2 (1928)"] = L.geoJSON(data, {
        style: {
          color: "#55FF8A",
        },
      });
    });

  // markers

  const markers = {
    1830: [
      L.marker([46.519549, 6.632527])
        .bindPopup(
          "<b>Place de la poste</b><br>Diligences...<br><a href='#diligences'>En lire plus</a>"
        )
        .addTo(map),
    ],
    1873: [
      L.marker([46.516526, 6.629209]).bindPopup(
        "<b>Gare</b><br>Le début des trains à lausanne..<br><a href='#gare'>En lire plus</a>"
      ),
    ],
    1894: [
      L.marker([46.512952, 6.628115]).bindPopup(
        "<b>Funiculaire</b><br>Funiculaire reliant Ouchy au Flon<br><a href='#funiculaire'>En lire plus</a>"
      ),
      L.marker([46.518924, 6.634789]).bindPopup(
        "<b>Tramway (1896)</b><br>Début des tramways à lausanne<br><a href='#tram1896'>En lire plus</a>"
      ),
    ],
    1928: [
      L.marker([46.518924, 6.634789]).bindPopup(
        "<b>Tramway</b><br>Développement des tramways<br><a href='#tram1928'>En lire plus</a>"
      ),
    ],
  };

  
  // articles

  const articles = {
    1830: [$("#diligences").show()],
    1873: [$("#gare")],
    1894: [$("#funiculaire"), $("#tram1896")],
    1928: [$("#tram1928")],
  };

  // gestion des boutons
  $(".show-map").on("click", function () {
    const map_id = $(this).data("id");
    for (const key in map_dict) {
      map.removeLayer(map_dict[key]);
      map.removeLayer(bases_dict[key]);
      map.removeLayer(b_dict[key]);
      for (const key2 in t_dict[key]) {
        map.removeLayer(t_dict[key][key2]);
      }
      markers[key].forEach((m) => map.removeLayer(m));
      articles[key].forEach((a) => a.hide());
    }
    
    b_dict[map_id].addTo(map);
    bases_dict[map_id].addTo(map);
    for (const key in t_dict) {
      if (map_id >= key) {
        for (const key2 in t_dict[key]) {
          t_dict[key][key2].addTo(map);
        }
      }
    }
    _tile_background.addTo(map);
    
    markers[map_id].forEach((m) => m.addTo(map));
    articles[map_id].forEach((m) => m.show());

    // add control
    if (control) {
      map.removeControl(control);
    }

    let layers = {
      Bati: b_dict[map_id],
      Carte: map_dict[map_id],
    };

    Object.entries(t_dict)
      .filter(([key, val]) => {
        return key <= map_id;
      })
      .forEach(([key, val]) => {
        layers = {
          ...layers,
          ...val,
        };
      });
    control = L.control.layers(null, layers).addTo(map);
  });
});
