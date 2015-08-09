var expect = require('chai').expect;
var config = require('../_config');
var serverName = config.SERVER_NAME;
var accessKey = config.ACCESS_KEY;

describe('Collins', function() {
	var Collins, collins;
	var dictionaryCode;

	beforeEach(function(done) {
		Collins = require('../dist/collins.js');
		collins = new Collins(serverName, accessKey);
		done();
	});

	describe.skip('#get_', function() {
		it('should work with optional parameters', function(done) {
			collins.get_('/dictionaries');
			collins.get_('')
		})
	});
	
	it('should get a list of available dictionaries', function(done) {
		collins.dictionaries(function(err, data) {
			if (err) return done(err);
			expect(data).to.be.a('array');
			dictionaryCode = data[0].dictionaryCode;
			done();
		});
	});

	it('should get a dictionary', function(done) {
		collins.dictionaries(function(err, data) {
			if (err) return done(err);
			var dict = data[0];
			collins.dictionary(data[0].dictionaryCode, function(err, data) {
				debugger;
				if (err) return done(err);
				expect(data).to.be.a('object');
				expect(data).to.deep.equal(dict);
				done();
			});
		});
	});

	describe('#search', function() {
		beforeEach(function(done) {
			if (!dictionaryCode) {
				collins.dictionaries(function(err, data) {
					if (err) return done(err);
					expect(data).to.be.a('array');
					dictionaryCode = 'dictionaryCode', data[0].dictionaryCode;
					done();
				});
			}
			done();
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
	});

});
