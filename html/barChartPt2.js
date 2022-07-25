var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv", function(data) {
var nest = d3.nest()
  .key(function(d) { return d.state})
  .rollup(function(values) { return d3.max(values, function(d) { return +d.cases; })})
  .entries(data)
  .sort (function(a,b) {
    return  d3.descending(a.value,b.value)
  });

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.4);

var xAXIS = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Add Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);

var yAXIS = svg.append("g")
  .attr("class", "YAXIS")

function update(data) {

  x.domain(data.map(function(d) { return d.key; }))
  xAXIS.call(d3.axisBottom(x))

  y.domain
svg.selectAll("mybar")
.data(nest.sort(function(a,b) {return b-a}))
.enter()
.append("rect")
  .attr("x", function(d) { return x(d.key); })
  .attr("y", function(d) { return y(d.value); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.value); })
  .attr("fill", "#69b3a2")
    
}




})