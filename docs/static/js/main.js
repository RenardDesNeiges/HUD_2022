$(document).ready(function () {
  let pastScroll = 0;
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      if ($(this).scrollTop() > pastScroll) {
        $("#back-to-top").fadeIn();
      }
    } else {
      $("#back-to-top").fadeOut();
    }
    pastScroll = $(this).scrollTop();
  });

  $("#back-to-top").click(function () {
    $(this).fadeOut();
  });

  var i_size = 35;
  var _margin = 6;

  function generateIcon(file) {
    var _icon = L.icon({
      iconUrl: file,
      iconSize: [i_size, i_size],
      iconAnchor: [i_size / 2, i_size / 2],
      popupAnchor: [0, -i_size / 2],
      shadowUrl: "static/icons/shadow.png",
      shadowSize: [i_size + _margin, i_size + _margin],
      shadowAnchor: [(i_size + _margin) / 2, (i_size + _margin) / 2],
    });
    return _icon;
  }
  tree_icon = generateIcon("static/icons/tree.png");
  bridge_icon = generateIcon("static/icons/bridge.png");
  boat_icon = generateIcon("static/icons/boat.png");
  building_icon = generateIcon("static/icons/building.png");
  horse_icon = generateIcon("static/icons/horse-car.png");
  metro_icon = generateIcon("static/icons/metro.png");
  train_icon = generateIcon("static/icons/train.png");

  var map = L.map("map").setView([46.519, 6.633], 14);

  // cartes
  // 1838
  var latLngBounds = [
    [46.55027628387409, 6.684811216405238],
    [46.49942980642084, 6.587568581887281],
  ];

  const sieg_1838 = L.imageOverlay("static/img/1838.jpeg", latLngBounds, {
    opacity: 0.8,
    name: "Siegfried 1838",
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
    1838: sieg_1838,
    1873: sieg_1873,
    1894: sieg_1894,
    1928: sieg_1928,
  };

  const bases_dict = {};

  let control = null;

  // base vectorielle de Lausanne
  fetch("static/json/base_1838.geojson")
    .then((res) => res.json())
    .then((data) => {
      bases_dict[1838] = L.geoJSON(data, {
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

  fetch("static/json/b_1838.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1838] = L.geoJSON(data, {
        style: {
          color: "#00C19F",
        },
      }).addTo(map);
      control = L.control
        .layers(null, {
          Bâti: b_dict[1838],
          Carte: map_dict[1838],
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
          color: "#00C19F",
        },
      });
    });
  fetch("static/json/b_1928.geojson")
    .then((res) => res.json())
    .then((data) => {
      b_dict[1928] = L.geoJSON(data, {
        style: {
          color: "#00C19F",
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
          color: "white",
        },
      });
    });
  fetch("static/json/1894_funiculaire.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1894]["Funiculaire Lausanne-Ouchy"] = L.geoJSON(data, {
        style: {
          color: "#FF8247",
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
  fetch("static/json/1928_tramway.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1928]["Tramway (1928)"] = L.geoJSON(data, {
        style: {
          color: "#D7EF16",
        },
      });
    });
  fetch("static/json/1928_funiculaire.geojson")
    .then((res) => res.json())
    .then((data) => {
      t_dict[1928]["Funiculaire Lausanne-Signal"] = L.geoJSON(data, {
        style: {
          color: "#FF8247",
        },
      });
    });

  //marker images 1838
  var vallee_flon_img =
    '<img src="static/img/flon_1838.jpeg" class="w-screen"/>';
  var diligences_img =
    '<img src="static/img/hotel_des_postes.jpeg" class="w-screen"/>';
  //marker images 1873
  var vallee_flon_pont_img =
    '<img src="static/img/flon_1844_7.jpeg" class="w-screen"/>';
  var gare_1873_img =
    '<img src="static/img/Inaug_gare_lausanne.jpg" class="w-screen"/>';
  var ouchy_1873_img =
    '<img src="static/img/beau_rivage.jpeg" class="w-screen"/>';
  //marker images 1894
  var gare_1894_img = '<img src="static/img/gare_1900.jpg" class="w-screen"/>';
  var ouchy_1894_img =
    '<img src="static/img/ouchy_port_1.jpg" class="w-screen"/>';
  var funiculaire_1894_img =
    '<img src="static/img/ligne_funiculaire.jpeg" class="w-screen"/>';
  var flon_1894_img =
    '<img src="static/img/marchandises_flon.jpg" class="w-screen"/>';
  var flon_remblaiment_1894_img =
    '<img src="static/img/flon_remblement.jpg" class="w-screen"/>';
  var depot_TL_1894_img =
    '<img src="static/img/generatrice.jpg" class="w-screen"/>';
  var liberte_1894_img =
    '<img src="static/img/promenade_de_la_liberte_1905.jpg" class="w-screen"/>';
  var sainf_eglise_1894_img =
    '<img src="static/img/sainf_eglise_1899.jpg" class="w-screen"/>';

  // markers
  const markers = {
    1838: [
      L.marker([46.519549, 6.632527], { icon: horse_icon })
        .bindPopup(
          "<b>Place de la poste</b><br>Départ des Diligences, le principal mode de transport inter-urbain au mi-XIXème siècle.<br><a href='#diligences'>En lire plus</a>" +
            diligences_img
        )
        .addTo(map),
      L.marker([46.50656843687059, 6.6262587784441385], { icon: boat_icon })
        .bindPopup(
          "<b>Débarcadère</b><br>Débarcadère d'Ouchy, arrivée des bâteaux à vapeur à Lausanne.<br><a href='#ouchy'>En lire plus</a>"
        )
        .addTo(map),
      L.marker([46.52376370339941, 6.617639112903395], { icon: tree_icon })
        .bindPopup(
          "<b>Vallée du Flon</b><br>En 1838 la valée du flon n'est pas encore comblée.<br><a href='#vallee_flon'>En lire plus</a>" +
            vallee_flon_img
        )
        .addTo(map),
    ],
    1873: [
      L.marker([46.516526, 6.629209], { icon: train_icon }).bindPopup(
        "<b>Gare</b><br>Le début des trains à lausanne..<br><a href='#gare'>En lire plus</a>" +
          gare_1873_img
      ),
      L.marker([46.50656843687059, 6.62625877844413858], {
        icon: boat_icon,
      }).bindPopup(
        "<b>Ouchy</b><br>Débarcadère d'Ouchy, arrivée des bâteaux à vapeur à Lausanne.<br><a href='#ouchy_1873'>En lire plus</a>" +
          ouchy_1873_img
      ),
      L.marker([46.521708715317914, 6.626355101184518], {
        icon: bridge_icon,
      }).bindPopup(
        "<b>Vallée du Flon</b><br>En 1873 le comblement de la vallée du flon n'est que partiel.<br><a href='#vallee_flon_1857'>En lire plus</a>" +
          vallee_flon_pont_img
      ),
    ],
    1894: [
      L.marker([46.512952, 6.628115], { icon: metro_icon }).bindPopup(
        "<b>Funiculaire</b><br>Funiculaire reliant Ouchy au Flon<br><a href='#funiculaire'>En lire plus</a>" +
          funiculaire_1894_img
      ),
      L.marker([46.50656843687059, 6.6262587784441385], {
        icon: boat_icon,
      }).bindPopup(
        "<b>Débarcadère</b><br>Débarcadère d'Ouchy, arrivée des bâteaux à vapeur à Lausanne et connection avec le Funiculaire.<br><a href='#ouchy_1894'>En lire plus</a>" +
          ouchy_1894_img
      ),
      L.marker([46.52064916988745, 6.629920286708344], {
        icon: building_icon,
      }).bindPopup(
        "<b>Le Flon</b><br>Arrivée du funiculaire au flon<br><a href='#flon_1894'>En lire plus</a>" +
          flon_1894_img
      ),
      L.marker([46.521708715317914, 6.626355101184518], {
        icon: bridge_icon,
      }).bindPopup(
        "<b>Le Flon</b><br>Le flon est remblayé avec le materiau extrait pour la construction du funiculaire.<br><a href='#flon_1894'>En lire plus</a>" +
          flon_remblaiment_1894_img
      ),
      L.marker([46.52218500033085, 6.637986421916366], {
        icon: metro_icon,
      }).bindPopup(
        "<b>Dépot des Tramways Lausannois</b><br>Depot et centrale électrique.<br><a href='#tram_HQ'>En lire plus</a>" +
          depot_TL_1894_img
      ),
      L.marker([46.51960369672084, 6.6327074018760905], {
        icon: metro_icon,
      }).bindPopup(
        "<b>Saint François</b><br>Passage du Tramway à Saint-François.<br><a href='#tram_Sainf'>Voir la photo et lire l'article.</a>" +
          sainf_eglise_1894_img
      ),
      L.marker([46.516526, 6.629209], { icon: train_icon }).bindPopup(
        "<b>Gare</b><br>Développements de la gare de Lausanne.<br><a href='#gare_1894'>En lire plus</a>" +
          gare_1894_img
      ),
      L.marker([46.528844392159506, 6.630193754067561], {
        icon: metro_icon,
      }).bindPopup(
        "<b>Tramway</b><br>Passage d'un tramway devant la promenade de la liberté.<br><a href='#promenade_liberte'>Voir la photo et lire l'article.</a>" +
          liberte_1894_img
      ),
    ],
    1928: [
      L.marker([46.518924, 6.634789], { icon: metro_icon }).bindPopup(
        "<b>Tramway</b><br>Développement des tramways<br><a href='#tram1928'>En lire plus</a>"
      ),
      L.marker([46.516526, 6.629209], { icon: train_icon }).bindPopup(
        "<b>Gare</b><br>Développements de la gare de Lausanne.<br><a href='#gare_1894'>En lire plus</a>" +
          gare_1894_img
      ),
      L.marker([46.52178535359798, 6.629567871159335], {
        icon: building_icon,
      }).bindPopup(
        "<b>Bel-Air</b><br>Ascenceur a train omg c'est absolutely bananas.<br><a href='#bel_air_1928'>En lire plus</a>"
      ),
      L.marker([46.52209385399581, 6.625520412507395], {
        icon: building_icon,
      }).bindPopup(
        "<b>Entrepots du Flon</b><br>Developpement des entrepots du Flon.<br><a href='#bel_air_1928'>En lire plus</a>"
      ),
      L.marker([46.52064916988745, 6.629920286708344], {
        icon: building_icon,
      }).bindPopup(
        "<b>Flon</b><br>Le Flon en 1928.<br><a href='#flon_1928'>En lire plus</a>"
      ),
      L.marker([46.506665528620374, 6.627924678748705], {
        icon: building_icon,
      }).bindPopup(
        "<b>Ouchy</b><br>Arret Ouchy du Tramway<br><a href='#flon_1928'>En lire plus</a>"
      ),
    ],
  };

  // articles

  const articles = {
    1838: [
      $("#diligences").show(),
      $("#ouchy").show(),
      $("#vallee_flon").show(),
    ],
    1873: [$("#gare"), $("#ouchy_1873"), $("#vallee_flon_1857")],
    1894: [
      $("#funiculaire"),
      $("#tram1896"),
      $("#flon_1894"),
      $("#gare_1894"),
      $("#ouchy_1894"),
    ],
    1928: [$("#tram1928"), $("#flon_1928"), $("#bel_air_1928")],
  };

  // gestion des boutons
  $(".show-map").on("click", function () {
    const map_id = $(this).data("id");
    $("#date-text").html(map_id);

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

    markers[map_id].forEach((m) => m.addTo(map));
    articles[map_id].forEach((m) => m.show());

    // add control
    if (control) {
      map.removeControl(control);
    }

    let layers = {
      Bâti: b_dict[map_id],
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
