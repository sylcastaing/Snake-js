var constants = require('./constants');

function Part(x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
}

/**
 * Draw Part on Canvas
 */
Part.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.fillStyle = constants.snake.color;
  this.ctx.arc(this.getXToResolution() + constants.canvas.resolution/2,
      this.getYToResolution() + constants.canvas.resolution/2,
      constants.canvas.radius,
      0,
      Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();
};

/**
 * Remove Part from Canvas
 */
Part.prototype.clear = function() {
  this.ctx.beginPath();
  this.ctx.fillStyle = constants.canvas.color;
  this.ctx.rect(this.getXToResolution(),
      this.getYToResolution(),
      constants.canvas.resolution,
      constants.canvas.resolution);
  this.ctx.fill();
  this.ctx.closePath();
};

/**
 * Return X to canvas resolution
 */
Part.prototype.getXToResolution = function() {
  return this.x * constants.canvas.resolution;
};

/**
 * Return Y to canvas resolution
 */
Part.prototype.getYToResolution = function() {
  return this.y * constants.canvas.resolution;
};

Part.prototype.isOnFood = function(food) {
  return this.x === food.x && this.y === food.y; 
};

module.exports = Part;