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

d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv", 
    function(d) {return {date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value} },

    function(data) {

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

    svg
        .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function(d) { return x(+data.date) })
                .y(function(d) { return y(+data.value) })
            )
            .attr("stroke", "blue")
            .style("stroke-width", 6)
            .style("fill", "none")

})