function Button(snake, div) {
  this.snake = snake;
  this.div = div;

  this.button = null;

  this.init();

  this.snake.setButton(this);
}

/**
 * Init the button
 */
Button.prototype.init = function() {
  this.button = document.createElement('div');
  this.button.className = 'button';

  this.button.style.position = 'absolute';
  this.button.style.top = '50%';
  this.button.style.left = '0';
  this.button.style.right = '0';
  this.button.style.marginLeft = 'auto';
  this.button.style.marginRight = 'auto';
  this.button.style.marginTop = '-34px';
  this.button.style.width = '100px';
  this.button.style.height = '100px';
  this.button.style.backgroundColor = '#fff';
  this.button.style.border = '1px solid #ddd';
  this.button.style.borderRadius = '2px';
  this.button.style.cursor = 'pointer';

  var snake = this.snake;
  this.button.onclick = function() {
    this.style.display = 'none';
    snake.init();
  };

  this.div.appendChild(this.button);
};

/**
 * Show the button after die
 */
Button.prototype.show = function() {
  this.button.style.display = 'block';
};

module.exports = Button;