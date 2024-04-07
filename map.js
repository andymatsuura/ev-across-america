let url = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=DEMO_KEY&fuel_type=ELEC';

d3.json(url).then(function(data) {
    console.log(data.features);
    createFeatures(data.features);
});

function chargerNumber(feature) {
    let result = [];

    const level1Charger = feature.properties.ev_level1_evse_num || 0;
    const level2Charger = feature.properties.ev_level2_evse_num || 0;
    const dcCharger = feature.properties.ev_dc_fast_num || 0;
    
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

function markerColor(feature) {
    const chargers = chargerNumber(feature);

    if (chargers === null) return "black"; // No chargers available

    // Define color thresholds based on the number of chargers
    if (chargers >= 25) return "green"; // High availability
    else if (chargers >= 15) return "orange"; // Medium availability
    else if (chargers >= 5) return "#66ff00"; // Low availability
    else return "##ff0000"; // Very low availability
};

function createFeatures(electricVehicleStations) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Name: ${feature.properties.station_name}</h3><hr>
            <p>Address: ${feature.properties.street_address}</p><hr><p>Network: ${feature.properties.ev_network}</p><hr><p>Accessibility: ${feature.properties.access_days_time}</p>`);
    }

    let stations = L.geoJSON(electricVehicleStations, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            let markers = {
                radius: 10,
                fillColor: markerColor(feature),
                weight: 1,
                opacity: 1, 
                color: "white",
                stroke: true,
                fillOpacity: 0.8
            };
            return L.circleMarker(latlng, markers);
        }
    });
    // console.log(stations)
    createMap(stations);
}

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

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let chargerAmount = [25, 15, 5, 0]; 
    
        div.innerHTML += "<h3>Charger Number</h3><hr><p>Radius: 210 miles</p>";
    
        for (let i = 0; i < chargerAmount.length; i++) {
            let color = markerColor(chargerAmount[i]);
            div.innerHTML +=
                '<i style="background:' + color + '"></i> ' +
                chargerAmount[i] + (chargerAmount[i + 1] ? '&ndash;' + chargerAmount[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
    
};


