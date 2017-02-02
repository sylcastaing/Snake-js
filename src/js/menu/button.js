function Button(snake, div) {
  this.div = div;

  this.init();
}

Button.prototype.init = function() {
  var button = document.createElement('div');
  button.className = 'button';

  button.style.position = 'absolute';
  button.style.top = '50%';
  button.style.left = '0';
  button.style.right = '0';
  button.style.marginLeft = 'auto';
  button.style.marginRight = 'auto';
  button.style.marginTop = '-34px';
  button.style.width = '100px';
  button.style.height = '100px';
  button.style.border = '1px solid #ddd';
  button.style.borderRadius = '2px';
  button.style.cursor = 'pointer';


  this.div.appendChild(button);
};

module.exports = Button;