// Define data
let data = [
  { date: "7/1", count: 936 },
  { date: "7/2", count: 987 },
  { date: "7/3", count: 978 },
  { date: "7/4", count: 982 },
  { date: "7/5", count: 1017 },
  { date: "7/6", count: 1021 },
  { date: "7/7", count: 1029 },
];
let margin = 100;
// Define access method
let x = d => d.date;
let y = d => d.count;
let yScale = d3
  .scaleLinear()
  .domain(d3.extent(data.map(x => x.count)))
  .range([margin, window.innerWidth-margin]);
// Update existing elements
let elements = d3
  .selectAll("div.bar")
  .data(data)
  .enter()
  .append("div");
// Set attributes
elements
  .attr("class", "bar")
  .style("min-width", d => {
    let value = y(d);
    let scaled = yScale(value);
    return `${scaled}px`;
  });
// Create labels
elements
  .append("div")
  .attr("class", "left")
  .text(d => d.date);
elements
  .append("div")
  .attr("class", "right")
  .text(d => d.count);
