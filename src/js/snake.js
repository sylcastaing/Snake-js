function Snake() {

  //Const
  this.SNAKE_DIV = document.getElementById('snake-div');
  this.SNAKE_CANVAS = document.getElementById('snake');

  if (this.SNAKE_DIV === undefined || this.SNAKE_CANVAS === undefined) {
    throw "No Snake Elements found";
  }

  this.FORM_SIZE = 20;

  this.WIDTH = 30;
  this.HEIGHT = 20;

  this.resize();
};

Snake.prototype.resize = function() {
  this.WIDTH = Math.floor(this.SNAKE_DIV.clientWidth / this.FORM_SIZE);
  this.SNAKE_CANVAS.height = this.HEIGHT * this.FORM_SIZE;
  this.SNAKE_CANVAS.width = this.WIDTH * this.FORM_SIZE;
};

module.exports = new Snake;