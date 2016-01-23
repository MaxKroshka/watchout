// start slingin' some d3 here.


var gameBoard = {
  height: 400,
  width: 600
};




var Enemy = function(x,y){
  this.x = x;
  this.y = y;
};

var enemies = Array.apply(null, Array(10)).map(function(){
  return new Enemy(Math.floor(Math.random() * gameBoard.width), Math.floor(Math.random() * gameBoard.height));
});

// D3 time 

// put down the svg board
d3.select('.board')
  .append('svg')
  .attr('height', gameBoard.height)
  .attr('width', gameBoard.width)
  .attr('class', 'board')

// add circles at random on svg board
d3.select('svg.board').selectAll('circle')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', function(data) {return data.x})
  .attr('cy',function(data) {return data.y});