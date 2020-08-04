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
let margin = {
  top: 0,
  right: 30,
  bottom: 30,
  left: 50
};
let width = 500 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", `${width + margin.left + margin.right}`)
  .attr("height", `${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
let x = d3
  .scaleTime()
  .domain(d3.extent(data, d => Date.parse(d.date)))
  .range([0, width]);
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
let y = d3
  .scaleLinear()
  .domain([d3.max(data, d=> d.count), d3.min(data, d => d.count)])
  .range([0, height]);
svg
  .append("g")
  .call(d3.axisLeft(y));
// Render the data bars
let minCount = d3.min(data.map(d => d.count));
svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(Date.parse(d.date)))
  .attr("y", d => y(minCount))
  .attr("transform", d => `rotate(180, ${x(Date.parse(d.date))}, ${y(d.count)})`)
  // .attr("y", d => y(d.count))
  .attr("width", d => 5)
  .attr("height", d => y(d.count));
