var transactions = transactionsPerBlock.values;
var marketPrice = marketPrice.values;

d3.select('.container').selectAll('div')
  .data(transactions)
  .enter()
  .append('div')
  .style('width', '3px')
  .style('height', function(d){return Math.round(d.y / 3) + 'px';})
  .style('position', 'absolute')
  .style('bottom', 0)
  .style('left', function(d,i) { console.log(i);return (i * 4) + 'px'; });
  
function update(data, scale, color) {
  d3.select('.container').selectAll('div')
    .data(data)
    .transition()
    .duration(1000)
    .style('background-color',color)
    .style('width', '3px')
    .style('height', function(d){return Math.round(d.y / scale) + 'px';});
}

// set buttons
d3.select('#set-market-price').on('click', function(){update(marketPrice,1,'#9b59b6');});
d3.select('#set-transactions').on('click', function(){update(transactions,3,'#d35400');});
