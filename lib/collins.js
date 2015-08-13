'use strict';
Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request');
var url = require('url');

/**
 * @class
 * @param {string} serverName Base API URL.
 * @param {string} accessKey Access key.
 * @param {string} [requestHandler] Request handler.
 */

var Collins = (function () {
	function Collins(serverName, accessKey) {
		_classCallCheck(this, Collins);

		this.serverName = serverName;
		this.apiBaseURL = url.format({ protocol: 'https', host: serverName, pathname: 'api/v1' });
		this.accessKey = accessKey;
	}

	/**
  * Make a get request
  * @access private
  * @param {string} pathname Requested pathname.
  * @param {function} callback Callback.
  */

	_createClass(Collins, [{
		key: 'get_',
		value: function get_(pathname, query, callback) {
			if (arguments.length == 2) {
				callback = query;
				query = undefined;
			}
			for (var prop in query) {
				if (query[prop] == undefined) delete query[prop];
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
			request(options, function (err, res, body) {
				if (callback) {
					if (err) return callback(err);
					var parsedBody;
					try {
						parsedBody = JSON.parse(body);
					} catch (error) {
						return callback(error);
					}
					return callback(null, parsedBody);
				}
			});
		}

		/**
   * Get list of available dictionaries
   * @access public
   * @param {requestCallback} callback Callback.
   */
	}, {
		key: 'dictionaries',
		value: function dictionaries(callback) {
			this.get_('/dictionaries', callback);
		}

		/**
   * Get a dictionary
   * @access public
   * @param {string} dictionaryCode The dictionary code.
   * @param {requestCallback} callback Callback.
   */
	}, {
		key: 'dictionary',
		value: function dictionary(dictionaryCode, callback) {
			if (typeof dictionaryCode != 'string') throw TypeError('The first argument must be a string');
			this.get_('/dictionaries/' + dictionaryCode, callback);
		}

		/**
   * Search
   * @param {string} dictionaryCode The dictionary code.
   * @param {string} searchWord The word we are searching for.
   * @param {string} [pageSize] The number of results per page [optional, 10 by default, maximum allowed 100]
   * @param {string} [pageIndex] The index of the result page to return [optional, default = 1]
   * @param {requestCallback} callback Callback.
   */
	}, {
		key: 'search',
		value: function search(dictionaryCode, searchWord, pageSize, pageIndex, callback) {
			if (arguments.length < 2) {
				throw Error('Function takes at least two arguments');
			}
			if (arguments.length == 3) {
				pageSize = undefined;
				pageIndex = undefined;
				callback = arguments[arguments.length - 1];
			}
			if (arguments.length == 4) {
				pageIndex = undefined;
				callback = arguments[arguments.length - 1];
			}
			if (typeof dictionaryCode != 'string' || typeof searchWord != 'string') {
				throw TypeError('The first two arguments should be strings');
			}
			this.get_('/dictionaries/' + dictionaryCode + '/search/', {
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
	}, {
		key: 'didYouMean',
		value: function didYouMean(dictionaryCode, searchWord, entryNumber, callback) {
			if (arguments.length == 3) {
				callback = entryNumber;
				entryNumber = undefined;
			}
			this.get_('/dictionaries/' + dictionaryCode + '/search/didyoumean/', { q: searchWord, entryNumber: entryNumber }, callback);
		}

		/**
   * Get the first/best matching entry
   * @param {string} dictionaryCode - the dictionary code
   * @param {string} searchWord - the word we are searching for
   * @param {string} format - the format of the entry, either "html" or "xml" [optional; default = html]
   * @param {requestCallback} callback Callback.
   */
	}, {
		key: 'first',
		value: function first(dictionaryCode, searchWord, format, callback) {
			if (arguments.length == 3) {
				callback = format;
				format = undefined;
			}
			this.get_('/dictionaries/' + dictionaryCode + '/search/first/', { q: searchWord, format: format }, callback);
		}

		/**
    * Get an entry
   * @param {string} dictionaryCode - the dictionary code
   * @param {string} entryId - the id of the entry
   * @param {string} format - the format of the entry, either "html" or "xml" [optional; default = html]
   * @param {requestCallback} callback Callback.
    */
	}, {
		key: 'entry',
		value: function entry(dictionaryCode, entryId, format, callback) {
			if (arguments.length == 3) {
				callback = format;
				format = undefined;
			}
			this.get_('/dictionaries/' + dictionaryCode + '/entries/' + entryId, { format: format }, callback);
		}

		/**
    * Get pronunciations
   * @param {string} dictionaryCode - the dictionary code
   * @param {string} entryId - the id of the entry
   * @param {string} lang [optional; default = all available pronunciation languages]
   * @param {requestCallback} callback Callback.
    */
	}, {
		key: 'pronunciation',
		value: function pronunciation(dictionaryCode, entryId, lang, callback) {
			if (arguments.length == 3) {
				callback = lang;
				lang = undefined;
			}
			this.get_('/dictionaries/' + dictionaryCode + '/entries/' + entryId + '/pronunciations', { lang: lang }, callback);
		}

		/**
    * Get nearby entries
   * @param {string} dictionaryCode - the dictionary code
   * @param {string} entryId - the id of the entry
   * @param {string} entryNumber - the number of results preceding/following the given entry [optional, 10 by default, maximum allowed 50]
   * @param {requestCallback} callback Callback.
    */
	}, {
		key: 'nearby',
		value: function nearby(dictionaryCode, entryId, entryNumber, callback) {
			if (arguments.length == 3) {
				callback = entryNumber;
				entryNumber = undefined;
			}
			this.get_('/dictionaries/' + dictionaryCode + '/entries/' + entryId + '/nearbyentries', { entryNumber: entryNumber }, callback);
		}
	}]);

	return Collins;
})();

exports['default'] = Collins;
module.exports = exports['default'];