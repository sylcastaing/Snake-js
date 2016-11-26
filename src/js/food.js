var constants = require('./constants');

/**
 * Constructor
 * 
 * @param {any} ctx
 */
function Food(ctx) {

  // Generate Coords on canvas
  this.x = Math.floor(Math.random() * constants.canvas.width);
  this.y = Math.floor(Math.random() * constants.canvas.height);

  // Ctx of canvas
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

/**
 * Clear the food from canvas
 */
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

/**
 * Return true if the food is out of canvas
 */
Food.prototype.isOutOfCanvas = function() {
  return this.x >= constants.canvas.width;
};

module.exports = Food;