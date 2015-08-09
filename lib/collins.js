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
	get_(pathname, query, callback) {
		console.log('query', query);
		if (arguments.length == 2) {
			callback = query;
			query = undefined;
		}
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
				pathname: 'api/v1' + pathname,
				query: query
			}),
			method: 'GET'
		};
		request(options, function(err, res, body) {
			if(callback) {
				if (err) return callback(err);
				try {
					var parsedBody = JSON.parse(body);
					return callback(null, parsedBody);
				} catch(error) {
					return callback(err);
				}
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

	/**
	 * Get a dictionary
	 * @access public
	 * @param {string} dictionaryCode The dictionary code.
	 * @param {requestCallback} callback Callback.
	 */
	dictionary(dictionaryCode, callback) {
		this.get_(`/dictionaries/${dictionaryCode}`, callback);
	}

	search(dictionaryCode, searchWord, pageSize, pageIndex, callback) {
		if (arguments.length == 3 || arguments.length == 4) {
			callback = arguments[arguments.length - 1];
		}
		this.get_(`/dictionaries/${dictionaryCode}/search/`, {
			q: searchWord,
			pagesize: pageSize,
			pageIndex: pageIndex
		}, callback);
	}

	/**
	 * Get Did You Mean entries
	 * @param {string} dictionaryCode - The dictionary code
	 * @param {string} searchWord - The word we are searching for
	 * @param {string} entryNumber - The number of Did you Mean results [optional, 10 by default, maximum allowed 10]
	 * @param {requestCallback} callback Callback.
	  */
	didYouMean(dictionaryCode, searchWord, entryNumber, callback) {
		if (arguments.length == 3) {
			callback = entryNumber;
			entryNumber = undefined;
		}
		this.get_(`/dictionaries/${dictionaryCode}/search/didyoumean/`, {q: searchWord, entryNumber}, callback);
	}

}
