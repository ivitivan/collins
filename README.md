# collins

Collins English Dictionary asynchronous API for node.js

## Installing

`npm install collins`

## Useage

```js
var Collins = require('collins');
var serverName = 'api.collinsdictionary.com';
var accessKey = 'your access key';

var d = new Collins(serverName, accessKey);

/**
  * Get list of available dictionaries
  */
d.dictionaries(function(err, res, body) {
    console.log(body);
});

/**
  * Get a dictionary
  */
d.dictionary('english', function(err, res, body) {
    console.log(body);
});

/**
  * Search
  */
d.search('english', 'grape', 10, 1, function(err, res, body) {
    if (err) throw err;
    console.log(body);
});

/**
  * Get Did You Mean entries
  */
d.didYouMean('english', 'trape', 15, function(err, res, body) {
    if (err) throw err;
    console.log(body);
});

/**
  * Get the first/best matching entry
  */
d.first('english', 'grape', 'html', function(err, res, body) {
    var htmlToText = require('html-to-text');
    if (err) throw err;
    var s = htmlToText.fromString(JSON.parse(body).entryContent);
    console.log(s);
});

/**
  * Get an entry
  */
d.entry('english', 'the-grape_1', 'html', function(err, res, body) {
    var s = htmlToText.fromString(JSON.parse(body).entryContent);
    console.log(s);
});

/**
  * Get pronunciations
  */
d.pronunciation('english', 'grape_1', '', function(err, res, body) {
    console.log(body);
});

/**
 * Get nearby entries
 */
d.nearby('english', 'grape_1', 10, function(err, res, body) {
    console.log(body);
});
```

## Collins API

### c.dictionaries(callback)

### c.dictionary(dictionaryCode, callback)

### c.search(dictionaryCode, searchWord, pageSize, pageIndex, callback)

### c.didYouMean(dictionaryCode, searchWord, entryNumber, callback)

### c.first(dictionaryCode, searchWord, format, callback)
#### format = html, xml

### c.entry(dictionaryCode, entryId, format, callback)

### c.pronunciation(dictionaryCode, entryId, lang, callback)

### c.nearby(dictionaryCode, entryId, entryNumber, callback)
