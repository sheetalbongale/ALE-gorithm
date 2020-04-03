// build Charts
function drawGaugeABV(beerstyle) {

        d3.json(`/beerstyle/${beerstyle}`).then(data => data.forEach(e =>{

            let degree = parseFloat(e.ABV_avg) * (180/11);
    
            let level = degree;
    
            // Trig to calc meter point
            let degrees = 180 - level,
            radius = .5;
            let radians = degrees * Math.PI / 180;
            let x = radius * Math.cos(radians);
            let y = radius * Math.sin(radians);
    
            // Path: may have to change to create a better triangle
            let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
            let path = mainPath.concat(pathX,space,pathY,pathEnd);
    
            let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'ABV %',
            text: e.ABV_avg,
            hoverinfo: 'text+name'},
            { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
            rotation: 90,
            text: [ '\u{1F929}', '\u{1F603}', '\u{1F642}','\u{1F610}','\u{1F641}',''],
            textinfo: 'text',
            textposition:'inside',
            textfont:{
            size : 30,
            },
            marker: {colors:['rgb(227, 153, 7)','rgb(224, 164, 45)',
            'rgb(227, 179, 84)', 'rgb(227, 202, 152)', 
            'rgb(232, 222, 202)','rgba(255, 255, 255, 0)'
        ]},
            hoverinfo: 'text',
            hole: .5,
            type: 'pie',
            showlegend: false
            }];
    
            let layout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                color: '850000'
                }
            }],
    
            title: `<b> ABV % for </b> <br>${e.Style}<br>`,
            height: 550,
            width: 550,
            xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
            plot_bgcolor: 'rgba(0, 0, 0, 0)',
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
            };
    
            Plotly.newPlot('gauge_abv', trace, layout, {responsive: true});
    
        }));
}

function drawGaugeIBU(beerstyle) {
    d3.json(`/beerstyle/${beerstyle}`).then(data => data.forEach(e =>{
        let degree = parseFloat(e.IBU_avg) * (180/11);

        let level = degree;

        // Trig to calc meter point
        let degrees = 180 - level,
            radius = .5;
        let radians = degrees * Math.PI / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'IBU %',
            text: e.IBU_avg,
            hoverinfo: 'text+name'},
        { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
        rotation: 90,
        text: [ '\u{1F929}', '\u{1F603}', '\u{1F642}','\u{1F610}','\u{1F641}',''],
        textinfo: 'text',
        textposition:'inside',
        textfont:{
            size : 30,
            },
        marker: {colors:['rgb(77, 77, 0)','rgb(153, 153, 0)',
        'rgb(204, 204, 0)', 'rgb(255, 255, 51)', 
            'rgb(255, 255, 128)','rgba(255, 255, 255, 0)'
                        ]},
        hoverinfo: 'text',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],

        title: `<b> IBU % for </b> <br>${e.Style}<br>`,
        height: 550,
        width: 550,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        };

        Plotly.newPlot('gauge_ibu', trace, layout, {responsive: true});
    }));
}
    

function drawGaugeSRM(beerstyle) {
    d3.json(`/beerstyle/${beerstyle}`).then(data => data.forEach(e =>{

        let degree = parseFloat(e.SRM_avg) * (180/11);

        let level = degree;

        // Trig to calc meter point
        let degrees = 180 - level,
            radius = .5;
        let radians = degrees * Math.PI / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'SRM %',
            text: e.SRM_avg,
            hoverinfo: 'text+name'},
        { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
        rotation: 90,
        text: ['Black', 'Dark Brown','Brown','Amber','Pale','Very Light'],
        textinfo: 'text',
        textposition:'inside',
        textfont:{
            size : 10,
            },
        marker: {colors:['rgb(115, 77, 1)', 'rgb(166, 114, 10)', 'rgb(224, 193, 56)', 'rgb(255, 229, 117)', 'rgb(255, 243, 191)','rgba(255, 255, 255, 0)'
                        ]},
        labels: ['Black', 'Dark Brown','Brown','Amber','Pale','Very Light'],
        hoverinfo: data.SRM_avg,
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: 'rgba(44, 160, 101, 0.5)',
            line: {
                color: '850000'
            }
            }],

        title: `<b> SRM % for </b> <br>${e.Style}<br>`,
        height: 550,
        width: 550,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        };

        Plotly.newPlot('gauge_srm', trace, layout, {responsive: true});

    }));
}



function buildCharts(beerstyle){
    
    d3.json(`/beerstyle/${beerstyle}`).then(data => data.forEach(e => {
        console.log(data)
        let cardBody = d3.select("#description")
            .append("div")
            .classed("card", true)
            .append("div")
            .classed("card-body", true)
        cardBody.append("h2")
            .classed("card-title", true)
            .text(e.Style)
        cardBody.append("p")
            .classed("card-text", true)
            .text(e.Description);
    }))


    };


//-----------------FUNCTION INITIATOR-----------------//
function init() {

    var selectorOne = d3.select("#selDatasetOne");
        d3.json("/category_names").then((dropdown1Names) => {
            dropdown1Names.forEach((category) => {
            selectorOne
            .append("option")
            .text(category.Category)
            .property("value", category.Category);
        });
        })

        var selectorTwo = d3.select('#selDatasetTwo');
        d3.json("/beerstyle_names").then((dropdown2Names) =>{
        dropdown2Names.forEach((beerstyle) =>{
            selectorTwo
            .append("option")
            .text(beerstyle.Style)
            .property("value", beerstyle.Style);
        });
        })

        drawGaugeABV();
        drawGaugeIBU();
        drawGaugeSRM();
        buildCharts();

    
}

// create event listeners:
function optionChangedOne(newCategory) {
    category = newCategory;
}

function optionChangedTwo(newBeerstyle) {
    beerstyle = newBeerstyle;
    console.log(beerstyle);
    buildCharts(beerstyle);
    drawGaugeABV(beerstyle);
    drawGaugeIBU(beerstyle);
    drawGaugeSRM(beerstyle);
                        
}

// call init function  
init();
