-$(document).ready(function() {
    makeMap();

    // EVENT LISTENER
    $("#conf_filter").on("change", function() {
        makeMap();
    });


});

function makeMap() {
    // init map HTML
    $("#mapcontainer").empty();
    $("#mapcontainer").append(`<div id="map"></div>`);

    // d3 CSV
    let url = "revised_teams.csv";
    let location = [];
    let Team = [];
    d3.csv(url).then(function(data) {
        console.log(data);

        data.forEach(function(row) {
            row.ARENA_LAT = +row.ARENA_LAT;
            row.ARENA_LONG = +row.ARENA_LONG;
            row.ARENACAPACITY = +row.ARENACAPACITY;

        });


        let conf = $("#conf_filter").val();
        if (conf != "All") {
            data = data.filter(x => x.CONFERENCE == conf);
        }

        // Create a map object.
        var myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 5
        });

        // FROM QUICK START
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/satellite-v9',
            accessToken: API_KEY
        }).addTo(myMap);

        // Loop through the csv data, and create one marker for each city object.
        for (let i = 0; i < data.length; i++) {
            let city = data[i];

            location = [city.ARENA_LAT, city.ARENA_LONG];
            Team = [city.CITY + ' ' + city.NICKNAME];

            // create the marker
            L.circle(location, {
                fillOpacity: 0.75,
                color: makeColor(city.ARENACAPACITY),
                fillColor: makeColor(city.ARENACAPACITY),
                // Setting our circle's radius to equal the output of our markerSize() function:
                // This will make our marker's size proportionate to its population.
                radius: markerSize(city.ARENACAPACITY)
            }).bindPopup(`<h1>${Team}</h1> <hr> <h3>Year Founded: ${city.YEARFOUNDED}</h3> <h3>Owner: ${city.OWNER}</h3> <h3>General Manager: ${city.GENERALMANAGER}</h3> <h3>Head Coach: ${city.HEADCOACH}</h3> <h3>D League Affiliation: ${city.DLEAGUEAFFILIATION}</h3> <h3>Arena: ${city.ARENA}</h3> <h3>Arena Capacity: ${city.ARENACAPACITY.toLocaleString()}</h3>`).addTo(myMap);

        }
    });
}

// Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(ARENACAPACITY) {
    // return population / 20;
    return Math.sqrt(ARENACAPACITY) * 500
}
// HELPER FUNCTION FOR COLOR
function makeColor(ARENACAPACITY) {
    let rtnColor = "white";

    // Conditionals for country points
    if (ARENACAPACITY > 20000) {
        rtnColor = "blue";
    } else if (ARENACAPACITY > 18500) {
        rtnColor = "red";
    } else {
        rtnColor = "white";
    }

    return rtnColor;
}