var expect = require('chai').expect;
var config = require('../_config');
var serverName = config.SERVER_NAME;
var accessKey = config.ACCESS_KEY;

describe('Collins', function() {
	var Collins, collins;
	beforeEach(function(done) {
		Collins = require('../lib/collins.js');
		collins = new Collins(serverName, accessKey);
		done();
	});
	
	it('should get a list of available dictionaries', function(done) {
		collins.dictionaries(function(err, data) {
			if (err) return done(err);
			expect(data).to.be.a('array');
			done();
		});
	});

	it('should get a dictionary', function(done) {
		collins.dictionaries(function(err, data) {
			if (err) return done(err);
			var dict = data[0];
			console.log('code', data[0].dictionaryCode);
			collins.dictionary(data[0].dictionaryCode, function(err, data) {
				console.log('data', data);
				if (err) return done(err);
				expect(data).to.be.a('object');
				expect(data).to.equal(dict);
				done();
			});
		});
	})

});
