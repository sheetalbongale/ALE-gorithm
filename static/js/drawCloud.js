function drawCloud() {

    
    anychart.onDocumentReady(function() {
      anychart.data.loadJsonFile(`${category}`, function(beerstyle_data) {
        var data =[]
        beerstyle_data.forEach(d =>{
          var datadict={};
          datadict['x'] = d.beer_style;
          datadict['value'] = d.count;
          datadict['category'] = d.category;
          data.push(datadict);
        });
  
  
        var dataSet = anychart.data.set(data);
        var colors = anychart.scales.ordinalColor().colors(['#26959f', '#f18126','#e6e600', '#3b8ad8',
          '#e24b26', '#cc33ff', '#60727b','#999966' ]);
  
        var chart = anychart.tagCloud();
  
        chart.title('Beer Style ${category}`')
          .data(dataSet)
          .colorScale(colors)
          .angles([-90, 0, 90])
          .fontFamily('Barlow Condensed , sans-serif')
          .tooltip().format("Beer Style Count:\n{%value}\nBeer Category:\n{%category}")
  
          // .fontSize(30);
  
        var title = chart.title();
        title.text(`Popular Beer Styles`);
        title.fontSize(40);
        title.fontFamily("Barlow Condensed , sans-serif");
  
  
        var colorRange = chart.colorRange();
        colorRange
          .enabled(true)
          .colorLineSize(15)
          .length(1000);
  
        chart.container('cloud');
        chart.draw();
  
        var normalFillFunction = chart.normal().fill();
        var hoveredFillFunction = chart.hovered().fill();
  
        chart.listen('pointsHover', function(e) {
          if (e.actualTarget === colorRange) {
            if (e.points.length) {
              chart.normal({
                fill: 'black 0.1'
              });
              chart.hovered({
                fill: chart.colorScale().valueToColor(e.point.get('category'))
              });
            } else {
              chart.normal({
                fill: normalFillFunction
              });
              chart.hovered({
                fill: hoveredFillFunction
              });
            }
          }
        });
      });
    });
  }