var constants = require('./constants');
var Part = require('./part');
var Food = require('./food');

function Snake(ctx) {
  this.content = [];
  this.ctx = ctx;

  this.dx = 1;
  this.dy = 0;

  for (var i in constants.snake.content) {
    this.content.push(new Part(constants.snake.content[i].x, constants.snake.content[i].y, this.ctx));
  }

  this.generateFood();
}

Snake.prototype.contains = function(point) {
  var i = 0;
  var contains = false;
  
  while (!contains && i < this.content.length) {
    var part = this.content[i];

    contains = (part.x === point.x && part.y === point);

    i++;
  }

  return contains;
};

Snake.prototype.draw = function() {
  for (var i in this.content) {
    this.content[i].draw();
  }

  if (this.food.isOutOfCanvas()) {
    this.food.x = constants.canvas.width - 1;
  }

  this.food.draw();
};

Snake.prototype.move = function() {
  var newHead = new Part((this.content[0].x + this.dx + constants.canvas.width) % constants.canvas.width,
      (this.content[0].y + this.dy + constants.canvas.height) % constants.canvas.height,
      this.ctx);

  if (!newHead.isOnFood(this.food)) {
    var tail = this.content.pop();
    tail.clear();
  }
  else {
    this.food.clear();
    this.generateFood();
    this.food.draw();
  }

  this.content.unshift(newHead);
  newHead.draw();
};

Snake.prototype.generateFood = function() {
  var contains = true;

  while (contains) {
    this.food = new Food(this.ctx);
    contains = this.contains(this.food);
  }

  this.food.draw();
};

Snake.prototype.moveUp = function() {
  this.dx = 0;
  this.dy = -1;
};

Snake.prototype.moveDown = function() {
  this.dx = 0;
  this.dy = 1;
};

Snake.prototype.moveLeft = function() {
  this.dx = -1;
  this.dy = 0;
};

Snake.prototype.moveRight = function() {
  this.dx = 1;
  this.dy = 0;
};

module.exports = Snake;