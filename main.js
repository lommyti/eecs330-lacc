var margin = {
    top: 4,
    right: 0,
    bottom: 8,
    left: 4
},
    width = 650 - margin.left - margin.right,
    height = 355 - margin.top - margin.bottom;

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
            x.style.display = "inline-block";
        }
    }


function changeSelection(id) {
    var x = document.getElementById(id);
    var style = window.getComputedStyle(x);
    if(style.getPropertyValue('color') == 'rgb(255, 215, 0)' || style.getPropertyValue('color') == 'rgb(255, 0, 0)'){
        x.style.color = '#000';
    }
    else{
        if (id.includes('star')) {
            x.style.color = 'rgb(255, 215, 0)';
        }
        else {
            x.style.color = 'red';
        }
    }
}

var servingsize1 = 1;
var servingsize2 = 1;
var servingsize3 = 1;
var servingsize4 = 1;
var servingsize12 = 1;
var servingsize13 = 1;
var servingsize14 = 1;
var servingsize15 = 1;


function updateUsername() {
    var x = document.getElementById("username");
    var y = document.getElementById("newuser");
    if (y.value != ""){
        x.innerHTML = "Welcome back, " + y.value + "!";
    }
    document.getElementById("msg1").innerHTML = "Your changes have been saved."

}

function updateServing1(amt){
    if (amt == "plus"){
        servingsize1 += 1;
    }
    else if (servingsize1 > 0) {
        servingsize1 -= 1;
    }    
    document.getElementById("food1").innerHTML = servingsize1;
    
}function updateServing2(amt){
    if (amt == "plus"){
        servingsize2 += 1;
    }
    else if (servingsize2 > 0) {
        servingsize2 -= 1;
    }    
    document.getElementById("food2").innerHTML = servingsize2;
}

function updateServing3(amt){
    if (amt == "plus"){
        servingsize3 += 1;
    }
    else if (servingsize3 > 0) {
        servingsize3 -= 1;
    }    
    document.getElementById("food3").innerHTML = servingsize3;
}

function updateServing4(amt){
    if (amt == "plus"){
        servingsize4 += 1;
    }
    else if (servingsize4 > 0) {
        servingsize4 -= 1;
    }
    document.getElementById("food4").innerHTML = servingsize4;
}

function updateServing12(amt){
    if (amt == "plus"){
        servingsize12 += 1;
    }
    else if (servingsize12 > 0) {
        servingsize12 -= 1;
    }
    document.getElementById("food12").innerHTML = servingsize12;
}

function updateServing13(amt){
    if (amt == "plus"){
        servingsize13 += 1;
    }
    else if (servingsize13 > 0) {
        servingsize13 -= 1;
    }
    document.getElementById("food13").innerHTML = servingsize13;
}

function updateServing14(amt){
    if (amt == "plus"){
        servingsize14 += 1;
    }
    else if (servingsize14 > 0) {
        servingsize14 -= 1;
    }
    document.getElementById("food14").innerHTML = servingsize14;
}

function updateServing15(amt){
    if (amt == "plus"){
        servingsize15 += 1;
    }
    else if (servingsize15 > 0) {
        servingsize15 -= 1;
    }
    document.getElementById("food15").innerHTML = servingsize15;
}


function displaySave(){
    document.getElementById("msg2").innerHTML = "Your changes have been saved."
}

function mySearchFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchinput");
    filter = input.value.toUpperCase();
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
}

var lacFilter = false;
var tenFilter = false;
var fifteenFilter = false;
var foodFilter = false;
var drinkFilter = false;

function searchLowLactose() {
    // Declare variables 
    var filter, table, tr, td, i;
    filter = ['1mg', '2mg', '3mg', '4mg', '5mg', '6mg', '7mg', '8mg', '9mg', '10mg', '11mg', '12mg', '13mg', '14mg', '15mg', '16mg', '17mg', '18mg', '19mg', '20mg'];
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");


    if (lacFilter){
        lacFilter = false;
        document.getElementById("lacFilter").style.background = "#46acc2";
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                tr[i].style.display = "";
                if(foodFilter && td2.innerHTML=="1% Milk"){
                    tr[i].style.display = "none";
                }
                else if(drinkFilter && td2.innerHTML != "1% Milk"){
                    tr[i].style.display = "none";
                }
                } 
            else {
                }
            } 
        }
    else{
        document.getElementById("lacFilter").style.background = "#ef9b2f";
        lacFilter = true;
        fifteenFilter = false;
        tenFilter = false;
        document.getElementById("fifteenFilter").style.background = "#46acc2";
        document.getElementById("tenFilter").style.background = "#46acc2";
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                if (filter.includes(td.innerHTML)) {
                    tr[i].style.display = "";
                    if (drinkFilter && (td2.innerHTML == "Yoplait Yogurt" || td2.innerHTML == "Oikos Yogurt")) {
                        tr[i].style.display = "none";
                    }
                    else if (foodFilter && td2.innerHTML == "1% Milk"){
                        tr[i].style.display = "none";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }

}

function search10() {
    // Declare variables 
    var filter, table, tr, td, i;
    filter = ['1mg', '2mg', '3mg', '4mg', '5mg', '6mg', '7mg', '8mg', '9mg'];
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");


    if (tenFilter){
        tenFilter = false;
        document.getElementById("tenFilter").style.background = "#46acc2";
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];
            if (td) {
                tr[i].style.display = "";
                if(td2.innerHTML != "1% Milk" && drinkFilter){
                    tr[i].style.display = "none";
                }
                else if(td2.innerHTML == "1% Milk" && foodFilter){
                    tr[i].style.display = "none";
                }
            } 
        }
    }
    else{
        document.getElementById("tenFilter").style.background = "#ef9b2f";
        document.getElementById("lacFilter").style.background = "#46acc2";
        document.getElementById("fifteenFilter").style.background = "#46acc2";
        tenFilter = true;
        lacFilter = false;
        fifteenFilter = false;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                if (filter.includes(td.innerHTML)) {
                    tr[i].style.display = "";
                    if(td2.innerHTML == "Oikos Yogurt" && drinkFilter){
                        tr[i].style.display = "none";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }
}


function search15() {
    // Declare variables 
    var filter, table, tr, td, i;
    filter = ['1mg', '2mg', '3mg', '4mg', '5mg', '6mg', '7mg', '8mg', '9mg', '10mg', '11mg', '12mg', '13mg', '14mg', '15mg'];
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    if (fifteenFilter){
        fifteenFilter = false;
        document.getElementById("fifteenFilter").style.background = "#46acc2";
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];

            if (td) {
                tr[i].style.display = "";
                if(foodFilter && td2.innerHTML == "1% Milk"){
                    tr[i].style.display = "none";
                }
                else if(drinkFilter && td2.innerHTML != "1% Milk"){
                    tr[i].style.display = "none";
                }
            } 
        }
    }
    else{
        document.getElementById("fifteenFilter").style.background = "#ef9b2f";
        document.getElementById("tenFilter").style.background = "#46acc2";
        document.getElementById("lacFilter").style.background = "#46acc2";
        fifteenFilter = true;
        lacFilter = false;
        tenFilter = false;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                if (filter.includes(td.innerHTML)) {
                    tr[i].style.display = "";
                    if (drinkFilter && (td2.innerHTML == "Yoplait Yogurt" || td2.innerHTML == "Oikos Yogurt")) {
                        tr[i].style.display = "none";
                    }
                    else if (foodFilter && td2.innerHTML == "1% Milk"){
                        tr[i].style.display = "none";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }
}

function searchFood(){
    // Declare variables 
    var filter, table, tr, td, i;
    filter = ['Yogurt'];
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    if (foodFilter){
        foodFilter = false;
        document.getElementById("foodFilter").style.background = "#46acc2";
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                tr[i].style.display = "";
                if((lacFilter||fifteenFilter||tenFilter) && (td.innerHTML == "Chobani Yogurt" || td.innerHTML == "Dannon Yogurt")){
                    tr[i].style.display = "none";
                }
                if(tenFilter && td.innerHTML != "Oikos Yogurt"){
                    tr[i].style.display = "none";
                }
            } 
        }
    }
    else{
        document.getElementById("foodFilter").style.background = "#ef9b2f";
        document.getElementById("drinkFilter").style.background = "#46acc2";
        foodFilter = true;
        drinkFilter = false;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                if (td.innerHTML.includes(filter)) {
                    tr[i].style.display = "";
                    if((td.innerHTML=="Chobani Yogurt" || td.innerHTML=="Dannon Yogurt") && lacFilter){
                        tr[i].style.display = "none";
                    }
                    else if((td.innerHTML=="Chobani Yogurt" || td.innerHTML=="Dannon Yogurt") && fifteenFilter){
                        tr[i].style.display = "none";
                    }
                    else if((td.innerHTML!= "Oikos Yogurt") && tenFilter){
                        tr[i].style.display = "none";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }
}

function searchDrink(){
    // Declare variables 
    var filter, table, tr, td, i;
    filter = ['Milk'];
    table = document.getElementById("search-result");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    if (drinkFilter){
        drinkFilter = false;
        document.getElementById("drinkFilter").style.background = "#46acc2";
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                tr[i].style.display = "";
                if((lacFilter||fifteenFilter) &&( td.innerHTML=="Chobani Yogurt" || td.innerHTML=="Dannon Yogurt")){
                   tr[i].style.display = "none";

                   } 
                if(tenFilter && td.innerHTML!="Oikos Yogurt"){
                    tr[i].style.display = "none";
                }
        }
    }
                   }
    else{
        document.getElementById("drinkFilter").style.background = "#ef9b2f";
        document.getElementById("foodFilter").style.background = "#46acc2";
        foodFilter = false;
        drinkFilter = true;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                console.log(td.innerHTML);
                if (td.innerHTML.includes(filter)) {
                    tr[i].style.display = "";
                    if(tenFilter){
                        tr[i].style.display = "none";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }
}

var switchEmailOff = true;

function switchEmail(){
    if(switchEmailOff){
        document.getElementById("getnew").style.display = "block";
        document.getElementById("newpass").style.display = "none";
        switchEmailOff = false;
    }
    else{
        switchEmailOff = true;
        document.getElementById("getnew").style.display = "none";
        document.getElementById("newpass").style.display = "block";
    }
}

function tryLogIn(){
    var u = document.getElementById("user").value;
    var p = document.getElementById("pass").value;

    if (u == "user1" && p =="pass1"){
        window.location.href = "home.html";
    }
    else if (u == "rachel" && p == "weloveeecs330"){
        window.location.href= "homeuser2.html";
    }
    else{
        document.getElementById("error").style.display = "block";
    }
}