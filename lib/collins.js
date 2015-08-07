'use strict';
var request = require('request');
var url = require('url');

export default class Collins {
	constructor(serverName, accessKey) {
		this.serverName = serverName;
		this.apiBaseURL = url.format({protocol: 'https', host: serverName, pathname: 'api/v1'}); 
		this.accessKey = accessKey;
	}

	get_(pathname, callback) {
		var collins = this;
		var options = {
			headers: {
				'Host': collins.serverName,
				'accessKey': collins.accessKey,
				'Content-Type': 'application/json'
			},
			url: url.format({
				protocol: 'https',
				host: collins.serverName,
				pathname: 'api/v1' + pathname
			}),
			method: 'GET'
		};
		request(options, function(err, res, body) {
			if (err) return callback(err);
			try {
				var parsedBody = JSON.parse(body);
				return callback(null, parsedBody);
			} catch(error) {
				return callback(err);
			}
		});
	}
	
	dictionaries(callback) {
		this.get_('/dictionaries', callback);
	}
}
