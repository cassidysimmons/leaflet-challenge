// create the earthquake visualization

// import and visualize the data by doing the following:

    // Using Leaflet, create a map that plots all the earthquakes from your dataset
    // based on their longitude and latitude

    // Your data markers should reflect the magnitude of the earthquake by their 
    // size and the depth of the earthquake by color

    // Include popups that provide additional information about 
    // the earthquake when its associated marker is clicked

    // Create a legend that will provide context for your map data

// store the API endpoint in a variable
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// preview the data
d3.json(url).then(function(data){
    console.log(data);
});

// create the map
let myMap = L.map('map',{
    center: [36.3397,-114.894117],
    zoom: 5,
});

// adding the tile layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);


/////////////////////////////////////////////////////////////////////////////////////////////
// adding markers + popups
d3.json(url).then(function(data){

// loop through the dataset
for (let i=0; i < data.features.length; i++){

    // initialize variables to use later
    let coords = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
    let depth = data.features[i].geometry.coordinates[2];
    let mag = data.features[i].properties.mag;

    // use a conditional to determine color based on 'depth'
    let color = '';
        if (depth > -10 && depth < 10){color = 'rgb(19, 235, 45)';}
        else if (depth >= 10 && depth < 30){color = 'rgb(138, 206, 0)';}
        else if (depth >= 30 && depth < 50){color = 'rgb(186, 174, 0)';}
        else if (depth >= 50 && depth < 70){color = 'rgb(218, 136, 0)';}
        else if (depth >= 70 && depth < 90){color = 'rgb(237, 91, 0)';}
        else if (depth > 90){color = 'rgb(242, 24, 31)';}

    // create the circles for each earthquake report and add popups
    L.circle(coords,{
        fillOpacity: 0.9,
        color: '',
        fillColor: color,
        radius: 10000 * mag
        }).bindPopup(`<h2>location: ${data.features[i].properties.place}</h2> <hr> <h3>magnitude: ${mag}</h3> <hr> <h3>depth: ${depth}</h3>`).addTo(myMap);

};
});

///////////////////////////////////////////////////////////////////////////////////////////////
// Set up the legend (reference day 2, activity 4 + leaflet documentation)

var legend = L.control({position: 'bottomright'});
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
    var colors = ['rgb(19, 235, 45)', 'rgb(138, 206, 0)', 'rgb(186, 174, 0)', 'rgb(218, 136, 0)', 'rgb(237, 91, 0)', 'rgb(242, 24, 31)'];
    var labels = [];

    // Add min & max
    div.innerHTML = '<h2>earthquake depth</h2>'+'<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div;
  };

  legend.addTo(myMap);













