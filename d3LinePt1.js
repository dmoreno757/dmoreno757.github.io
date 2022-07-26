const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#linechartPt1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv", function(d) {
    return { date : d3.timeParse("%Y-%m-%d")(d.date), cases : d.cases, deaths : d.deaths }
  }).then(
    // Now I can use this dataset:
  function(data) {

// Add X axis --> it is a date format
const x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.date; }))
  .range([ 0, width ]);

var colGroups = ["cases", "deaths"]

d3.select("#buttonOption")
  .selectAll("Options")
    .data(colGroups)
  .enter()
    .append('option')
    .text(function(d) { return d; })
    .attr("value", function(d) {return d; })

var colorOptions = d3.scaleOrdinal()
    .domain(colGroups)
    .range(d3.schemeSet2);

svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.cases; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke_width", 2)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.cases) })
    )
})

//https://d3-graph-gallery.com/graph/line_basic.html