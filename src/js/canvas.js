var constants = require('./constants');
var Snake = require('./snake');
var Score = require('./menu/score');
var Button = require('./menu/button');

function Canvas() {

  // Get contents elements
  this.div = document.getElementById('snake-div');
  this.canvas = document.getElementById('snake');

  if (this.div === undefined || this.canvas === undefined) {
    throw "No Snake Elements found";
  }

  this.score = new Score(this.div);

  // Get the context of canvas
  this.ctx = this.canvas.getContext('2d');

  // Create new snake
  this.snake = new Snake(this, this.ctx, this.score);

  this.button = new Button(this.snake, this.div);

  // Initialize canvas
  this.init();
}

/**
 * Initialize canvas
 */
Canvas.prototype.init = function() {

  // Set the size of canvas
  constants.canvas.width = Math.floor(this.div.clientWidth / constants.canvas.resolution);
  this.canvas.width = constants.canvas.width * constants.canvas.resolution;
  this.canvas.height = constants.canvas.height * constants.canvas.resolution;

  // Set the backgroundColor
  this.canvas.style.backgroundColor = constants.canvas.color;
};

/**
 * Resize the canvas for responsive compatibility
 */
Canvas.prototype.resize = function() {

  // Set the width of canvas
  constants.canvas.width = Math.floor(this.div.clientWidth / constants.canvas.resolution);
  this.canvas.width = constants.canvas.width * constants.canvas.resolution;

  // Redraw the snake
  this.snake.draw();
};

/**
 * Clear the canvas
 */
Canvas.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

module.exports = Canvas;