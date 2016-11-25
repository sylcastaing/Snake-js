var constants = require('./constants');

function Part(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Draw Part on Canvas
 */
Part.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = constants.snake.color;
  ctx.arc(this.getXToResolution() + constants.canvas.resolution/2,
      this.getYToResolution() + constants.canvas.resolution/2,
      constants.canvas.radius,
      0,
      Math.PI * 2);
  ctx.fill();
  ctx.closePath();
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

module.exports = Part;