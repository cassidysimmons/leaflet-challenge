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
    center: [-149.1283,60.8168],
    zoom: 2,
});

// adding the tile layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

////////////////////////////// adding styling to the map ////////////////////////////////////////
d3.json(url).then(function(data){
    L.geoJSON(data.properties,{
        style: {
            color: 'white',
            fillColor: data.geometry.coordinates[2],
            fillOpacity: 0.5,
            weight: data.mag
        }
    }).addTo(myMap);
});

//////////////////////////////// adding markers and popups ///////////////////////////////////////
d3.json(url).then(function(data){

    // create a new marker cluster group
    let markers = [];

    // loop through the data
    for (let i=0; i < data.length; i++){
        // add a new marker to the cluster group, and bind a popup
        markers.push(L.marker([location.coordinates[0], location.coordinates[1]]).bindPopup(data[i].place))
    };

    let layer = L.layerGroup(markers);

    let overlayMaps = {
        markers: layer
    };

    L.control.layers(overlayMaps).addTo(myMap);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

d3.json(url).then(function(data){

    let markers = L.markerClusterGroup();

    for (let i=0; i < data.length; i++){

        let location = data.geometry;

        if(location){
            markers.addLayer(L.marker([location.coordinates[0], location.coordinates[1]]).bindPopup(`<h3>${data[i].place}</h3>`))
        }
    };
    myMap.addLayer(markers);
});