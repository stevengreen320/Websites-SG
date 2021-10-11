$(document).ready(function() {
    // initializes the plot using the pre-selected value
    let column = $("#metric_filter").val();
    getPlotForColumn(column);

    // EVENT LISTENERS
    $("#metric_filter").on("change", function() {
        //alert("SELECT CHANGED!!!!");
        column = $("#metric_filter").val();
        getPlotForColumn(column);
    });
});

function getPlotForColumn(column) {
    let teams = ['Warriors','Raptors',
        'Bucks',
        'Trail Blazers',
        '76ers',
        'Nuggets',
        'Rockets',
        'Celtics',
        'Clippers',
        'Thunder',
        'Spurs',
        'Nets',
        'Jazz',
        'Pelicans',
        'Kings',
        'Wizards',
        'Hawks',
        'Magic',
        'Pacers',
        'Timberwolves',
        'Pistons',
        'Lakers',
        'Hornets',
        'Mavericks',
        'Suns',
        'Heat',
        'Bulls',
        'Knicks',
        'Cavaliers',
        'Grizzlies'
        ];
    let teams_averages = [];

    // console.log("Yay this code works");

    // loop through ratings
    for (let i = 0; i < teams.length; i++) {
        let NICKNAME = teams[i];
        let avg = getAverageForRatingMetric(NICKNAME, column);
        teams_averages.push(avg);
    }

    console.log(teams);
    console.log(teams_averages);

    // Make Plot
    var data = [{
        "x": teams,
        "y": teams_averages,
        "type": 'bar',
        marker: {
            color: "firebrick"
        }
    }];

    var layout = {
        "title": `Team Bar Chart for number of ${column.toUpperCase()}`,
        yaxis: {
            title: {
                text: column
            }
        }
    }

    Plotly.newPlot('plot', data, layout);
}

function getAverageForRatingMetric(NICKNAME, column) {
    let found_metrics = [];

    for (let i = 0; i < teams.length; i++) {
        let point = teams[i];
        // console.log(movie);

        // check the rating
        if (point.NICKNAME === NICKNAME) {
            let metric = point[column];
            found_metrics.push(metric);
        }
    }

    // console.log(found_metrics);

    // get average
    let sum = found_metrics.reduce((a, b) => a + b); // .sum() function
    let avg = sum / found_metrics.length;

    // console.log(avg);

    return (avg);
}