'use strict';

var https = require('https');
var url = require('url');
var request = require('request');

var Collins = function(serverName, accessKey, requestHandler) {
    this.serverName = serverName;
    this.accessKey = accessKey;
    this.apiBaseURL = 'https://' + serverName + '/api/v1/';
    this.requestHandler = requestHandler || {
        request: function(options, callback) {
            request(options, callback);
        }
    }
}

Collins.prototype = {
    /**
     * Prepare request data
     */
    requestData: function(pathname, query) {
        var headers = {
            'Host': this.serverName,
            'accessKey': this.accessKey,
            'Content-Type': 'application/json'
        };
        return {
            headers: headers,
            url: url.format({
                protocol: 'https',
                host: this.serverName,
                pathname: 'api/v1/' + pathname,
                query: query
            }),
            method: 'GET'
        };
    },

    /**
     * Make a get request
     */
    get: function(options, callback) {
        this.requestHandler.request(options, callback);
    },

    /**
     * Get list of available dictionaries
     */
    dictionaries: function(callback) {
        var sentData = this.requestData('dictionaries/');
        this.get(sentData, callback);
    },

    /**
     * Get a dictionary
     */
    dictionary: function(dictionaryCode, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode);
        this.get(sentData, callback);
    },

    /**
     * Search
     */
    search: function(dictionaryCode, searchWord, pageSize, pageIndex, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/search/', {
            q: searchWord,
            pagesize: pageSize,
            pageindex: pageIndex
        });
        this.get(sentData, callback);
    },

    /**
     * Get Did You Mean entries
     */
    didYouMean: function(dictionaryCode, searchWord, entryNumber, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/search/didyoumean/', {
            q: searchWord,
            entrynumber: entryNumber
        });
        this.get(sentData, callback);
    },

    /**
     * Get the first/best matching entry
     */
    first: function(dictionaryCode, searchWord, format, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/search/first/', {
            q: searchWord,
            format: format
        });
        this.get(sentData, callback);
    },

    /**
     * Get an entry
     */
    entry: function(dictionaryCode, entryId, format, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/entries/' + entryId, {
            format: format
        });
        this.get(sentData, callback);
    },

    /**
     * Get pronunciations
     */
    pronunciation: function(dictionaryCode, entryId, lang, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/entries/' + entryId + '/pronunciations', {
            lang: lang
        });
        this.get(sentData, callback);
    },

    /**
     * Get nearby entries
     */
    nearby: function(dictionaryCode, entryId, entryNumber, callback) {
        var sentData = this.requestData('dictionaries/' + dictionaryCode + '/entries/' + entryId + '/nearbyentries', {
            entrynumber: entryNumber
        });
        this.get(sentData, callback);
    }
}

module.exports = Collins;
