// start slingin' some d3 here.


var gameBoard = {
  height: 400,
  width: 600
};

// mouse data
var mouse = [{
  x: 0,
  y: 0
}];

var scoreBoard = {
  highScore: 0,
  currentScore: 0
};

var gameStartTime = Date.now();
var Enemy = function(x,y){
  this.x = x;
  this.y = y;
};

var enemies = Array.apply(null, Array(10)).map(function(){
  return new Enemy(Math.floor(Math.random() * (gameBoard.width-10)), Math.floor(Math.random() * (gameBoard.height-10)));
});

// D3 time 

// put down the svg board
d3.select('.board')
  .append('svg')
  .attr('height', gameBoard.height)
  .attr('width', gameBoard.width)
  .attr('class', 'board');


// add circles at random on svg board
d3.select('svg.board').selectAll('circle')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', function(data) {return data.x;})
  .attr('cy',function(data) {return data.y;});

// Mouse drag functionality 

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

function dragstarted(d) {
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}

// add mouse to board
d3.select('svg.board').selectAll('rect')
  .data(mouse)
  .enter()
  .append('rect')
  .attr('id', 'mouse')
  .attr('x', function(data) {return data.x;})
  .attr('y', function(data) {return data.y;})
  .call(drag);

// update random circle positions by altering the data array
function update() {

  // change all the data
  enemies = enemies.map(function(enemy) {
    // assign new x and y locations for each enemy NOT creating new enemy objects
    enemy.x = Math.floor(Math.random() * (gameBoard.width-10));
    enemy.y = Math.floor(Math.random() * (gameBoard.height-10));
    return enemy;
  });

  // go through and update all the circles with the new data
  d3.select('svg.board').selectAll('circle')
  .transition().duration(1000)
  .attr('cx', function(data) {return data.x;})
  .attr('cy', function(data) {return data.y;});
}


setInterval(update, 1000);




