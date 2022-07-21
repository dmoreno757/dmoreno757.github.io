var margin = {top: 50, right: 350, bottom: 70, left: 100},
    width = 1500 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;
  

//https://www.notion.so/Visualize-Data-with-a-Choropleth-Map-9d91d46e78d4406abc6a0d36f9e089dc
var countyLink = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
var countyData;

//https://data.cdc.gov/Public-Health-Surveillance/United-States-COVID-19-Community-Levels-by-County/3nnm-4jni/data
var countyStatLink = 'https://raw.githubusercontent.com/dmoreno757/dmoreno757.github.io/main/html/United_States_COVID-19_Community_Levels_by_County1.csv';
var countyStatData;

map = d3.select('#usMap')
tooltip = d3.select("#tooltip")

var drawMap = () => {
    map.selectAll("path")
       .data(countyData)
       .enter()
       .append("path")
       .attr("d", d3.geoPath())
       .attr('class', 'county')
       .attr('fill', (countyDataObj) => {
        var fips = countyDataObj['id']
        var county = countyStatData.find((i) => {
            return i['county_fips'] == fips
        })
        var cases = county['covid-19_community_level'];
        if (cases == "Low"){
            return 'green'
        }else if (cases == "Medium"){
            return 'orange'
        }
        else {
            return 'red'
        }
      })
      .attr('fipsD', (countyDataObj) => {
        return countyDataObj['id']
      })
      .attr("countPerD", (countyDataObj) => {
        var fips = countyDataObj['id']
        var county = countyStatData.find((i) => {
            return i['county_fips'] == fips
        })
        var cases = county['covid_cases_per_100k'];
        return cases;
      })
      .on('mouseover', (countyDataObj) => {
        tooltip.transition()
               .syle("visibility", "visible")
        var fips = countyDataObj['id']
        var county = countyStatData.find((county) => {
                   return county['fips'] === fips
               })
      })
}


d3.json(countyLink).then(
    (data, err) => {
        if (err) {
            console.log(err)
        } else {
            countyData = data
            countyData = topojson.feature(countyData, countyData.objects.counties).features
            console.log(countyData)

            d3.csv(countyStatLink).then(
                (data, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        countyStatData = data
                        console.log(countyStatData)
                        drawMap()
                    }
                }
            )
        }
    }
)

