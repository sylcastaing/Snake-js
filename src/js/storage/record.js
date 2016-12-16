var constants = require('../constants');

/**
 * Constructor
 */
function Record() {
  this.value = 0;

  var storageValue = localStorage.getItem(constants.storage.key);
  if (storageValue !== null) {
    this.value = storageValue;
  }
}

/**
 * Update record on localStorage
 */
Record.prototype.update = function(newValue) {
  if (this.value < newValue) {
    this.value = newValue;
    localStorage.setItem(constants.storage.key, newValue);
  }
};

module.exports = Record;