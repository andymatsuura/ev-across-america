let url = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=DEMO_KEY&fuel_type=ELEC';

d3.json(url).then(function(data) {
    console.log(data.features);
    createFeatures(data.features);
});

function createFeatures(electricVehicleStations) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Name: ${feature.properties.station_name}</h3><hr>
            <p>Address: ${feature.properties.street_address}</p><hr><p>Network: ${feature.properties.ev_network}</p><hr><p>Accessibility: ${feature.properties.access_days_time}</p>`);
    }

    let stations = L.geoJSON(electricVehicleStations, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            // let fillColor = getMarkerColor(feature); // Get marker color dynamically
            let markers = {
                radius: 1,
                fillColor: "red",
                weight: 1,
                opacity: 1, 
                color: "black",
                stroke: true,
                fillOpacity: 0.8
            };
            return L.circleMarker(latlng, markers);
        }
    });
    // console.log(stations)
    createMap(stations);
}

// function getMarkerColor(feature) {
//     Add your logic to determine marker color based on feature properties
//     Example:
//     if (feature.properties.someProperty === someValue) {
//         return "green";
//     } else {
//         return "red";
//     }
//     return "red"; // Default color if no condition matches
// }

function createMap(stations) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    let overlayMaps = {
        "EV Stations": stations
    };

    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street]
    });
    console.log("hi")

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}


