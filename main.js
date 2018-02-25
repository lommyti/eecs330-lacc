var margin = {
    top: 4,
    right: 0,
    bottom: 8,
    left: 4
},
    width = 650 - margin.left - margin.right,
    height = 240 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var line = d3.svg.line()
.interpolate("basis")
.x(function(d) {
    return x(d.date);
})
.y(function(d) {
    return y(d.trend);
});

var svg = d3.select(".graph").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.tsv("https://s3-us-west-2.amazonaws.com/cbeas.misc/data.tsv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.trend = +d.trend;
    });

    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain(d3.extent(data, function(d) {
        return d.trend;
    }));

    svg.append("linearGradient")
        .attr("id", "temperature-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(100))
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "#2D6785"
        }, {
            offset: "25%",
            color: "#41A7E1"
        },{
            offset: "50%",
            color: "orange"
        }, {
            offset: "75%",
            color: "#EC9030"
        }, {
            offset: "100%",
            color: "#EC5B30"
        }])
        .enter().append("stop")
        .attr("offset", function(d) {
        return d.offset;
    })
        .attr("stop-color", function(d) {
        return d.color;
    });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
});

// ** Update data section (Called from the onclick)
function updateData() {

        // Select the section we want to apply our changes to
        var svg = d3.select("body").transition();

        // Make the changes
        svg.select(".line")
            .duration(750)
            .style("transform", "scaleY(.6)");
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);
    
        var x = document.getElementById("added-food");
        if (x.style.display === "" | x.style.display === "none") {
            x.style.display = "table-row";
        }
    }


function changeSelection(id) {
    console.log(id);
    var x = document.getElementById(id);
    if(x.style.color === 'gold'){
        x.style.color = '#000';
    }
}

