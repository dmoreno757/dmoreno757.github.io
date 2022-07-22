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

const x = d3.scaleLinear()
  .domain([0, 50])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 13100])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

var tooltip = d3.select("#linechartPt1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "5px")
    .style("border-radius", "10px")
    .style("padding", "10px")

var mouseOver = function(event, d) {
  tooltip.style("opacity", 1)
}

var mouseMove = function(event, d) {
  tooltip
    .html("COUNTY: " + d.county + " " + "STATE: " + d.state + " " + "COVID-HOSPITILIZATION-PER-100K: " + d.covid_hospital_admissions_per_100k + " " + "COVID-CASES-PER-100K:" + d.covid_cases_per_100k)
    .style("left", (d3.mouse(this)[0]) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}

var mouseLeave = function(d) {
  tooltip.transition().duration(300).style("opacity", 0)
}

svg.append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d=>x(d.covid_hospital_admissions_per_100k))
      .attr("cy", d=>y(d.covid_cases_per_100k))
      .attr("r", 3)
      .style("fill", "#69b3a2")
      .style("opacity", 1)
      .style("stroke", "white")
    .on("mouseover", mouseOver )
    .on("mousemove", mouseMove )
    .on("mouseleave", mouseLeave )

})

//https://d3-graph-gallery.com/graph/line_basic.html