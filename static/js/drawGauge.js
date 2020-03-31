
function drawGauge(data) {
	let degree = parseInt(data.ABV_avg) * (180/11);

	let level = degree;

	// Trig to calc meter point
	let degrees = 180 - level,
	   radius = .5;
	let radians = degrees * Math.PI / 180;
	let x = radius * Math.cos(radians);
	let y = radius * Math.sin(radians);

	// Path: may have to change to create a better triangle
	let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	   pathX = String(x),
	   space = ' ',
	   pathY = String(y),
	   pathEnd = ' Z';
	let path = mainPath.concat(pathX,space,pathY,pathEnd);

	let trace = [{ type: 'scatter',
	 x: [0], y:[0],
	  marker: {size: 28, color:'850000'},
	  showlegend: false,
	  name: 'ABV %',
	  text: data.ABV_avg,
	  hoverinfo: 'text+name'},
	{ values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
	rotation: 90,
	text: [ '\u{1F929}', '\u{1F603}', '\u{1F642}','\u{1F610}','\u{1F641}',''],
	textinfo: 'text',
	textposition:'inside',
	textfont:{
	  size : 30,
	  },
	marker: {colors:['rgba(217, 230, 242, .5)','rgba(141, 180, 216 ,.5)',
						'rgba(65, 130, 190, .5)', 'rgba(39, 78, 114, .5)', 
	                       'rgba(13, 26, 38, .5)','rgba(255, 255, 255, 0)'
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
	    fillcolor: '850000',
	    line: {
	      color: '850000'
	    }
	  }],

	title: `<b> ABV % for </b> <br>${data.Category}<br>`,
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

	}
