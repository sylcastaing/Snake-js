var constants = require('./constants');

function Food(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Draw the food on canvas
 */
Food.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = constants.food.color;
  ctx.rect(this.getXToResolution(),
    this.getYToResolution(),
    constants.canvas.resolution,
    constants.canvas.resolution);
  ctx.fill();
  ctx.closePath();
};

/**
 * Return X to canvas resolution
 */
Food.prototype.getXToResolution = function() {
  return this.x * constants.canvas.resolution;
};

/**
 * Return Y to canvas resolution
 */
Food.prototype.getYToResolution = function() {
  return this.y * constants.canvas.resolution;
};

module.exports = Food;