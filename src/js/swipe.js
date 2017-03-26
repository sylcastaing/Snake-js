function Swipe(canvas, snake) {

  this.canvas = canvas;
  this.snake = snake;

  this.init();
}

Swipe.prototype.init = function() {
  var handle = this.handle;
  var snake = this.snake;
  var swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;

  this.canvas.canvas.addEventListener('touchstart', function(e) {
    var touchObj = e.changedTouches[0];

    swipedir = 'none';
    distX = 0;
    distY = 0;

    startX = touchObj.pageX;
    startY = touchObj.pageY;

    startTime = new Date().getTime();

    e.preventDefault();
  }, false);

  this.canvas.canvas.addEventListener('touchend', function(e) {
    var touchObj = e.changedTouches[0];

    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;

    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        swipedir = (distX < 0) ? 'left' : 'right';
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        swipedir = (distY < 0) ? 'up' : 'down';
      }
    }

    console.log(swipedir);

    handle(snake, swipedir);

    e.preventDefault();
  }, false);

  this.canvas.canvas.addEventListener('touchemove', function(e) {
    e.preventDefault();
  }, false);
};

Swipe.prototype.handle = function(snake, swipedir) {
  if (swipedir === 'left') {
    snake.moveLeft();
  }
  else if (swipedir === 'right') {
    snake.moveRight();
  }
  else if (swipedir === 'up') {
    snake.moveUp();
  }
  else if (swipedir === 'down') {
    snake.moveDown();
  }
};

module.exports = Swipe;