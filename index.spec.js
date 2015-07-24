'use strict';

var sinon = require('sinon');
var chai = require('chai');
var bmRandom = require('./');

var sandbox;
var expect = chai.expect;

var eps = 0.0000000001;

var randomReturnsMinimum = function() {
  sandbox.stub(Math, 'random').returns(0);
};

var randomReturnsMaximum = function() {
  sandbox.stub(Math, 'random').returns(1 - eps);
};

var isMultipleOf = function(multiple, ofWhat) {
  return multiple % ofWhat < eps || multiple % ofWhat > ofWhat - eps;

};


beforeEach(function() {
  sandbox = sinon.sandbox.create();
});


afterEach(function() {
  sandbox.restore();
});


describe('bm-random', function() {

  describe('#fromArray', function() {

    var array;

    beforeEach(function() {
      array = ['one', 'two', 'three', 'four'];
    });


    it('returns undefined if an empty array is given', function() {
      var result = bmRandom.fromArray([]);
      expect(result).to.be.undefined;
    });


    it('returns a random element of the given array', function() {
      var result = bmRandom.fromArray(array);
      expect(array.indexOf(result)).to.be.at.least(0);
    });


    it('returns the first element if random returns minimum', function() {
      randomReturnsMinimum();
      var result = bmRandom.fromArray(array);
      expect(result).to.eql(array[0]);
    });


    it('returns the last element if random returns maximum', function() {
      randomReturnsMaximum();
      var result = bmRandom.fromArray(array);
      expect(result).to.eql(array[array.length - 1]);
    });

  });


  describe('#fromRange', function() {

    var min = -10.5;
    var max = 20.5;

    it('returns the minimum if maximum equals minimum', function() {
      var result = bmRandom.fromRange(min, min);
      expect(result).to.eql(min);
    });


    it('uses 1 as step if step is not provided', function() {
      var result = bmRandom.fromRange(min, max);
      expect(isMultipleOf(result - min, 1)).to.be.true;
    });


    it('uses the given step if it is provided', function() {
      var step = 0.1;
      var result = bmRandom.fromRange(min, max, step);
      expect(isMultipleOf(result - 10, step)).to.be.true;
    });


    it('returns the minimum if random returns minimum', function() {
      randomReturnsMinimum();
      var result = bmRandom.fromRange(min, max);
      expect(result).to.eql(min);
    });


    it('returns the maximum if random returns maximum', function() {
      randomReturnsMaximum();
      var result = bmRandom.fromRange(min, max);
      expect(result).to.eql(max);
    });

  });


  describe('#neutral', function() {

    var max = 10;


    it('returns a neutral number that is lesser than the given number', function() {
      var result = bmRandom.neutral(max);
      expect(result).to.be.within(0, max);
      expect(isMultipleOf(result, 1)).to.be.true;
    });


    it('returns 0 if random returns minimum', function() {
      randomReturnsMinimum();
      var result = bmRandom.neutral(max);
      expect(result).to.eql(0);
    });


    it('returns the given number - 1 if random returns maximum', function() {
      randomReturnsMaximum();
      var result = bmRandom.neutral(max);
      expect(result).to.eql(max - 1);
    });

  });

});
