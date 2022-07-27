var margin = {top: 30, right: 30, bottom: 70, left: 100},
    width = 900 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#linechartPt1")
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

  d3.csv ("https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/vaccinationDose.csv", function(data) {

  x.domain(data.map(function(d) { return d.Age_Group; }))
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
      .attr("x", function(d) { return x(d.Age_Group); })
      .attr("y", function(d) { return y(d[dataSel]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[dataSel]); })
    .attr("fill", "#69b3a2")

    var annotations = [
      {
      note: {
        label:"Age 18-49 have the highest completion for the first series of vaccination, once we go to the First Booster and to the Second Booster we see that the vaccination increases for the older people.",
        title: "Covid-19 Vaccination by Age",
        align: "left"
      },
      type: d3.annotationCalloutCircle,
      subject: { radius: 200, radiusPadding: 5 },
      color: ["red"],
      x: 550,
      y: 200,
      dy: -10,
      dx: -480
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

update('Count_of_People_with_Completed_Primary_Series')

//https://covidtracking.com/race/dashboard
//https://d3-graph-gallery.com/graph/barplot_button_data_csv.html