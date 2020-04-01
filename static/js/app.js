function buildPanel() {
	d3.json(`/category/${category}`).then( data => {
		drawGauge(data);
		});
};

var category = "Bock";
var beer_style = "German Bock";

function init() {


var selectorOne = d3.select("#selDatasetOne");
	d3.json("category_names").then((categoryNames) => {
    categoryNames.forEach((categoryData) => {
		selectorOne
        .append("option")
        .text(categoryData.Category)
        .property("value", categoryData.Category);
    });
	})

	var selectorTwo = d3.select('#selDatasetTwo');
	d3.json("beerstyle_names").then((sampleBeerstyle) =>{
	sampleBeerstyle.forEach((beerstyle) =>{
		selectorTwo
		.append("option")
		.text(beerstyle.beer_style)
		.property("value", beerstyle.beer_style);
	});
	})


	buildPanel()

}

function optionChangedOne(newcategory) {
    category = newcategory;
    buildPanel();
    d3.select('#abvGauge').html(""),
    drawGauge();
  }

  function optionChangedTwo(newbeerstyle) {
    category = newbeerstyle;
    buildPanel();
    d3.select('#abvGauge').html(""),
    drawGauge();
  }


  /*
  function optionChangedTwo(newbeerstyle) {
    country = newCountry;
    buildPanel();
    drawBar();
  }
  */
  
  init();
