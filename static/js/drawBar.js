function drawBar(data){


                    let barData = [
                    {
                        x: data.map(e => e.review_count),
                        y: data.map(e => e.beer_style),
                        orientation: 'h',
                        type: 'bar',
                        textposition: 'auto',
                        hoverinfo: data.map(e => e.review_count ),
                        marker: {
                                color: 'rgb(244,214,84)',
                                opacity: 0.8,
                                line: {
                                color: 'rgb(244,214,84)',
                                width: 1.5
                                }
                            }
                        }
                    ];
                      
    
                    let layout = {
                                title: 'Top 10 Most Popular Beer Styles',
                                barmode: 'stack',
                                showlegend:false,
                                yaxis: {
                                  autorange: 'reversed',
                                  showticklabels: true,
                                  side: 'left',
                                  fixedrange:true,
                                  automargin: true,
                                  tickfont: {
                                      size: 12
                                    }
                                },
                                xaxis: {
                                  fixedrange: true,
                                  showline: true,
                                  tickformat: 'g',
                                  title: 'Review Count',
                                  tickfont: {
                                    size: 12
                                  }
                                }
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