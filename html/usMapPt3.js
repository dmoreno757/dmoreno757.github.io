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
        var cases = county['covid_cases_per_100k'];
        if (cases <= 100){
            return '#ffffff'
        }else if (cases <= 500){
            return '#feebeb'
        } else if (cases <= 1000){
            return '#fcd6d6'
        } else if (cases <= 1500){
            return '#fbc2c2'
        } else if (cases <= 2000){
            return '#f9aeae'
        } else if (cases <= 2500){
            return '#f89999'
        } else if (cases <= 3000){
            return '#f68585'
        } else if (cases <= 3500){
            return '#f57171'
        } else if (cases <= 4000){
            return '#f35c5c'
        } else if (cases <= 4500){
            return '#f24848'
        } else if (cases <= 5000){
            return '#f03333'
        } else if (cases <= 6000){
            return '#ef1f1f'
        } else if (cases <= 6500){
            return '#e71111'
        } else if (cases <= 7000){
            return '#d20f0f'
        } else if (cases <= 7500){
            return '#be0e0e'
        } else if (cases <= 8000){
            return '#aa0c0c'
        } else if (cases <= 8500){
            return '#950b0b'
        } else if (cases <= 9000){
            return '#810909'
        } else if (cases <= 9500){
            return '#6d0808'
        } else if (cases <= 9500){
            return '#580606'
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

