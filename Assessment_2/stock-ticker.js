function getData(){
    let ticker =   document.getElementById("ticker").value;
    (async function f() {
        let url = "https://sandbox.iexapis.com/stable/stock/"+ticker+"/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_4943518c25fd46cdb019fdbcf87c801a";
        let data = await (await fetch(url).catch(handleErr)).json();
        if (data.code && data.code == 400) {
          return;
        }
        drawSVG(data.chart);
      })();

      function handleErr(err) {
        console.warn(err);
        let resp = new Response(
          JSON.stringify({
            code: 400,
            message: "network Error"
          })
        );
        return resp;
      }
}

function drawSVG(newData){
    d3.select("svg").remove(); // Remove an dredraw for every ticker
const width = 860;
const height = 250;
const margin = 5;
const padding = 5;
const adj = 30;
// we are appending SVG first
const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj + " -"
          + adj + " "
          + (width + adj *3) + " "
          + (height + adj*3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

const timeConv = d3.timeParse("%Y-%m-%d");
let data = newData;
let max = 0;
let low = data[0].low;
let converted_data = data.map((d)=>{
    if(max < d.high)
        max = d.high;
    if(low > d.low)
        low = d.low;
        return{
            high: d.high,
            date: timeConv(d.date)
        }
})
const xScale = d3.scaleTime().range([0,width]);
const yScale = d3.scaleLinear().rangeRound([height, 0]);

xScale.domain(d3.extent(converted_data, function(d){
    return (d.date)}));

let lowRange = low - (0.35*low);
let highRange = max + (0.15*max)
yScale.domain([lowRange, highRange]);

const yaxis = d3.axisLeft()
    .ticks(data.length/2)
    .scale(yScale);

const xaxis = d3.axisBottom()
    .ticks(d3.timeDay.every(2))
    .tickFormat(d3.timeFormat('%b %d'))
    .scale(xScale);

const line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.high); });

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

svg.append("g")
    .attr("class", "axis")
    .call(yaxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".75em")
    .attr("y", 4)
    .style("text-anchor", "end")
    .text("Stock Price");

    console.log("scale : ",data[3].date, xScale(timeConv(data[3].date )));

var lineGraph = svg.append("path")
                           .attr("d", line(converted_data))
                           .attr("stroke", "green")
                           .attr("stroke-width", 2)
                           .attr("fill", "none");

let addHighAndLow = function(x,y,val){
        
        svg.append("text").attr("x",x)
                        .attr("y",y)
                        .text(val)
                        .style("font-size","10px");
    }
converted_data.forEach((elem,i)=>{
    let g = svg.append("g").attr("id",("g_"+i));
    console.log("elem : ", elem);
    console.log("i : ", i);

    if(data[i].high == max){
       let  x = xScale(elem.date);
        let y = yScale(elem.high)-15; // To show the data higher
        let val = "High : " + max;
        addHighAndLow(x,y,val)
    }
    if(data[i].low == low)
    {
        let x = xScale(elem.date);
        let y = yScale(elem.high) + 15; // To show the data lower
        let val = "Low: " + low;

        addHighAndLow(x,y,val)
    }

    g.append("circle") // Enter is not working
    .attr("cx", function() { return xScale(elem.date); })      
    .attr("cy", function() { return yScale(elem.high); })    
    .attr("r", 3)
    .attr("class","point")
    .style("opacity", 1)
    .style("color","red")
    .style("stroke","black")
    .on('mouseover', function(d) {
        d3.selectAll(".tooltip").style("display","block")
        tooltip.transition()
                .delay(30)
                .duration(200)
                .style("opacity", 1);
            let tooltipData = "date:" + data[i].date + "<br>" +
                                "open: "+ data[i].open + "<br>" +
                                "high: " + data[i].high + "<br>" +
                                "low: "+data[i].low + "<br>" + 
                                "close: "+data[i].close + "<br>" ;
    
            tooltip.html(tooltipData)
                .style("left", (d3.event.pageX + 25) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("font-size","14px");
    
            const selection = d3.select(this).raise();
    
            selection
                .transition()
                .delay("20")
                .duration("200")
                .attr("r", 6)
                .style("opacity", 1)
                .style("fill","#ed3700");
        })
        .on("mouseout", function(d) {      
            tooltip.transition()        
            .duration(100)      
            .style("opacity", 0);  

            const selection = d3.select(this);

            selection
                .transition()
                .delay("20")
                .duration("200")
                .attr("r", 3)
                .style("opacity", 1);
            
            d3.selectAll(".tooltip").style("display","none")
        });
})

    

}