'use strict';
var request = require('request');
var url = require('url');

/**
 * @class
 * @param {string} serverName Base API URL.
 * @param {string} accessKey Access key.
 * @param {string} [requestHandler] Request handler.
 */
export default class Collins {
	constructor(serverName, accessKey) {
		this.serverName = serverName;
		this.apiBaseURL = url.format({protocol: 'https', host: serverName, pathname: 'api/v1'}); 
		this.accessKey = accessKey;
	}

	/**
	 * Make a get request
	 * @access private
	 * @param {string} pathname Requested pathname.
	 * @param {function} callback Callback.
	 */
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
	
	/**
	 * Get list of available dictionaries
	 * @access public
	 * @param {requestCallback} callback Callback.
	 */
	dictionaries(callback) {
		this.get_('/dictionaries', callback);
	}
}
