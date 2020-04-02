// build gaugeChart
function buildPanel() {
	d3.json(`/gaugechart/${beerstyle}`).then( data => {
        drawGaugeABV(data);
        drawGaugeIBU(data);
        drawGaugeSRM(data);
		});
};

// build cloud chart
function buildCharts() {
	d3.json(`/category`).then ( data =>{
      drawCloud(data);
      d3.select('#cloud').html("");
    })
};

// build the description for the beerstyle
function buildDescription() {

    d3.json(`/gaugechart/${beerstyle}`).then(data.forEach(e => {
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

        buildPanel()
        buildCharts()
        buildDescription()
    
}

// create event listeners:
function optionChangedOne(newCategory) {
    category = newCategory;
}

function optionChangedTwo(newBeerstyle) {
    beerstyle = newBeerstyle;
    buildPanel();
    buildDescription();
                        
}

// call init function  
init();
