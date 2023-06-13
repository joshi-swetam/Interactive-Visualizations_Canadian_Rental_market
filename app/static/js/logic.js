let province_centers = [];

d3.json(`${baseUrl}/province_centers`)
.then(
    function(data)
    { 
      province_centers = data;

      renderRentalInformationByCenter();

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

  // Loop through province_centers, and create the markers.
  for (let i = 0; i < province_centers.length; i++) {
    let cordinates = [province_centers[i].Filters.CenterGeo.Lat,province_centers[i].Filters.CenterGeo.Lon];
    
    RentMarkers.push(
      L.circle(cordinates, {
        radius: markerSizerent(province_centers[i].AverageRents.Total),
        fillColor: markerColor(province_centers[i].AverageRents.Total),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
      }).bindPopup("<h3>"+ province_centers[i].Filters.Center +"<h3><h3>Average Rent:$ "+ province_centers[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ province_centers[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
    );

    VRMarkers.push(
      L.circle(cordinates, {
        radius: markerSizevr(province_centers[i].AvearageVacancytRate.Total),
        fillColor: markerColorvr(province_centers[i].AvearageVacancytRate.Total),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
      }).bindPopup("<h3>"+ province_centers[i].Filters.Center +"<h3><h3>Average Rent:$ "+ province_centers[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ province_centers[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
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

function renderRentalInformationByCenter() {
  var selProvince = d3.select("#selProvince");

  var provinceNames = [ "Que", "Alta","Ont.","B.C.","Man.","Sask."];
  provinceNames.sort(function(a, b){return a - b});

  // populate province dropdown for rental information by center
  provinceNames.forEach((province) => {
    selProvince
      .append("option")
      .text(province)
      .property("value", province);
  });
  
  // initialize the dashboard and assign them to the functions created earlier
  renderRentalInfoByCenterCharts(selProvince.node().value);
}

function renderRentalInfoByCenterCharts(Province){
  let rent_array = [];
  let centres_array = [];
  let vacancy_array = [] ;
  let units_array = []; 

  for (i = 0 ; i < province_centers.length ; i ++){
      if (province_centers[i].Filters.Province == Province){
          rent_array.push(province_centers[i].AverageRents.Total);
          centres_array.push(province_centers[i].Filters.Center);
          vacancy_array.push(province_centers[i].AvearageVacancytRate.Total);
          units_array.push(province_centers[i].TotalNumberOfUnits.Total)
      }
      
      var trace_bar = [
          {
          x : centres_array, 
          y : rent_array,
          type : "bar",
          marker: {
              color: 'DE738F',
              width: 10
          },
      }
      ];

      var bar_Layout = {
          title: {text : `<b>Average Rents (Centres)</b>`,font: { size: 24 }},
      };
      Plotly.newPlot("bar", trace_bar, bar_Layout);
  }

  // pie chart
  var pie_data = [
      {
      values : units_array,
      labels : centres_array,
      type : "pie"
  }];

  var pie_layout = {
      title: {text : `<b> Units Available </b>`,font: { size: 24 }},

  }
  Plotly.newPlot("pie",pie_data,pie_layout);
};