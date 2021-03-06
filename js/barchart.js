/*
In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 
*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Create shape for bar graph dimensions
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*
  Axes
*/ 

// Find max of Y
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Set y scale of visualization, using 0 and the max
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Set x scale of visualization, using 0 and the length of the data
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Setting up Y-axes labels
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// Setting up X-axes labels
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 
  Tooltip Set-up  
*/

// Create tool tip for hard-coded-bar
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Event handler for mouseover 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Event handler for moving mouse over an object
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// Event handler for moving mouse outside of an object
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 
  Bars 
*/

// Bar graph contruction
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);



const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);



//Use Data
d3.csv("data/barchart.csv").then((data) => {
  // Find max of Y
  let maxY2 = d3.max(data, function(d) { return d.score; });

  // Set y scale of visualization, using 0 and the max
  let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

  // Set x scale of visualization, using 0 and the length of the data
  let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

  // Setting up Y-axes labels
  svg2.append("g")
     .attr("transform", `translate(${margin.left}, 0)`) 
     .call(d3.axisLeft(yScale2)) 
     .attr("font-size", '20px'); 

  // Setting up X-axes labels
  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))  
      .attr("font-size", '20px'); 


  console.log(data);

  svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);
});


const svg3 = d3
  .select("#csv-sctatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


//Use Data
d3.csv("data/csv-sctatter.csv").then((data) => {
  // Find max of Y
  let maxY1 = d3.max(data1, function(d) { return d.score; });

  // Set y scale of visualization, using 0 and the max
  let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

  // Set x scale of visualization, using 0 and the length of the data
  let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

  svg3.selectAll() 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "scatter") 
     .attr("x", (d,i) => xScale3(i)) 
     .attr("y", (d) => yScale3(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale3.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


  svg3.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.day); } )
      .attr("cy", function (d) { return y(d.score); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

});


