function buildDashboard(state){

    d3.json(`/statedata/${state}`).then(data => data.forEach(e => {
        console.log(data)
        let cardBody = d3.select("#statestat")
            .append("div")
            .classed("card", true)
            .append("div")
            .classed("card-body", true)
        cardBody.append("h4")
            .classed("card-title", true)
            .text(e.state)
        cardBody.append("h6")
            .classed("card-subtitle mb-2 text-muted", true)
            .text(`Number of Brewery: ${e.breweries}`)
        cardBody.append("p")
            .classed("capita", true)
            .text(`Breweries per Capita: ${e.breweries_per_capita}`);
        cardBody.append("p")
            .classed("barrels", true)
            .text(`Beer Barrels produced per Year: ${e.yearly_barrels}`);

        }))
};

function init(){

    var selectorThree = d3.select('#selDatasetThree');
        d3.json("/state_data").then((dropdown3Names) =>{
        dropdown3Names.forEach((state) =>{
            selectorThree
            .append("option")
            .text(state.state)
            .property("value", state.state);
        });
        })
        d3.select('#statestat').html(""),
        buildDashboard('Texas');
};

function optionChangedThree(newState) {
    state = newState;
    console.log(state);
    d3.select('#statestat').html(""),
    buildDashboard(state);

};

init();