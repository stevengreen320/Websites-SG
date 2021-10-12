$(document).ready(function() {

    // d3 CSV
    let url = "teams_city.csv";
    d3.csv(url).then(function(data) {
        console.log(data);

        data.forEach(function(row) {
            row.HOME_TEAM_WINS = +row.HOME_TEAM_WINS;
            row.PTS = +row.PTS;
        });


        var traces = [{
            "x": data.map(x => x.NICKNAME),
            "y": data.map(x => x.PTS),
            "type": 'bar'
        }];

        var layout = {
            "title": `Team Points 2018`,
            yaxis: {
                title: {
                    text: "Points"
                }
            }
        }

        Plotly.newPlot('bar', traces, layout);

        var traces2 = [{
            "x": data.map(x => x.CITY),
            "y": data.map(x => x.HOME_TEAM_WINS),
            "type": 'bar'
        }];

        var layout2 = {
            "title": `City Wins 2018`,
            yaxis: {
                title: {
                    text: "Wins"
                }
            }
        }

        Plotly.newPlot('bar2', traces2, layout2);

    });
});
$(document).ready(function() {

    // d3 CSV
    let url = "teams_city.csv";
    d3.csv(url).then(function(data) {
        console.log(data);

        data.forEach(function(row) {
            row.HOME_TEAM_WINS = +row.HOME_TEAM_WINS;
            row.PTS = +row.PTS;
        });


        var traces = [{
            "x": data.map(x => x.NICKNAME),
            "y": data.map(x => x.PTS),
            "type": 'bar'
        }];

        var layout = {
            "title": `Team Points 2018`,
            yaxis: {
                title: {
                    text: "Points"
                }
            }
        }

        Plotly.newPlot('bar', traces, layout);

        var traces2 = [{
            "x": data.map(x => x.CITY),
            "y": data.map(x => x.HOME_TEAM_WINS),
            "type": 'bar'
        }];

        var layout2 = {
            "title": `City Wins 2018`,
            yaxis: {
                title: {
                    text: "Wins"
                }
            }
        }

        Plotly.newPlot('bar2', traces2, layout2);

    });
});

function updateChartType() {
    // here we destroy/delete the old or previous chart and redraw it again
    myChart.destroy();
    myChart = new Chart(ctx, {
        type: document.getElementById("chartType").value,
        data: myData,
    });
};