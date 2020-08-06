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
let xAxis = d3
  .axisBottom(x)
  .ticks(data.length)
  .tickFormat(d3.timeFormat("%m/%d"));
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);
let y = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.count))
  .range([height, 0]);
svg
  .append("g")
  .call(d3.axisLeft(y));
// Render the data bars
let minCount = d3.min(data.map(d => d.count));
let dateRange = d3.extent(data.map(d => Date.parse(d.date)));
// 2* to get a thinner bar
let xInterval = x(dateRange[1])/(2*data.length);
let toolTip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip hidden");
svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(Date.parse(d.date))-xInterval/2)
  .attr("y", d => y(d.count))
  .attr("width", xInterval)
  .attr("height", d => y(minCount)-y(d.count))
  .attr("fill", "blue")
  .on("mouseover", d => {
    toolTip
      .transition()
      .attr("class", "tooltip");
    toolTip
      .html(d.count)
      .style("left", `${d3.event.pageX}px`)
      .style("top", `${d3.event.pageY-60}px`)
  })
  .on("mouseout", d => {
    toolTip
      .transition()
      .attr("class", "tooltip hidden")
  });
svg
  .append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "orange")
  .attr("stroke-width", 2)
  .attr("d", d3.line()
    .curve(d3.curveBasis)
    .x(d => x(Date.parse(d.date)) )
    .y(d => y(d.count))
  );
