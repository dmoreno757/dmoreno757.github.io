var countyLink = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
var countyData;

var countyStatLink = 'https://data.cdc.gov/resource/3nnm-4jni.json';
var countyStatData;

map = d3.select('#usMap')

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
            //console.log(county['fips'])
            return county['county_fips'] == fips
        })
        console.log(county)
        function funcTest(cases) {
            if (cases === undefined) {
                console.log(cases.not)
            }
            return cases;
        }
        
        var cases = county['covid_cases_per_100k'];
        console.log(funcTest(cases));
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

            d3.json(countyStatLink).then(
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

