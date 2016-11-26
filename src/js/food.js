var constants = require('./constants');

function Food(ctx) {
  this.x = Math.floor(Math.random() * constants.canvas.width);
  this.y = Math.floor(Math.random() * constants.canvas.height);
  this.ctx = ctx;
}

/**
 * Draw the food on canvas
 */
Food.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.fillStyle = constants.food.color;
  this.ctx.rect(this.getXToResolution(),
    this.getYToResolution(),
    constants.canvas.resolution,
    constants.canvas.resolution);
  this.ctx.fill();
  this.ctx.closePath();
};

Food.prototype.clear = function() {
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
Food.prototype.getXToResolution = function() {
  return this.x * constants.canvas.resolution;
};

/**
 * Return Y to canvas resolution
 */
Food.prototype.getYToResolution = function() {
  return this.y * constants.canvas.resolution;
};

Food.prototype.isOutOfCanvas = function() {
  return this.x >= constants.canvas.width;
};

module.exports = Food;