function drawMap1(data) {
    
    let plotData = [
    {
        type: "choropleth",
        locationmode: "USA-states",
        locations: data.map(e => e.abbr),
        z: data.map(e => e.breweries),
        text: data.map(e => e.state),
        zmin: 50,
        zmax: 600,
        colorscale: [
        [0, "rgb(242,240,247)"],
        [0.2, "rgb(218,218,235)"],
        [0.4, "rgb(188,189,220)"],
        [0.6, "rgb(158,154,200)"],
        [0.8, "rgb(117,107,177)"],
        [1, "rgb(84,39,143)"]
        ],
        colorbar: {
        title: "<b>Brewery Count</b>",
        thickness: 6
        },
        marker: {
        line: {
            color: "rgb(255,255,255)",
            width: 0.7
            }
            }
        },
        ];
    
        let layout = {
        title: "<b>State Breweries</b>",
        geo: {
            scope: "usa",
            showlakes: true,
            lakecolor: "rgb(255,255,255)"
        }
        };
        Plotly.newPlot("heatMap", plotData, layout, { showLink: false });
    }

function drawMap2(data) {
    
        let plotData = [
        {
            type: "choropleth",
            locationmode: "USA-states",
            locations: data.map(e => e.abbr),
            z: data.map(e => parseInt(e.yearly_barrels)),
            text: data.map(e => e.state),
            zmin: 30000,
            zmax: 2500000,
            colorscale: [
            [0, "rgb(242,240,247)"],
            [0.2, "rgb(218,218,235)"],
            [0.4, "rgb(188,189,220)"],
            [0.6, "rgb(158,154,200)"],
            [0.8, "rgb(117,107,177)"],
            [1, "rgb(84,39,143)"]
            ],
            colorbar: {
            title: "<b>Barrels per Year</b>",
            thickness: 6
            },
            marker: {
            line: {
                color: "rgb(255,255,255)",
                width: 0.7
            }
            }
        },
        ];

        let layout = {
        title: "<b>Beer Barrels Produced</b>",
        geo: {
            scope: "usa",
            showlakes: true,
            lakecolor: "rgb(255,255,255)"
        }
        };
        Plotly.newPlot("heatMap", plotData, layout, { showLink: false });
    }

function drawMap3(data) {

    let plotData = [
    {
        type: "choropleth",
        locationmode: "USA-states",
        locations: data.map(e => e.abbr),
        z: data.map(e => parseFloat(e.breweries_per_capita)),
        text: data.map(e => e.state),
        zmin: 3,
        zmax: 13.5,
        colorscale: [
        [0, "rgb(242,240,247)"],
        [0.2, "rgb(218,218,235)"],
        [0.4, "rgb(188,189,220)"],
        [0.6, "rgb(158,154,200)"],
        [0.8, "rgb(117,107,177)"],
        [1, "rgb(84,39,143)"]
        ],
        colorbar: {
        title: "<b>Breweries/Capita</b>",
        thickness: 6
        },
        marker: {
        line: {
            color: "rgb(255,255,255)",
            width: 0.7
        }
        }
    },
    ];

    let layout = {
    title: "<b>Breweries per Capita</b>",
    geo: {
        scope: "usa",
        showlakes: true,
        lakecolor: "rgb(255,255,255)"
    }
    };
    Plotly.newPlot("heatMap", plotData, layout, { showLink: false});
}

const button_1 = d3.select("#map1-btn");
const button_2 = d3.select("#map2-btn");
const button_3 = d3.select("#map3-btn");

function init_1() {

    d3.json(`/state_data`).then(data => {
        console.log("Heat Map")
        drawMap1(data);
    })
}

function init_2() {

    d3.json(`/state_data`).then(data => {
        console.log("Heat Map")
        drawMap2(data);
    })
}

function init_3() {

    d3.json(`/state_data`).then(data => {
        console.log("Heat Map")
        drawMap3(data);
    })
}

init_1();

button_1.on("click", init_1);
button_2.on("click", init_2);
button_3.on("click", init_3);
