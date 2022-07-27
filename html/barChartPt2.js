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

  d3.csv ("https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/CRDT%20Data-%20clean2.csv", function(data) {

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



      var annotations = [
          {
          note: {
            label:"AZ to GA have the most cases within ethnicity, so covid does not pick one. It reaches out whoever it can, also population can play a role too.",
            title: "Cases of Ethnicity and Race Using States",
            align: "left"
          },
          type: d3.annotationCalloutCircle,
          subject: { radius: 100, radiusPadding: 1 },
          color: ["red"],
          x: 150,
          y: 500,
          dy: -370,
          dx: 100
        }
        ]
  
      var makeAnnotations = d3.annotation()
          .annotations(annotations)
          .textWrap(150)
  
      svg.append("g")
          .attr("style", "font-size:15px;")
          .call(makeAnnotations)
  })
}

update('Cases_White')

//https://covidtracking.com/race/dashboard
//https://d3-graph-gallery.com/graph/barplot_button_data_csv.html