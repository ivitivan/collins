'use strict';
var expect = require('chai').expect;
var config = require('./_config');
var serverName = config.SERVER_NAME;
var accessKey = config.ACCESS_KEY;

describe('Collins', function() {
	var Collins, collins;
	var dictionaryCode;

	beforeEach(function(done) {
		Collins = require('./../lib/collins.js');
		collins = new Collins(serverName, accessKey);
		done();
	});

	describe.skip('#get_', function() {
		it('should work with optional parameters', function(done) {
			collins.get_('/dictionaries');
			collins.get_('')
		})
	});
	
	describe.skip('#dictionaries', function() {
		it('should get a list of available dictionaries', function(done) {
			collins.dictionaries(function(err, data) {
				if (err) return done(err);
				expect(data).to.be.a('array');
				dictionaryCode = data[0].dictionaryCode;
				done();
			});
		});
	});

	describe.skip('#dictionary', function() {

		it('should get a dictionary', function(done) {
			collins.dictionaries(function(err, data) {
				if (err) return done(err);
				var dict = data[0];
				collins.dictionary(data[0].dictionaryCode, function(err, data) {
					if (err) return done(err);
					expect(data).to.be.a('object');
					expect(data).to.deep.equal(dict);
					done();
				});
			});
		});

		it('the first argument should be a string', function() {
			expect(collins.dictionary(function() {})).to.throw(TypeError);
		});

	});

	describe('#search', function() {
		beforeEach(function(done) {
			if (!dictionaryCode) {
				collins.dictionaries(function(err, data) {
					if (err) return done(err);
					expect(data).to.be.a('array');
					dictionaryCode = data[0].dictionaryCode;
					done();
				});
			} else {
				done();
			}
		});

		it('should search', function(done) {
			collins.search(dictionaryCode, 'wood', 10, 1, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.a('object');
				done();
			});
		});


		it('shouldnt fall without optional parameters', function(done) {
			collins.search(dictionaryCode, 'book', function(err, data) {
				if(err) return done(err);
				expect(data).to.be.a('object');
				expect(data.errorCode).to.equal(undefined);
				expect(data.errorMessage).to.equal(undefined);
				done();
			});
		});

		it('shouldnt fall without optional parameters (1 parameter included)', function(done) {
			collins.search(dictionaryCode, 'book', 10, function(err, data) {
				if(err) return done(err);
				expect(data).to.be.a('object');
				done();
			});
		});

		it('first two arguments must be strings', function() {
			expect(collins.search.bind(collins, function() {}, 'banana')).to.throw(Error);
			expect(collins.search.bind(collins, dictionaryCode, function() {})).to.throw(Error);
		});

		it('should take at least two arguments', function() {
			expect(collins.search.bind(collins, 'english')).throw(Error);
		});

	});

	describe.skip('#didYouMean', function() {
		it('should return an object', function(done) {
			collins.didYouMean(dictionaryCode, 'grrape', 10, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			}); 
		});
		
		it('should run without the optional parameter', function(done) {
			collins.didYouMean(dictionaryCode, 'grrape', function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			}); 
		});

	});

	describe.skip('#first', function() {
		it('should return an object', function(done) {
			collins.first(dictionaryCode, 'computer', 'html', function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});

		it('should run without an optional parameter', function(done) {
			collins.first(dictionaryCode, 'book', function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});
	});

	describe.skip('#entry', function() {
		var entryId = 'the-grape_1';
		var format = 'html';

		it('should return an object', function(done) {
			collins.entry(dictionaryCode, entryId, format, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});


		it('should run without an optional parameter', function(done) {
			collins.entry(dictionaryCode, entryId, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});
	})

	describe.skip('#pronunciation', function() {
		var entryId = 'the-grape_1';
		var lang = 'en';

		it('should return an object', function(done) {
			collins.pronunciation(dictionaryCode, entryId, lang, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});


		it('should run without an optional parameter', function(done) {
			collins.pronunciation(dictionaryCode, entryId, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});
	})

	describe('#nearby', function() {
		var entryId = 'the-grape_1';
		var entryNumber = 10;

		it('should return an object', function(done) {
			collins.nearby(dictionaryCode, entryId, entryNumber, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});


		it('should run without an optional parameter', function(done) {
			collins.nearby(dictionaryCode, entryId, function(err, data) {
				if (err) return done(err);
				expect(data).to.be.an('object');
				done();
			});
		});
	})

});
