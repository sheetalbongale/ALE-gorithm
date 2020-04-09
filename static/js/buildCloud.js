function drawCloud() {
    
    anychart.onDocumentReady(function() {
      anychart.data.loadJsonFile(`/category`, function(beerstyle_data) {
        var data =[]
        beerstyle_data.forEach(d =>{
          var datadict={};
          datadict['x'] = d.beer_style;
          datadict['value'] = d.count;
          datadict['category'] = d.category;
          data.push(datadict);
        });
  
  
        var dataSet = anychart.data.set(data);

        var colors = anychart.scales.ordinalColor().colors(['#000000','#FFA500','#808000', '#8B4513','#DAA520', '#4B0082','#FFD700', '#483D8B', '#f18126', '#3b8ad8', '#60727b', '#2E8B57', '#26959f', '#8B0000', ]);

        // create tag cloud
        var chart = anychart.tagCloud();

        // set chart title
        chart.title('Popular Beer Styles in demand')
                // set data with settings
                .data(dataSet)
                // set color scale
                .colorScale(colors)
                // font for the chart
                .fontFamily("Barlow Condensed , sans-serif")
                // set array of angles, by which words will be placed
                .angles([0, 0, 0]);

        // get the color range
        var colorRange = chart.colorRange();
        // enabled color range
        colorRange
                .enabled(true)
                // sets color line size
                .colorLineSize(15)
                .length(1500);

        // set container id for the chart
        chart.container('cloud');
        // initiate chart drawing
        chart.draw();


        // save normal fill function to variable
        var normalFillFunction = chart.normal().fill();
        // save hover fill function to variable
        var hoveredFillFunction = chart.hovered().fill();

        // create custom interactivity to hover colorRange
        chart.listen('pointsHover', function (e) {
            if (e.actualTarget === colorRange) {
                // if points exist
                if (e.points.length) {
                    // set settings for normal state
                    chart.normal({
                        fill: 'black 0.1'
                    });
                    // set settings for hovered state
                    chart.hovered({
                        // get fill color ratio by its number and set fill to hovered state
                        fill: chart.colorScale().valueToColor(e.point.get('category'))
                    });
                } else {
                    // set function for normal state
                    chart.normal({
                        fill: normalFillFunction
                    });
                    // set function for hovered state
                    chart.hovered({
                        fill: hoveredFillFunction
                    });
                }
            }
        });
    });
});
}


function init(){

    d3.select('#cloud').html(""),
    drawCloud();
}


init();
