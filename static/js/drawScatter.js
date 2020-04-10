function drawScatter(data) {

  let plotData = [
    {}]
  // Define SVG attributes
  var width = parseInt(d3.select('#scatter')
    .style("width"))-200;
  var legendxpos = width;
  var height = width * 2 / 3;
  var margin = 10;
  var labelArea = 110;
  var padding = 45;

 

  // Create SVG object 
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");
    
    var svglegend = d3.select("#scatter")
  .append("svg")
  .attr("width", width + 200)
  .attr("height", height)
  .attr("class", "chartlegend");

  // Labels for axes=================================
  // Add first g - tag for x axis text (css class)
  svg.append("g").attr("class", "xText");
  var xText = d3.select(".xText");

  // Transform to adjust for xText
  var bottomTextX = (width - labelArea) / 2 + labelArea;
  var bottomTextY = height - margin - padding;
  xText.attr("transform", `translate(
                ${bottomTextX}, 
                ${bottomTextY})`
  );

  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function (d) {
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .7)
    // expect the one that is hovered
    // d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function (d) {
    d3.selectAll(".bubbles").style("opacity", 1)
  }


  // ---------------------------//
  //       LEGEND              //
  // ---------------------------//


  // x-axis (bottom) ______________________________
  // Build xText details (css class)
  xText.append("text")
    .attr("y", -19)
    .attr("data-name", "ABV_avg")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("ABV");

  xText.append("text")
    .attr("y", 0)
    .attr("data-name", "IBU_avg")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("IBU");

  xText.append("text")
    .attr("y", 19)
    .attr("data-name", "SRM_avg")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("SRM");

  // y-axis (left)___________________________________
  // Second g tag for yText (css class)
  svg.append("g").attr("class", "yText");
  var yText = d3.select(".yText");

  // Transform to adjust for yText
  var leftTextX = margin + padding;
  var leftTextY = (height + labelArea) / 2 - labelArea;
  yText.attr("transform", `translate(
                ${leftTextX}, 
                ${leftTextY}
                )rotate(-90)`
  );

  // Build yText details (css class)
  yText.append("text")
    .attr("y", -22)
    .attr("data-name", "ABV_avg")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("ABV");

  yText.append("text")
    .attr("y", 0)
    .attr("data-name", "IBU_avg")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("IBU");

  yText.append("text")
    .attr("y", 22)
    .attr("data-name", "SRM_avg")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("SRM");

    var currentX = "ABV_avg";
    var currentY = "SRM_avg"; 
    var xMin;
    var xMax;
    var yMin;
    var yMax;
// Find the data max & min values for scaling
function xMinMax() {
  xMin = d3.min(data, function (d) {
    return parseFloat(d[currentX]) * 0.7;
  });
  xMax = d3.max(data, function (d) {
    return parseFloat(d[currentX]) * 1.15;
  });
}

function yMinMax() {
  yMin = d3.min(data, function (d) {
    return parseFloat(d[currentY]) * 0.7;
  });
  yMax = d3.max(data, function (d) {
    return parseFloat(d[currentY]) * 1.15;
  });
}

// Scatter plot X & Y axis computation
xMinMax();
yMinMax();

  const xScale = d3.scaleLinear().domain([xMin,xMax]).range([margin+labelArea,width-margin]);
  const yScale = d3.scaleLinear().domain([yMin,yMax]).range([height-margin-labelArea,margin]);
  const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory10);

  const xAxis = d3.axisBottom(xScale)
   // .scale(xScale)
   // .tickPadding(15)
   // .tickSize(-innerHeight);

  const yAxis = d3.axisLeft(yScale)
   // .scale(yScale)
   // .ticks(5)
    //.tickPadding(15)
    //.tickSize(-innerWidth);


  const row = d => {
    d.petalLength = +d.petalLength;
    d.petalWidth = +d.petalWidth;
    d.sepalLength = +d.sepalLength;
    d.sepalWidth = +d.sepalWidth;
    return d;
  };
  // Visualize data  _______________________________________  
  // Define dynamic circle radius
  var cRadius;
  function adjustRadius() {
    if (width <= 530) {
      cRadius = 5;
    }
    else {
      cRadius = 7;
    }
  }
  adjustRadius();

  // Read in data as promise... and then... newer d3.js method
 // d3.csv("static/data/data.csv").then(function (data) {
    visualize(data);
 // });

  function visualize(csvData) {

    // Current X & Y default selections



    var z = d3.scaleSqrt()
      .domain([200000, 1310000000])
      .range([2, 30]);

    var myColor = d3.scaleOrdinal()
      .domain(["Bock", "Brown Ale", " Dark Ale", "Dark Lager", "Hybrid Beer", " India Pale Ale", "Pale Ale", " Pilsener & Pale Lager",
        "Porter", "Specialty Beer", "Stout", "Strong Ale", "Wheat Beer", "Wild / Sour Beer"])
        .range(["#FAD905","#F4D03F","#F6D88D","#FDC350","#F5A510","#E9BC01","#D57406","#C85F02","#9F3A08","#8D2603","#761701","#630802","#4A0707","#360808"]);
        
    // Add legend: circles
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    
    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Bock", "Brown Ale", " Dark Ale", "Dark Lager", "Hybrid Beer", " India Pale Ale", "Pale Ale", " Pilsener & Pale Lager",
      "Porter", "Specialty Beer", "Stout", "Strong Ale", "Wheat Beer", "Wild / Sour Beer"]

    svglegend.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
      .attr("cx", legendxpos)
      .attr("cy", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function (d) { return myColor(d) })
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

  // Add labels beside legend dots
  svglegend.selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
    .attr("x",legendxpos + 10 + size * .8)
    .attr("y", function (d, i) { return i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) { return myColor(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)


    // Tool Tip info box (state, X stats,  Y stats)
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([40, -60])
      .html(function (d) {
        //Build text box
        var Category = `<div>${d.Category}</div>`;
        var StyleLine = `<div>${d.Style}</div>`;
        var yLine = `<div>${currentY}: ${d[currentY]}%</div>`;
        if (currentX === "ABV_avg") {
          xLine = `<div>${currentX}: ${d[currentX]}%</div>`
        }
        else {
          xLine = `<div>${currentX}: ${parseFloat(d[currentX]).toLocaleString("en")}</div>`;
        }
        return Category + StyleLine + xLine + yLine
      });

    // Add toolTip to svg
    svg.call(toolTip);

    // Update upon axis option clicked
    function labelUpdate(axis, clickText) {
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
        .attr("cx", function(d){xScale(d[currentX])})
        .attr("cy", function(d){yScale(d[currentY])}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function (d) { return myColor(d) })
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
    }

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
      .attr("cx", function (d) {
        // xScale figures the pixels
        return xScale(d[currentX]);
      })
      .attr("cy", function (d) {
        return yScale(d[currentY]);
      })
      .attr("r", cRadius)
      .attr("class", "stateCircle")
      .style("fill", function (d) { return myColor(d.Category); })
      .on("mouseover", function (d) {
        // Show tooltip when mouse is on circle
        toolTip.show(d, this);
        // Highlight circle border
        d3.select(this).style("stroke", "#323232");
        d3.select(this).style("opacity", .6)
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
      .attr("dx", function (d) {
        return xScale(d[currentX]);
      })
      .attr("dy", function (d) {
        // Push text to center by a 1/3
        return yScale(d[currentY]) + cRadius / 3;
      })
      .text(function (d) {
        return d.abbr;
      })

      .on("mouseover", function (d) {
        toolTip.show(d);
        d3.select("." + d.abbr).style("stroke", "#323232");
      })

      .on("mouseout", function (d) {
        toolTip.hide(d);
        d3.select("." + d.abbr).style("stroke", "#e3e3e3");
      });

    // Dynamic graph on click
    d3.selectAll(".aText").on("click", function () {
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
          d3.selectAll(".stateCircle").each(function () {
            d3.select(this)
              .transition().duration(800)
              .attr("cx", function (d) {
                return xScale(d[currentX])
              });
          });

          d3.selectAll(".stateText").each(function () {
            d3.select(this)
              .transition().duration(800)
              .attr("dx", function (d) {
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
          d3.selectAll(".stateCircle").each(function () {
            d3.select(this)
              .transition().duration(800)
              .attr("cy", function (d) {
                return yScale(d[currentY])
              });
          });

          d3.selectAll(".stateText").each(function () {
            d3.select(this)
              .transition().duration(800)
              .attr("dy", function (d) {
                // Center text
                return yScale(d[currentY]) + cRadius / 3;
              });
          });

          // change the classes of to active and the clicked label
          labelUpdate(axis, self);
        }
      }
    });
  }

}
function init() {

  d3.json(`/category_data`).then(data => {
    console.log("Heat Map")

    drawScatter(data);
  })
}

init();