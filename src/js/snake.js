var constants = require('./constants');
var Part = require('./part');
var Food = require('./food');
var Swipe = require('./swipe');

/**
 * Constructor
 * 
 * @param {any} ctx
 */
function Snake(canvas, ctx, score) {

  // Array of snake parts
  this.content = [];

  // Canvas context
  this.canvas = canvas;
  this.ctx = ctx;

  this.score = score;
  this.button = null;

  this.swipe = new Swipe(this.canvas, this);
}

Snake.prototype.init = function() {
  this.canvas.clear();

  // Horizontal and vertical direction of the snake
  this.dx = 1;
  this.dy = 0;

  this.score.reset();

  this.content = [];
  // Init the snake content
  for (var i in constants.snake.content) {
    this.content.push(new Part(constants.snake.content[i].x, constants.snake.content[i].y, this.ctx));
  }

  // Generation of the food on init
  this.generateFood();

  this.draw();

  // Start animation
  this.animate();
};

/**
 * Return true is the point isContains on the snake
 */
Snake.prototype.contains = function(point) {
  var i = 0;
  var contains = false;
  
  while (!contains && i < this.content.length) {
    var part = this.content[i];

    contains = (part.x === point.x && part.y === point.y);

    i++;
  }

  return contains;
};

/**
 * Draw the snake on canvas
 */
Snake.prototype.draw = function() {

  // Draw each parts
  for (var i in this.content) {
    this.content[i].draw();
  }

  // Place the food on canvas it's outside
  if (this.food.isOutOfCanvas()) {
    this.food.x = constants.canvas.width - 1;
  }

  // Draw the food
  this.food.draw();
};

Snake.prototype.animate = function() {
  var snake = this;

  this.loop = setInterval(function() {
    snake.move();
  }, constants.animations.speed);
};

/**
 * Move the snake
 */
Snake.prototype.move = function() {

  // Generate new head
  var newHead = new Part((this.content[0].x + this.dx + constants.canvas.width) % constants.canvas.width,
      (this.content[0].y + this.dy + constants.canvas.height) % constants.canvas.height,
      this.ctx);
  
  // If newHead is not on food
  if (!newHead.isOnFood(this.food)) {

    // Stop animation if newHead is on snake
    if (this.contains(newHead)) {
      clearInterval(this.loop);
      this.button.show();
    }
    // Move
    else {
      var tail = this.content.pop();
      tail.clear();
    }
  }
  else {
    this.score.increment();
    this.food.clear();
    this.generateFood();
    this.food.draw();
  }

  this.content.unshift(newHead);
  newHead.draw();
};

/**
 * Generate food on canvas
 */
Snake.prototype.generateFood = function() {
  var contains = true;

  // Generate another food while the food is on snake
  while (contains) {
    this.food = new Food(this.ctx);
    contains = this.contains(this.food);
  }

  // Draw the food
  this.food.draw();
};

/**
 * Move the snake up
 */
Snake.prototype.moveUp = function() {
  this.dx = 0;
  this.dy = -1;
};

/**
 * Move the snake down
 */
Snake.prototype.moveDown = function() {
  this.dx = 0;
  this.dy = 1;
};

/**
 * Move the snake left
 */
Snake.prototype.moveLeft = function() {
  this.dx = -1;
  this.dy = 0;
};

/**
 * Move the snake right
 */
Snake.prototype.moveRight = function() {
  this.dx = 1;
  this.dy = 0;
};

/**
 * setButton
 */
Snake.prototype.setButton = function(button) {
  this.button = button;
};

module.exports = Snake;