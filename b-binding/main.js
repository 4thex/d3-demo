// Define data
let data = [
  {
    message: "Hello World!"
  },
  {
    message: "Hello India!"
  }
];
// Define access method
let access = d => d.message;
// Update existing elements
let elements = d3
  .selectAll("h1")
  .data(data)
  .text(access);
// Add more if needed
elements
  .enter()
  .append("h1")
  .text(access);
// Remove excess
elements
  .exit()
  .remove();
