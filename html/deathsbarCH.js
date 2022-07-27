var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#barChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.4);

var xAXIS = svg.append("g")
  .attr("transform", "translate(0," + height + ")");

var y = d3.scaleLinear()
  .range([ height, 0]);

var yAXIS = svg.append("g")
  .attr("class", "YAXIS")

function update(dataSel) {

  d3.csv ("https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/covid19Deaths-Bar.csv", function(data) {

  x.domain(data.map(function(d) { return d.State; }))
  xAXIS.transition().duration(1000).call(d3.axisBottom(x))

  y.domain([0, d3.max(data, function(d) {return +d[dataSel]})])
  yAXIS.transition().duration(1000).call(d3.axisLeft(y))



var box = svg.selectAll("rect")
  .data(data)

box
  .enter()
  .append("rect")
  .merge(box)
  .transition()
  .duration(1000)
    .attr("x", function(d) { return x(d.State); })
    .attr("y", function(d) { return y(d[dataSel]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[dataSel]); })
    .attr("fill", "#69b3a2")
  })
}

update('Cases_White')