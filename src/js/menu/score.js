var Record = require('../storage/record'); 

/**
 * Constructor
 */
function Score(div) {
  this.div = div;
  this.score = 0;
  this.Record = new Record();

  this.init();
}

/**
 * Draw the score element
 */
Score.prototype.init = function() {
  var headerDiv = document.createElement('div');
  headerDiv.className = 'header';

  var scoreDiv = document.createElement('div');
  scoreDiv.className = 'score';
  scoreDiv.innerHTML = 'Score :';

  var scoreSpan = document.createElement('span');
  scoreSpan.id = 'score-value';
  scoreSpan.innerHTML = this.score;

  scoreDiv.appendChild(scoreSpan);

  var recordDiv = document.createElement('div');
  recordDiv.className = 'record';
  recordDiv.innerHTML = 'Record :';

  var recordSpan = document.createElement('span');
  recordSpan.id = 'record-value';
  recordSpan.innerHTML = this.Record.value;

  recordDiv.appendChild(recordSpan);

  headerDiv.appendChild(scoreDiv);
  headerDiv.appendChild(recordDiv);

  this.div.insertBefore(headerDiv, this.div.firstChild);
};

/**
 * Increment the Score
 */
Score.prototype.increment = function() {
  this.score++;
  this.Record.update(this.score);
  this.change();
};

/**
 * Change the Score on screen
 */
Score.prototype.change = function() {
  document.getElementById('score-value').innerHTML = this.score;
  document.getElementById('record-value').innerHTML = this.Record.value;
};

module.exports = Score;