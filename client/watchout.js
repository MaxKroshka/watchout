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

var enemies = [new Enemy(Math.floor(Math.random() * (gameBoard.width-30)), Math.floor(Math.random() * (gameBoard.height-30)))];

// D3 time 

// put down the svg board
d3.select('.board')
  .append('svg')
  .attr('height', gameBoard.height)
  .attr('width', gameBoard.width)
  .attr('class', 'board');


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
d3.select('svg.board').selectAll('image#mouse')
  .data(mouse)
  .enter()
  .append('image')
  .attr('id', 'mouse')
  .attr('xlink:href','diver.png')
  .attr('width', '80')
  .attr('height', '80')
  .attr('x', function(data) {return data.x;})
  .attr('y', function(data) {return data.y;})
  .call(drag);

// update random circle positions by altering the data array
function update() {

  // change all the data
  enemies = enemies.map(function(enemy) {
    // assign new x and y2locations for each enemy NOT creating new enemy objects
    enemy.x = Math.floor(Math.random() * (gameBoard.width-10));
    enemy.y = Math.floor(Math.random() * (gameBoard.height-10));
    return enemy;
  });

  // go through and update all the circles with the new data
  d3.select('svg.board').selectAll('image.enemy')
  .transition().duration(2000)
  .attr('x', function(data) {return data.x;})
  .attr('y', function(data) {return data.y;});

  // add circles at random on svg board inc # of jellies every 5 sec
  d3.select('svg.board').selectAll('image.enemy')
    .data(enemies)
    .enter()
    .append('image')
    .attr('class', 'enemy')
    .attr('xlink:href','enemy.png')
    .attr('width','60')
    .attr('height','60')
    .attr('x', function(data) {return data.x;})
    .attr('y',function(data) {return data.y;});
}


setInterval(update, 2000);

var collisionCheck = function(enemyX, enemyY, mouseX, mouseY){
   return (enemyX < mouseX + 40 &&
    enemyX + 20 > mouseX &&
    enemyY < mouseY + 40 &&
    20 + enemyY > mouseY);
};

var collisionDetection = function(){
  // get currentTime
  var currentTime = Date.now();
    d3.select('.current').text("Current score: " + Math.floor((currentTime - gameStartTime)/10));
  var enemies = d3.select('svg.board').selectAll('image.enemy');
  var mouse = d3.select('svg.board').selectAll('image#mouse');
  enemies = enemies[0].slice(0, enemies[0].length);
  mouseX = mouse[0][0].x.animVal.value;
  mouseY = mouse[0][0].y.animVal.value;
  enemies.forEach(function(enemy){
    if (collisionCheck(Math.floor(enemy.x.animVal.value), Math.floor(enemy.y.animVal.value), Math.floor(mouseX), Math.floor(mouseY))) {
      var currentScore = currentTime - gameStartTime;
      if(currentScore > scoreBoard.highScore){
        scoreBoard.highScore = Math.floor(currentScore/10);
        d3.select('.highscore').text("Highest score: " + scoreBoard.highScore);
        // clear enemies dataset
      }
      window.enemies = [];
      d3.select('svg.board').selectAll('image.enemy')
      .data(window.enemies)
      .exit()
      .remove();
      gameStartTime = currentTime;
      d3.select('.scoreboard').
      style('border','2px solid red');
      setInterval(function(){
        d3.select('.scoreboard').
        style('border','2px solid white');
      }, 1000);
    } 

  });
};
setInterval(collisionDetection, 10);
setInterval(function(){
  window.enemies.push(new Enemy(Math.floor(Math.random() * (gameBoard.width-30)), Math.floor(Math.random() * (gameBoard.height-30))));
}, 5000);






