var Snake = require('./../snake');

function Score(div) {
  this.div = div;
  this.score = 0;
  this.init();
}

/**
 * Draw the score element
 */
Score.prototype.init = function() {
  var headerDiv = document.createElement('div');
  headerDiv.className = 'header';
  headerDiv.innerHTML = 'Score :';

  var scoreSpan = document.createElement('span');
  scoreSpan.className = 'score';
  scoreSpan.id = 'score';
  scoreSpan.innerHTML = this.score;

  headerDiv.appendChild(scoreSpan);

  this.div.insertBefore(headerDiv, this.div.firstChild);
};

/**
 * Increment the Score
 */
Score.prototype.increment = function() {
  this.score++;
  this.change();
};

/**
 * Change the Score on screen
 */
Score.prototype.change = function() {
  document.getElementById('score').innerHTML = this.score;
}


module.exports = Score;