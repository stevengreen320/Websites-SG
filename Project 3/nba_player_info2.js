$(document).ready(function() {
    // alert("Page Loaded");

    getData();
});

function getData() {
    let url = "ppp_player_mean.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            // DO WORK HERE
            console.log(data);
            buildDropdown(data);
            buildGaugePlot(data);
        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

function getData2() {
    let url = "ppp_player_mean.json";

    d3.json(url).then(function(data) {
        // DO WORK HERE
        console.log(data);
        buildDropdown(data);
    });
}

////////////////////// 5 Things Functions ///////////////////

function buildDropdown(data) {
    let names = data.PLAYER_NAME;

    // loop through names, create html, put into dropdown
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html_option = `<option value="${name}">${name}</option>`;
        $("#selDataset").append(html_option);
    }
}

function buildGaugePlot() {
    let player_id = $("#selDataset").val();
    let ppp_data = data.PPP.filter(x => x.player_id === player_id)[0];

    var trace1 = {
        domain: { x: [0, 1], y: [0, 1] },
        gauge: {
            axis: { range: [null, 3], tickwidth: 1, tickcolor: "black", dtick: 1 },
            bar: { color: "blue" },
            bgcolor: "white",
            borderwidth: 1,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "red" },
                { range: [1, 2], color: "white" },
                { range: [2, 3], color: "blue" }
            ],

            threshold: {
                line: { color: "red", width: 1.5 },
                thickness: 1,
                value: 1.5
            }

        },

        delta: { reference: 1, increasing: { color: "red" } },
        title: { text: "PPP", font: { size: 16 } },
        value: ppp_data.PPP,
        type: "indicator",
        mode: "gauge+number+delta",
    };

    var traces = [trace1];

    var layout = {
        title: "NBA PPP Gauge",
        coloraxis: { colorscale: 'Greens' }
    };

    Plotly.newPlot('gauge', traces, layout);
}