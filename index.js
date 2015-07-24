'use strict';


function randomNeutral(length) {
  if (length <= 0) return undefined;
  return Math.floor(Math.random() * length);
}


function fromArray(array) {
  return array[randomNeutral(array.length)];
}


function fromRange(min, max, step) {
  var params = _parseFromRangeParams(min, max, step);
  return params.min + (randomNeutral((params.max - params.min) / params.step + 1) * params.step);
}


function _parseFromRangeParams(min, max, step) {
  var params;
  if (typeof min === 'object') {
    params = min;
  } else {
    params = { min: min, max: max, step: step };
  }
  if (!params.step) params.step = 1;
  return params;
}


module.exports = {
  fromArray: fromArray,
  fromRange: fromRange,
  neutral: randomNeutral
};
