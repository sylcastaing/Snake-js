var constants = require('./constants');
var Snake = require('./snake');

function Canvas() {

  this.div = document.getElementById('snake-div');
  this.canvas = document.getElementById('snake');

  if (this.div === undefined || this.canvas === undefined) {
    throw "No Snake Elements found";
  }

  this.ctx = this.canvas.getContext('2d');

  this.snake = new Snake();

  this.init();
}

Canvas.prototype.init = function() {
  constants.canvas.width = Math.floor(this.div.clientWidth / constants.canvas.resolution);
  this.canvas.width = constants.canvas.width * constants.canvas.resolution;
  this.canvas.height = constants.canvas.height * constants.canvas.resolution;
  this.snake.draw(this.ctx);
};

Canvas.prototype.resize = function() {
  constants.canvas.width = Math.floor(this.div.clientWidth / constants.canvas.resolution);
  this.canvas.width = constants.canvas.width * constants.canvas.resolution;
  this.snake.draw(this.ctx);
};

module.exports = Canvas;