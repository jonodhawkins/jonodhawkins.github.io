 $(document).ready(function () {

    console.log("Loading Inner Hebrides Map")

    // Get OSM Tlles
    var osm_map = L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=6a854151d2054edfa5beeace11ddbe74', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var map_layers = {}

    // Load Map Object
    var map = L.map('map', {
        layers : [osm_map]
    }).setView([56.178054, -5.422440], 8);

    // Option
    var layerControl = L.control.layers({"OSM":osm_map},{}).addTo(map);

    jQuery.getJSON("/assets/files/2023-06-18/inner_hebrides_2023_map.json", function(map_data) {


      if (!map_data.hasOwnProperty("files")) {
        console.error("Invalid map data object");
        return;
      }

      files = map_data["files"]

      // Sort files by date
      files = files.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })

      files.forEach(function (file) {
        
        var json = jQuery.getJSON("/assets/files/2023-06-18/geojson/" + file.name, function(data) {

        //   console.log(file)
        //   console.log(file.colour)

          var layer = L.geoJSON(data, { 'style' : {"color" : file.colour, "weight": 5, "opacity": 0.8} }).addTo(map)

          layerControl.addOverlay(layer, file.date)

          map_layers[file.date] = layer;  // L.layerGroup([layer])
          
        })

      })

      console.log({"OSM":osm_map})
      console.log(map_layers)

    })

    
  });