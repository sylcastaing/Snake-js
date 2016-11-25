var Canvas = require('./canvas');

var canvas = new Canvas();

window.onresize = function() {
  canvas.resize();
};