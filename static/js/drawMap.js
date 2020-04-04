function drawMap(data) {
    
        let plotData = [
        {
            type: "choropleth",
            locationmode: "USA-states",
            locations: data.map(e => e.abbr),
            z: data.map(e => e.yearly_barrels),
            text: data.map(e => e.state),
            zmin: 10000,
            zmax: 1500000,
            colorscale: [
            [0, "rgb(242,240,247)"],
            [0.2, "rgb(218,218,235)"],
            [0.4, "rgb(188,189,220)"],
            [0.6, "rgb(158,154,200)"],
            [0.8, "rgb(117,107,177)"],
            [1, "rgb(84,39,143)"]
            ],
            colorbar: {
            title: "Barrels per Year",
            thickness: 0.7
            },
            marker: {
            line: {
                color: "rgb(255,255,255)",
                width: 2
            }
            }
        },
        ];

        let layout = {
        title: "Barrels of Craft Beer Produced per Year",
        geo: {
            scope: "usa",
            showlakes: true,
            lakecolor: "rgb(255,255,255)"
        }
        };
        Plotly.newPlot("heatMap", plotData, layout, { showLink: false });
    }


// function init() {

//     d3.json(`/state_data`).then(data => {
//         console.log("Heat Map")
    
//         drawMap(data);
//         drawMap2(data)
//     })
// }

// init();

function drawMap2(data) {
    
    let plotData = [
    {
        type: "choropleth",
        locationmode: "USA-states",
        locations: data.map(e => e.abbr),
        z: data.map(e => e.breweries),
        text: data.map(e => e.state),
        zmin: 0,
        zmax: 800,
        colorscale: [
        [0, "rgb(242,240,247)"],
        [0.2, "rgb(218,218,235)"],
        [0.4, "rgb(188,189,220)"],
        [0.6, "rgb(158,154,200)"],
        [0.8, "rgb(117,107,177)"],
        [1, "rgb(84,39,143)"]
        ],
        colorbar: {
        title: "Barrels per Year",
        thickness: 0.7
        },
        marker: {
        line: {
            color: "rgb(255,255,255)",
            width: 2
        }
        }
    },
    ];
    
    let layout = {
    title: "Brewery Count by State",
    geo: {
        scope: "usa",
        showlakes: true,
        lakecolor: "rgb(255,255,255)"
    }
    };
    Plotly.newPlot("heatMap2", plotData, layout, { showLink: false });
}


function init() {

    d3.json(`/state_data`).then(data => {
        console.log("Heat Map")
    
        drawMap(data);
        drawMap2(data)
    })
}

init();