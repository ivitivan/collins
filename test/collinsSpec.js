var expect = require('chai').expect;
var config = require('../_config');
var serverName = config.SERVER_NAME;
var accessKey = config.ACCESS_KEY;

describe('Collins', function() {
	var Collins, collins;
	beforeEach(function(done) {
		Collins = require('../dist/collins.js');
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

});
