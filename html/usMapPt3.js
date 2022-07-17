(function () {
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 900 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#usMap")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.queue()
    .defer(d3.json, "us.json")
    .await(mapping)

var projection = d3.geoMercator()
    .translate([width/2, height/2])
    .scale(100)

var path = d3.geoPath()
    .projection(projection)


function mapping(data) {
    console.log(data)
}
});

