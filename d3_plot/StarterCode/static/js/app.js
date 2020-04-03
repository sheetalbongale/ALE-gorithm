// Define SVG attributes
var width = parseInt(d3.select('#scatter')
    .style("width"));

var height = width * 2/3;
var margin = 10;
var labelArea = 110;
var padding = 45;

// Create SVG object 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

// Labels for axes=================================
// Add first g - tag for x axis text (css class)
svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

// Transform to adjust for xText
var bottomTextX =  (width - labelArea)/2 + labelArea;
var bottomTextY = height - margin - padding;
xText.attr("transform",`translate(
    ${bottomTextX}, 
    ${bottomTextY})`
    );
    
  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    // d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }


    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

   
// x-axis (bottom) ______________________________
// Build xText details (css class)
xText.append("text")
    .attr("y", -19)
    .attr("data-name", "ABV (avg)")
    .attr("data-axis", "x")
    .attr("class","aText active x")
    .text("ABV");

xText.append("text")
    .attr("y", 0)
    .attr("data-name", "IBU (avg)")
    .attr("data-axis", "x")
    .attr("class","aText inactive x")
    .text("IBU");

xText.append("text")
    .attr("y", 19)
    .attr("data-name", "SRM (avg)")
    .attr("data-axis", "x")
    .attr("class","aText inactive x")
    .text("SRM");

// y-axis (left)___________________________________
// Second g tag for yText (css class)
svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

// Transform to adjust for yText
var leftTextX =  margin + padding;
var leftTextY = (height + labelArea) / 2 - labelArea;
yText.attr("transform",`translate(
    ${leftTextX}, 
     ${leftTextY}
    )rotate(-90)`
    );

// Build yText details (css class)
yText .append("text")
    .attr("y", -22)
    .attr("data-name", "ABV (avg)")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("ABV");

yText .append("text")
    .attr("y", 0)
    .attr("data-name", "IBU (avg)")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("IBU");

yText .append("text")
    .attr("y", 22)
    .attr("data-name", "SRM (avg)")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("SRM");


const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(15)
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5)
  .tickPadding(15)
  .tickSize(-innerWidth);


const row = d => {
  d.petalLength = +d.petalLength;
  d.petalWidth = +d.petalWidth;
  d.sepalLength = +d.sepalLength;
  d.sepalWidth = +d.sepalWidth;
  return d;
};

d3.csv('iris.csv', row, data => {
  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  yScale
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cx', d => xScale(xValue(d)))
      .attr('cy', d => yScale(yValue(d)))
      .attr('fill', d => colorScale(colorValue(d)))
      .attr('fill-opacity', 0.6)
      .attr('r', 8);

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);
  colorLegendG.call(colorLegend)
    .selectAll('.cell text')
      .attr('dy', '0.1em');
});

// Visualize data  _______________________________________  
// Define dynamic circle radius
var cRadius;
function adjustRadius() {
  if (width <= 530) {
    cRadius = 10;}
  else { 
    cRadius = 15;}
}
adjustRadius();

// Read in data as promise... and then... newer d3.js method
d3.csv("static/data/data.csv").then(function(data) {
    visualize(data);
});

function visualize (csvData) {
   var xMin;
   var xMax;
   var yMin;
   var yMax;

   // Current X & Y default selections
   var currentX = "ABV (avg)";
   var currentY = "SRM (avg)";


   var z = d3.scaleSqrt()
   .domain([200000, 1310000000])
   .range([ 2, 30]);

   var myColor = d3.scaleOrdinal()
    .domain(["Bock","Brown Ale"," Dark Ale","Dark Lager","Hybrid Beer"," India Pale Ale","Pale Ale"," Pilsener & Pale Lager",
      "Porter","Specialty Beer","Stout","Strong Ale","Wheat Beer","Wild / Sour Beer"])
    .range(d3.schemeSet1);


 // Add legend: circles
 var valuesToShow = [10000000, 100000000, 1000000000]
 var xCircle = 890
 var xLabel = 940
//  svg
//    .selectAll("legend")
//    .data(valuesToShow)
//    .enter()
//    .append("circle")
//      .attr("cx", xCircle)
//      .attr("cy", function(d){ return height - 100 - z(d) } )
//      .attr("r", function(d){ return z(d) })
//      .style("fill", "none")
//      .attr("stroke", "black")

//  // Add legend: segments
//  svg
//    .selectAll("legend")
//    .data(valuesToShow)
//    .enter()
//    .append("line")
//      .attr('x1', function(d){ return xCircle + z(d) } )
//      .attr('x2', xLabel)
//      .attr('y1', function(d){ return height - 100 - z(d) } )
//      .attr('y2', function(d){ return height - 100 - z(d) } )
//      .attr('stroke', 'black')
//      .style('stroke-dasharray', ('2,2'))

 // Add legend: labels
 svg
   .selectAll("legend")
   .data(valuesToShow)
   .enter()
   .append("text")
     .attr('x', xLabel)
     .attr('y', function(d){ return height - 100 - z(d) } )
     .text( function(d){ return d/1000000 } )
     .style("font-size", 10)
     .attr('alignment-baseline', 'middle')

 // Legend title
 svg.append("text")
   .attr('x', xCircle)
   .attr("y", height - 100 +30)
   .text("Category")
   .attr("text-anchor", "middle")

 // Add one dot in the legend for each name.
 var size = 20
 var allgroups = ["Bock","Brown Ale"," Dark Ale","Dark Lager","Hybrid Beer"," India Pale Ale","Pale Ale"," Pilsener & Pale Lager",
 "Porter","Specialty Beer","Stout","Strong Ale","Wheat Beer","Wild / Sour Beer"]
 svg.selectAll("myrect")
   .data(allgroups)
   .enter()
   .append("circle")
     .attr("cx", 690)
     .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
     .attr("r", 7)
     .style("fill", function(d){ return myColor(d)})
     .on("mouseover", highlight)
     .on("mouseleave", noHighlight)

 // Add labels beside legend dots
 svg.selectAll("mylabels")
   .data(allgroups)
   .enter()
   .append("text")
     .attr("x", 690 + size*.8)
     .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
     .style("fill", function(d){ return myColor(d)})
     .text(function(d){ return d})
     .attr("text-anchor", "left")
     .style("alignment-baseline", "middle")
     .on("mouseover", highlight)
     .on("mouseleave", noHighlight)


   // Tool Tip info box (state, X stats,  Y stats)
   var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([40, -60])
      .html(function(d) {
            //Build text box
            var Category = `<div>${d.Category}</div>`;
            var StyleLine = `<div>${d.Style}</div>`;
            var yLine = `<div>${currentY}: ${d[currentY]}%</div>`;
            if (currentX === "ABV (avg)") {
                xLine = `<div>${currentX}: ${d[currentX]}%</div>`}          
            else {
                xLine = `<div>${currentX}: ${parseFloat(d[currentX]).toLocaleString("en")}</div>`;}             
            return Category + StyleLine + xLine + yLine  
        });

    // Add toolTip to svg
    svg.call(toolTip);

    // Update upon axis option clicked
    function  labelUpdate(axis, clickText) {
        // Switch active to inactive
        d3.selectAll(".aText")
            .filter("." + axis)
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);
    
        // switch the text just clicked to active
        clickText.classed("inactive", false).classed("active", true);

        svg.selectAll("myrect")
   .data(allgroups)
   .enter()
   .append("circle")
     .attr("cx", 690)
     .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
     .attr("r", 7)
     .style("fill", function(d){ return myColor(d)})
     .on("mouseover", highlight)
     .on("mouseleave", noHighlight)
        }

    // Find the data max & min values for scaling
    function xMinMax() {
      xMin = d3.min(csvData, function(d) {
        return parseFloat(d[currentX]) * 0.85;
      });
      xMax = d3.max(csvData, function(d) {
        return parseFloat(d[currentX]) * 1.15;
      });     
    }

    function yMinMax() {
      yMin = d3.min(csvData, function(d) {
        return parseFloat(d[currentY]) * 0.85;
      });
      yMax = d3.max(csvData, function(d) {
        return parseFloat(d[currentY]) * 1.15;
      }); 
    }

    // Scatter plot X & Y axis computation
    xMinMax();
    yMinMax();

    var xScale = d3 
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin])

    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin])

    // Create scaled X and Y axis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Calculate X and Y tick counts
    function tickCount() {
      if (width <= 530) {
         xAxis.ticks(5);
         yAxis.ticks(5);
      }
      else {
          xAxis.ticks(10);
          yAxis.ticks(10);
      }        
    }
    tickCount();

    // append axis to the svg as group elements
    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate(
            0, 
            ${height - margin - labelArea})`
        );

    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", `translate(
            ${margin + labelArea}, 
            0 )`
        );

    // Append the circles for each row of data
    var allCircles = svg.selectAll("g allCircles").data(csvData).enter();

    allCircles.append("circle")
        .attr("cx", function(d) {
            // xScale figures the pixels
            return xScale(d[currentX]);
        })
        .attr("cy", function(d) {
            return yScale(d[currentY]);
        })
        .attr("r", cRadius)
        .attr("class", "stateCircle")
        .style("fill", function (d) { return myColor(d.Category); } )
        .on("mouseover", function(d) {
            // Show tooltip when mouse is on circle
            toolTip.show(d, this);
            // Highlight circle border
            d3.select(this).style("stroke", "#323232");
            d3.select(this).style("opacity", .8)
        })
        .on("mouseout", function (d) {
            // Remove the tooltip
            toolTip.hide(d);
            // Remove the highlight
            d3.select(this).style("stroke", "#e3e3e3")
            d3.select(this).style("opacity", 1)
        });

        // Apply state text on circles (dx & dy are locations)
        allCircles
            .append("text")
            .attr("font-size", cRadius)
            .attr("class", "stateText")
            .attr("dx", function(d) {
               return xScale(d[currentX]);
            })
            .attr("dy", function(d) {
              // Push text to center by a 1/3
              return yScale(d[currentY]) + cRadius /3;
            })
            .text(function(d) {
                return d.abbr;
              })

            .on("mouseover", function(d) {
                toolTip.show(d);
                d3.select("." + d.abbr).style("stroke", "#323232");
            })

            .on("mouseout", function(d) {
                toolTip.hide(d);
                d3.select("." + d.abbr).style("stroke", "#e3e3e3");
            });

          // Dynamic graph on click
          d3.selectAll(".aText").on("click", function() {
              var self = d3.select(this)

              // Select inactive
              if (self.classed("inactive")) {
                // Obtain name and axis saved in the label
                var axis = self.attr("data-axis")
                var name = self.attr("data-name")

                if (axis === "x") {
                  currentX = name;

                  // Update min and max of domain (x)
                  xMinMax();
                  xScale.domain([xMin, xMax]);

                  svg.select(".xAxis")
                        .transition().duration(800)
                        .call(xAxis);
                  
                  // Update location of the circles
                  d3.selectAll("circle").each(function() {
                    d3.select(this)
                        .transition().duration(800)
                        .attr("cx", function(d) {
                            return xScale(d[currentX])                
                        });
                  });   

                  d3.selectAll(".stateText").each(function() {
                    d3.select(this)
                        .transition().duration(800)
                        .attr("dx", function(d) {
                            return xScale(d[currentX])                          
                        });
                  });          
                  // Update
                  labelUpdate(axis, self);
                }

                 // Update for Y axis selection 
                else {
                  currentY = name;

                  // Update min and max of range (y)
                  yMinMax();
                  yScale.domain([yMin, yMax]);

                  svg.select(".yAxis")
                        .transition().duration(800)
                        .call(yAxis);

                  // Update location of the circles
                  d3.selectAll("circle").each(function() {
                    d3.select(this)
                        .transition().duration(800)
                        .attr("cy", function(d) {
                            return yScale(d[currentY])                
                        });                       
                  });   

                  d3.selectAll(".stateText").each(function() {
                      d3.select(this)
                        .transition().duration(800)
                        .attr("dy", function(d) {
                           // Center text
                            return yScale(d[currentY]) + cRadius/3;                          
                        });
                  });

                  // change the classes of to active and the clicked label
                  labelUpdate(axis, self);
                }
              }
          });
}