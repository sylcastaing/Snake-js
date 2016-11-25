var constants = require('./constants');
var Part = require('./part');

function Snake() {
  this.content = [];

  for (var i in constants.snake.content) {
    this.content.push(new Part(constants.snake.content[i].x, constants.snake.content[i].y));
  }
}

Snake.prototype.contains = function(point) {
  var i = 0;
  var contains = false;
  
  while (!contains && i < this.content.length) {
    var snakePoint = this.content[i];

    contains = (snakePoint.x === point.x && snakePoint.y === point);

    i++;
  }

  return contains;
};

Snake.prototype.draw = function(ctx) {
  for (var i in this.content) {
    this.content[i].draw(ctx);
  }
};

module.exports = Snake;