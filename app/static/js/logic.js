let locations = []

d3.json(`${baseUrl}/province_centers`)
.then(
    function(data)
    { 
      locations = data;
      renderMap();
    });

// A function to determine the marker size 
function markerSizerent(rent) {
  return (rent) * 25;
}

function markerSizevr(vr) {
  return (vr) * 10000;
}

function markerColor(d) {
    return d < 500 ? "#02f1f5" :
    d < 1000? "#f0f00a" :
    d < 1200 ? "#15f00a" :
    d < 1500 ? '#eb2b09' :
    d < 1800? "#f5020b" :
    d < 2000 ? "#eb6b09" :
    "#ba1c1c";
  }
  function markerColorvr(d) {
    return d > 6? "#407353" :
    d > 5 ? "#f0f00a" :
    d > 4 ? "#15f00a" :
    d > 3 ? '#f00e12' :
    d > 2 ? "#eb6b09" :
    d > 1 ?  "#f5020b":
    "#ba1c1c";
  }

function renderMap() {
  // Define arrays to hold the markers.
  let RentMarkers = [] ;
  let VRMarkers = [] ;
  // let UnitsMarkers = []

  // Loop through locations, and create the markers.
  for (let i = 0; i < locations.length; i++) {
    let cordinates = [locations[i].Filters.CenterGeo.Lat,locations[i].Filters.CenterGeo.Lon];
    
    RentMarkers.push(
      L.circle(cordinates, {
        radius: markerSizerent(locations[i].AverageRents.Total),
        fillColor: markerColor(locations[i].AverageRents.Total),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
      }).bindPopup("<h3>"+ locations[i].Filters.Center +"<h3><h3>Average Rent:$ "+ locations[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ locations[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
    );

    VRMarkers.push(
      L.circle(cordinates, {
        radius: markerSizevr(locations[i].AvearageVacancytRate.Total),
        fillColor: markerColorvr(locations[i].AvearageVacancytRate.Total),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
      }).bindPopup("<h3>"+ locations[i].Filters.Center +"<h3><h3>Average Rent:$ "+ locations[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ locations[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
    );

  };


  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create  separate layer groups
  let rents = L.layerGroup(RentMarkers);
  let vacancyrate = L.layerGroup(VRMarkers);

  // let units = L.layerGroup(UnitsMarkers);

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
  };

  // Create an overlay object.
  let overlayMaps = {
    "Rents": rents,
    "Vacancy rate": vacancyrate,

  };

  // Define a map object.
  let myMap = L.map("map", {
    center: [49.424721, -97.695000],
    zoom: 5,
    layers: [street, rents]
  });

  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: "topright"});

  legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend"),
      Rents = [500 , 1000, 1200 , 1500 , 1800, 2000 , 2500 ];

      div.innerHTML += "<h3 style='text-align: center'>Rents</h3>"
      for (var i = 0; i < Rents.length; i++) {
      div.innerHTML +=
      '<i style="background:' + markerColor(Rents[i] + 1) + '"></i> ' +
      Rents[i] + (Rents[i + 1] ? '&ndash;' + Rents[i + 1] + '<br>' : '+');
          }
          return div;
      }  
  legend.addTo(myMap)
  // add second legend
  var legend2 = L.control({position: "topright"});

  legend2.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend"),
      VR = [6,5,4,3,2,1 ]
      

      div.innerHTML += "<h3 style='text-align: center'> Vacancy rate</h3>"
      for (var i = 0; i < VR.length; i++) {
      div.innerHTML +=
      '<i style="background:' + markerColorvr(VR[i] + 1) + '"></i> ' +
      VR[i] + (VR[i + 1] ? '&ndash;' + VR[i + 1] + '<br>' : '+');
          }
          return div;
      }  
  legend2.addTo(myMap);
}