let url = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=DEMO_KEY&fuel_type=ELEC';

d3.json(url).then(function(data) {
    console.log(data.features);
    createFeatures(data.features);
});

function chargerNumber(feature) {
    let result = [];

    const level1Charger = feature.properties.ev_level1_evse_num;
    const level2Charger = feature.properties.ev_level2_evse_num;
    const dcCharger = feature.properties.ev_dc_fast_num;
    
    if (level1Charger === null && level2Charger === null && dcCharger === null) {
        result.push(null);
    } else if (level1Charger === null && level2Charger === null) {
        result.push(dcCharger);
    } else if (level1Charger === null && dcCharger === null) {
        result.push(level2Charger);
    } else if (level2Charger === null && dcCharger === null) {
        result.push(level1Charger);
    } else if (level1Charger === null) {
        result.push(level2Charger + dcCharger);
    } else if (level2Charger === null) {
        result.push(level1Charger + dcCharger);
    } else if (dcCharger === null) {
        result.push(level1Charger + level2Charger);
    } else {
        result.push(level1Charger + level2Charger + dcCharger);
    }
    return result
    
}

function markerColor(chargers) {
    // Define color thresholds based on the number of chargers
    if (chargers < 0) return "red"; 
    else if (chargers < 5) return "red"; 
    else if (chargers < 15) return "orange"; 
    else if (chargers < 25) return  "yellow"; 
    else return "green"
};

function createFeatures(electricVehicleStations) {
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup(`<h3>Name: ${feature.properties.station_name}</h3><hr>
    //         <p>Address: ${feature.properties.street_address}</p><hr><p>Network: ${feature.properties.ev_network}</p><hr><p>Accessibility: ${feature.properties.access_days_time}</p>`);
    // }
    // var centerLatLng = myMap.getCenter(); // get map center
    // var pointC = myMap.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
    // var pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
    // var pointY = [pointC.x, pointC.y + 1]; // add one pixel to y

    // // convert containerpoints to latlng's
    // var latLngC = map.containerPointToLatLng(pointC);
    // var latLngX = map.containerPointToLatLng(pointX);
    // var latLngY = map.containerPointToLatLng(pointY);

    // var distanceX = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
    // var distanceY = latLngC.distanceTo(latLngY); // calculate distance between c and y (longitude)

    // let stations = L.geoJSON(electricVehicleStations, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         let markers = {
    //             radius: 210 / distanceX,
    //             fillColor: markerColor(chargerNumber(feature)),
    //             weight: 1,
    //             opacity: 1, 
    //             color: "white",
    //             stroke: true,
    //             fillOpacity: 0.8
    //         };
    //         return L.circleMarker(latlng, markers);
    //     }
    // });
    // console.log(stations)
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Name: ${feature.properties.station_name}</h3><hr>
            <p>Address: ${feature.properties.street_address}</p><hr><p>Network: ${feature.properties.ev_network}</p><hr><p>Accessibility: ${feature.properties.access_days_time}</p>`);
    }
 
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



    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street]
    });

    var centerLatLng = myMap.getCenter(); // get map center
    var pointC = myMap.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
    var pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
    var pointY = [pointC.x, pointC.y + 1]; // add one pixel to y

    // convert containerpoints to latlng's
    var latLngC = myMap.containerPointToLatLng(pointC);
    var latLngX = myMap.containerPointToLatLng(pointX);
    var latLngY = myMap.containerPointToLatLng(pointY);

    var distanceX = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
    // var distanceY = latLngC.distanceTo(latLngY); // calculate distance between c and y (longitude)
    console.log(distanceX)
    console.log(pointC.x)
    console.log(latLngC)

    let stations = L.geoJSON(electricVehicleStations, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            let markers = {
                radius: 210 / distanceX * 100,
                fillColor: markerColor(chargerNumber(feature)),
                weight: 1,
                opacity: 1, 
                color: "white",
                stroke: true,
                fillOpacity: 0.8
            };
            return L.circleMarker(latlng, markers);
        }
    });

    let overlayMaps = {
        "EV Stations": stations
    };

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let chargerAmount = [0, 5, 15, 25]; 
    
        div.innerHTML += "<h3>Charger Number</h3><hr><p>Radius: Approximately 210 miles</p>";
    
        for (let i = 0; i < chargerAmount.length; i++) {
            if (i === chargerAmount.length - 1) {
                div.innerHTML +=
                    '<i style="background:' + markerColor(chargerAmount[i]) + '"></i> ' +
                    chargerAmount[i] + '+<br>';
            } else {
                div.innerHTML +=
                    '<i style="background:' + markerColor(chargerAmount[i]) + '"></i> ' +
                    chargerAmount[i] + (chargerAmount[i + 1] ? '&ndash;' + chargerAmount[i + 1] + '<br>' : '');
            }
        }
        return div;
    };
    legend.addTo(myMap);
    
};


