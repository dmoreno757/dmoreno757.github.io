var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#barDeath")
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



if (dataSel == "Count_of_deaths") {
    var annotations = [
        {
        note: {
          label:"Death Count Increases Per Age",
          title: "High Covid Death Age",
          align: "right"
        },
        color: ["red"],
        x: 800,
        y: -10,
        dy: 30,
        dx: 20
      }
      ]

    var makeAnnotations = d3.annotation()
        .annotations(annotations)
        .textWrap(150)

    svg.append("g")
        .attr("style", "font-size:15px;")
        .call(makeAnnotations)
} else {
    var annotationsCase = [
        {
        note: {
          label:"Peek covid cases ages 18-29 Years, also other categories next to each other are high",
          title: "High Covid Cases",
          align: "right"
        },
        color: ["blue"],
        x: 365,
        y: 100,
        dy: 30,
        dx: 20
      }
      ]

    var makeAnnotationsCase = d3.annotation()
        .annotations(annotationsCase)
         .textWrap(150)

    svg.append("g")
        .attr("style", "font-size:15px;")
        .call(makeAnnotationsCase)
}


 
  })
}

update('Count_of_cases')