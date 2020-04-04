function drawBar(data){


                    let barData = [
                    {
                        x: data.map(e => e.review_count),
                        y: data.map(e => e.beer_style),
                        orientation: 'h',
                        type: 'bar',
                        textposition: 'auto',
                        hoverinfo: 'none',
                        marker: {
                                color: 'rgb(255,205,88)',
                                opacity: 0.4,
                                line: {
                                color: 'rgb(255,182,12)',
                                width: 1.5
                                }
                            }
                        }
                    ];
                      
    
                    let layout = {
                                title: 'Top 25 Most Popular Beer Styles',
                                barmode: 'stack'
                                };
    
                    Plotly.newPlot('barchart', barData, layout, { showLink: false });


}

function init(){

    d3.json(`/style_rank`).then(data => {
        console.log("Bar Chart")
    
        drawBar(data);
    })


}

init();