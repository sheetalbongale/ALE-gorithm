// build Gauge Charts
function drawGaugeABV(beerstyle) {

        d3.json(`/beerstyle/${beerstyle}`).then(data => data.forEach(e =>{

            let degree = parseFloat(e.ABV_avg) * 180/14;
    
            let level = degree;
    
            // Trig to calc meter point
            let degrees = 180 - level,
            radius = .5;
            let radians = degrees * Math.PI / 180;
            let x = radius * Math.cos(radians);
            let y = radius * Math.sin(radians);
    
           
            let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
            let path = mainPath.concat(pathX,space,pathY,pathEnd);
    
            let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'190707'},
            showlegend: false,
            name: 'ABV',
            text: e.ABV_avg,
            hoverinfo: 'text+name'},
            { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
            rotation: 90,
            text: ['\u{1F974}','\u{1F92A}','\u{1F923}','\u{1F606}','\u{1F609}',''],
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
                fillcolor: '190707',
                line: {
                color: '190707'
                }
            }],
    
            title: `<b> ABV for </b> <br>${e.Style}<br>`,
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
        let degree = parseFloat(e.IBU_avg) * 180/84;

        let level = degree;

        // Trig to calc meter point
        let degrees = 180 - level,
            radius = .5;
        let radians = degrees * Math.PI / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

        
        let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'190707'},
            showlegend: false,
            name: 'IBU',
            text: e.IBU_avg,
            hoverinfo: 'text+name'},
        { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
        rotation: 90,
        text: [ 'Most Bitter(75-85)', '60-75', '45-60','30-45','15-30', 'Least Bitter(0-15)', ''],
        textinfo: 'text',
        textposition:'inside',
        textfont:{
            size : 10,
            },
        marker: {colors:['rgb(54, 46, 14)','rgb(115, 77, 1)', 'rgb(166, 114, 10)', 'rgb(224, 193, 56)', 'rgb(255, 229, 117)', 'rgb(255, 243, 191)','rgba(255, 255, 255, 0)'
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
            fillcolor: '190707',
            line: {
                color: '190707'
            }
            }],

        title: `<b> IBU for </b> <br>${e.Style}<br>`,
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

        let degree = parseFloat(e.SRM_avg) * 180/36;

        let level = degree;

        // Trig to calc meter point
        let degrees = 180 - level,
            radius = .5;
        let radians = degrees * Math.PI / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

       
        let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let trace = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'190707'},
            showlegend: false,
            name: 'SRM',
            text: e.SRM_avg,
            hoverinfo: 'text+name'},
        {   
            values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
            rotation: 90,
            text: ['Black', 'Dark Brown','Brown','Amber','Pale','Very Light', ''],
            textinfo: 'text',
            textposition:'inside',
            textfont:{
                size : 10,
            },
        marker: {colors:['rgb(54, 46, 14)','rgb(115, 77, 1)', 'rgb(166, 114, 10)', 'rgb(224, 193, 56)', 'rgb(255, 229, 117)', 'rgb(255, 243, 191)','rgba(255, 255, 255, 0)'
                        ]},
        labels: ['Black', 'Dark Brown','Brown','Amber','Pale','Very Light', ''],
        hoverinfo: e.SRM_avg,
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '190707',
            line: {
                color: '190707'
            }
            }],

        title: `<b> SRM for </b> <br>${e.Style}<br>`,
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


// Function to create the description section for beerstyle
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
            .text(e.Description)
        cardBody.append("h4")
            .classed("glassware", true)
            .text(`Glassware: ${e.Glassware}`)
        cardBody.append("p")
            .classed("abv_values", true)
            .text(`ABV Minimum: ${e.ABV_min} | ABV Maximum: ${e.ABV_max}`)
        cardBody.append("p")
            .classed("ibu_values", true)
            .text(`IBU Minimum: ${e.IBU_min} | IBU Maximum: ${e.IBU_max}`)
        cardBody.append("p")
            .classed("srm_values", true)
            .text(`SRM Minimum: ${e.SRM_min} | SRM Maximum: ${e.SRM_max}`)

        }))


    };

    // Function to create the description section for beerstyle
    function buildImage(beerstyle){
        
        d3.json(`/beerstyles_links/${beerstyle}`).then(data => data.forEach(e => {
            console.log(data)
            let cardBody = d3.select("#beerimage")
            .append("div")
                .classed("card", true)
                .append("div")
            cardBody.append("img")
                .attr("src", e.image_link)
                .classed("card-img-top beerimage zoom",true)
            }))


        };
    
            


    // Function to display top 5 beers
    function buildRecommender(beerstyle){
    
        d3.json(`/recommender/${beerstyle}`).then(data => data.forEach(e => {
            console.log(data)
            let cardBody = d3.select("#top5")
                .append("div")
                .classed("card", true)
                .append("div")
                .classed("card-body", true)
            cardBody.append("h4")
                .classed("card-title", true)
                .text(e.beer_name)
            cardBody.append("h6")
                .classed("card-subtitle mb-2 text-muted", true)
                .text(`Brewery: ${e.brewery_name}`)
            cardBody.append("p")
                .classed("city", true)
                .text(`City: ${e.city}`)
            cardBody.append("p")
                .classed("state", true)
                .text(`State: ${e.state}`)
            cardBody.append("p")
                .classed("country", true)
                .text(`Country: ${e.country}`)
            cardBody.append("p")
                .classed("abv", true)
                .text(`ABV: ${e.abv}`);
            cardBody.append("p")
                .classed("availability", true)
                .text(`Availability: ${e.availability}`);
            }))
        };
    

//-----------------FUNCTION INITIATOR-----------------//
function init() {

        const firstStyle = dropdown2Names[1];

        drawGaugeABV(firstStyle);
        drawGaugeIBU(firstStyle);
        drawGaugeSRM(firstStyle);
        buildCharts(firstStyle);
        buildRecommender(firstStyle);
        buildImage(firstStyle);
    
}

//--------create event listeners--------//
function optionChangedOne(newCategory) {
    category = newCategory;
    d3.select('#selDatasetTwo').html("");
    var selectorTwo = d3.select('#selDatasetTwo');
    d3.json(`/beerstyle_filtered/${category}`).then((dropdown2Names) =>{
    dropdown2Names.forEach((beerstyle) =>{
        selectorTwo
        .append("option")
        .text(beerstyle.Style)
        .property("value", beerstyle.Style);
    });
    })
}

function optionChangedTwo(newBeerstyle) {
    beerstyle = newBeerstyle;
    console.log(beerstyle);
    d3.select('#description').html(""),
    buildCharts(beerstyle);
    d3.select('#beerimage').html(""),
    buildImage(beerstyle);
    d3.select('#top5').html(""),
    buildRecommender(beerstyle);

    drawGaugeABV(beerstyle);
    drawGaugeIBU(beerstyle);
    drawGaugeSRM(beerstyle);


                        
}

// call init function  
init();
