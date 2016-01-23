// start slingin' some d3 here.


var gameBoard = {
  height: window.innerHeight,
  width: window.innerWidth
};

// mouse data
var mouse = [{
  x: window.innerWidth/2,
  y: window.innerHeight/2
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

var enemies = Array.apply(null, Array(20)).map(function(){
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

var collisionCheck = function(circleX, circleY, rectX, rectY){
   return (circleX < rectX + 10 &&
    circleX + 10 > rectX &&
    circleY < rectY + 10 &&
    10 + circleY > rectY);
};

var collisionDetection = function(){
  // get currentTime
  var currentTime = Date.now();
  var circles = d3.select('svg.board').selectAll('circle');
  var rect = d3.select('svg.board').selectAll('rect');
  circles = circles[0].slice(0, circles[0].length);
  rectX = rect[0][0].x.animVal.value;
  rectY = rect[0][0].y.animVal.value;
  circles.forEach(function(circle){
    if (collisionCheck(Math.floor(circle.cx.animVal.value), Math.floor(circle.cy.animVal.value), Math.floor(rectX), Math.floor(rectY))) {
      var currentScore = currentTime - gameStartTime;
      if(currentScore > scoreBoard.highScore){
        scoreBoard.highScore = currentScore;
        d3.select('.highscore').text("Highest score: " + scoreBoard.highScore);
      }
      gameStartTime = currentTime;
    } else{
      d3.select('.current').text("Current score: " + (currentTime - gameStartTime));
    }
  });
};
setInterval(collisionDetection, 10);






