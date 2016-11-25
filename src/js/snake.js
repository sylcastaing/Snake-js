var Snake = function() {

  //Const
  this.SNAKE_DIV = document.getElementById('snake-div');
  this.SNAKE_CANVAS = document.getElementById('snake');

  if (this.SNAKE_DIV === undefined || this.SNAKE_CANVAS === undefined) {
    throw "No Snake Elements found";
  }

  this.FORM_SIZE = 20;
};

Snake.prototype.resize = function() {
  
  
};

Snake.prototype.init = function() {

};

module.exports = Snake;