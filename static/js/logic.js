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
    center: [39, -98.5795],
    zoom: 5,
});

// adding the tile layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);


/////////////////////////////////////////////////////////////////////////////////////////////
d3.json(url).then(function(data){

// loop through the dataset
for (let i=0; i < data.features.length; i++){

    // initialize variables to use later
    let coords = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
    let depth = data.features[i].geometry.coordinates[2];
    let mag = data.features[i].properties.mag;

    // use a conditional to determine color based on 'depth'
    let color = '';
        if (depth > -10 && depth < 10){color = 'green';}
        else if (depth >= 10 && depth < 30){color = 'yellow';}
        else if (depth >= 30 && depth < 50){color = 'orange';}
        else if (depth >= 50 && depth < 70){color = 'red';}
        else if (depth >= 70 && depth < 90){color = 'purple';}
        else if (depth > 90){color = 'black';}

    // create the circles for each earthquake report and add popups
    L.circle(coords,{
        fillOpacity: 0.9,
        color: '',
        fillColor: color,
        radius: 10000 * mag
        }).bindPopup(`<h3>${data.features.place}</h3>`).addTo(myMap);

};
});




///////////////////////////////////////////////////////////////////////////////////////////////
// Set up the legend (reference day 2, activity 4) 














