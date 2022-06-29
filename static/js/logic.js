// geojson URL

// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Create map object
var myMap = L.map("map", {
    center: [38.500000,-98.000000],
    zoom: 5
});

  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
var tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

tilelayer.addTo(myMap);

  // Store our API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl).then(function(data){
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        };
    }
// set different color from magnitude
function getColor(magnitude) {
    switch (true) {
    case magnitude > 100:
    return "#ea2c2c";
    case magnitude > 70:
    return "#ea822c";
    case magnitude > 50:
    return "#ee9c00";
    case magnitude > 30:
    return "#eecc00";
    case magnitude > 10:
    return "#d4ee00";
    default:
    return "#98ee00";
    }
}
  // set radiuss from magnitude
    function getRadius(magnitude) {
    if (magnitude === 0) {
    return 1;
    }

    return magnitude * 4;
}
 // GeoJSON layer
L.geoJson(data, {
    // Maken cricles
pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng);
},
    // circle style
style: styleInfo,
    // popup for each marker
onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
}
}).addTo(myMap);

  // an object legend
var legend = L.control({
position: "bottomright"
});

  // details for the legend
legend.onAdd = function() {
var div = L.DomUtil.create("div", "info legend");

var grades = [-10, 10, 30, 50, 70, 100];
var colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
];

    // Looping through
for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    "<i style='background: " + colors[i] + "'></i> " +
    grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
}
return div;
};

  // Finally, we our legend to the map.
legend.addTo(myMap);



}



)


