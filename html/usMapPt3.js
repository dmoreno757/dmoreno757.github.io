var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;
  

//https://www.notion.so/Visualize-Data-with-a-Choropleth-Map-9d91d46e78d4406abc6a0d36f9e089dc
var countyLink = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
var countyData;

//https://data.cdc.gov/Public-Health-Surveillance/United-States-COVID-19-Community-Levels-by-County/3nnm-4jni/data
var countyStatLink = 'https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/United_States_COVID-19_Community_Levels_by_County1.csv';
var countyStatData;

map = d3.select('#usMap')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

var drawMap = () => {
    map.selectAll("path")
       .data(countyData)
       .enter()
       .append("path")
       .attr("d", d3.geoPath())
       .attr('class', 'county')
       .attr('fill', (item) => {
        var fips = item['id']
        var county = countyStatData.find((county) => {
            return county['county_fips'] == fips
        })
        var cases = county['covid_cases_per_100k'];
        console.log(cases)
        if (cases <= 100){
            return '#feeceb'
        }else if (cases <= 500){
            return '#fdd9d7'
        } else if (cases <= 1000){
            return '#fcc7c3'
        } else if (cases <= 1500){
            return '#fbb4af'
        } else if (cases <= 2000){
            return '#faa19b'
        } else if (cases <= 2500){
            return '#f88e86'
        } else if (cases <= 3000){
            return '#f77b72'
        } else if (cases <= 3500){
            return '#f6695e'
        } else if (cases <= 4000){
            return '#f5564a'
        } else if (cases <= 4500){
            return '#f5564a'
        } else if (cases <= 5000){
            return '#f44336'
        }
        else {
            return 'black'
        }
      })
}


d3.json(countyLink).then(
    (data, err) => {
        if (err) {
            console.log(err)
        } else {
            countyData = data
            countyData = topojson.feature(countyData, countyData.objects.counties).features
            console.log('countydata!')
            console.log(countyData)

            d3.csv(countyStatLink).then(
                (data, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        countyStatData = data
                        console.log("COUNTY STAT DATA")
                        console.log(countyStatData)
                        drawMap()
                    }
                }
            )
        }
    }
)

