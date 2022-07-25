const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#linechartPt1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/United_States_COVID-19_Community_Levels_by_County1.csv").then(
    // Now I can use this dataset:
  function(data) {

var x = d3.scaleLinear()
  .domain([0, 50])
  .range([ 0, width ]);

var xAXIS = svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 13100])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "5px")
    .style("border-radius", "10px")
    .style("padding", "10px")
    .text("TOOLTIP");

var box = svg.append("defs").append("svg:clipPath")
  .attr("id", "box")
  .append("svg:rect")
  .attr("width", width )
  .attr("height", height )
  .attr("x", 0)
  .attr("y", 0);

var brush = d3.brushX()
  .extent([[0,0], [width,height]])
  .on("end", updateBox)

var scatters = svg.append('g')
  .attr("clip-path", "url(#box)")

scatters
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function(d) { return x(d.covid_hospital_admissions_per_100k); })
    .attr("cy", function(d) { return y(d.covid_cases_per_100k); })
    .attr("r", 3)
    .style("fill", "#69b3a2")
    .style("opacity", 1)
    .style("stroke", "white")
    .text(function(d) {return x(d) + "px"; })
    .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


scatters
  .append("g")
    .attr("class", "brush")
    .call(brush);

var timeIdle
function idle() { timeIdle = null; }

function updateBox() {
  
  limit = d3.event.selection

  if (!limit) {
    if (!timeIdle) return timeIdle = setTimeout(idle, 500)
    x.domain([0, 50])
  } else {
    x.domain([x.invert(limit[0]), x.invert(limit[1])])
    scatters.select(".brush").call(brush.move, null)
  }

  xAXIS.transition().duration(1000).call(d3.axisBottom(x))
  scatters
    .selectAll("circle")
    .transition().duration(1000)
    .attr("cx", function(d) { return x(d.covid_hospital_admissions_per_100k); })
    .attr("cy", function(d) { return y(d.covid_cases_per_100k); })
    .text(function(d) {return x(d) + "px"; })
    .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

}

    
})

//https://d3-graph-gallery.com/graph/line_basic.html