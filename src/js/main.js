var Canvas = require('./canvas');

var canvas = new Canvas();

window.onresize = function() {
  canvas.resize();
};

window.onkeydown = function(e){
       
    // UP
    if (e.keyCode === 38) {
        canvas.snake.moveUp();
        e.preventDefault();
    }
    // DOWN
    else if (e.keyCode === 40) {
        canvas.snake.moveDown();
        e.preventDefault();
    }
    // LEFT
    else if (e.keyCode === 37) {
        canvas.snake.moveLeft();
        e.preventDefault();
    }
    // RIGHT
    else if (e.keyCode === 39) {
        canvas.snake.moveRight();
        e.preventDefault();
    }
};