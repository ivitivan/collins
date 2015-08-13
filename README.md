# Collins

Collins English Dictionary asynchronous API for node.js

## Install

`npm install collins`

## Usage

```js
var Collins = require('collins');
var serverName = 'api.collinsdictionary.com';
var accessKey = 'your access key';

var d = new Collins(serverName, accessKey);

/**
  * Get list of available dictionaries
  */
d.dictionaries(function(err, data) {
    console.log(data);
});

/**
  * Get a dictionary
  */
d.dictionary('english', function(err, data) {
    console.log(data);
});

/**
  * Search
  */
d.search('english', 'grape', function(err, data) {
    console.log(data);
});

/**
  * Get Did You Mean entries
  */
d.didYouMean('english', 'trape', function(err, data) {
    console.log(data);
});

/**
  * Get the first/best matching entry
  */
d.first('english', 'grape', 'xml', function(err, data) {
    console.log(data);
});

/**
  * Get an entry
  */
d.entry('english', 'the-grape_1', 'xml', function(err, data) {
    console.log(data);
});

/**
  * Get pronunciations
  */
d.pronunciation('english', 'grape_1', function(err, data) {
    console.log(body);
});

/**
 * Get nearby entries
 */
d.nearby('english', 'grape_1', function(err, data) {
    console.log(body);
});
```

## Collins API

c.dictionaries(callback)

c.dictionary(dictionaryCode, callback)

c.search(dictionaryCode, searchWord, pageSize, pageIndex, callback)

c.didYouMean(dictionaryCode, searchWord, entryNumber, callback)

c.first(dictionaryCode, searchWord, format, callback)
format = html, xml

c.entry(dictionaryCode, entryId, format, callback)

c.pronunciation(dictionaryCode, entryId, lang, callback)

c.nearby(dictionaryCode, entryId, entryNumber, callback)

## License

MIT
