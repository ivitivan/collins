var config = require('../_config');
var serverName = config.SERVER_NAME;
var accessKey = config.ACCESS_KEY;
var Collins = require('../dist/collins.js');
var d = new Collins(serverName, accessKey);

/** d.dictionaries(function(err, data) { */
    /** console.log(data); */
/** }); */

/** d.dictionaries(); */

//d.dictionary('adfjsdf', function(err, body) {
	//console.log(err, body);
//});

//d.search('english', 'grape', 10, 1, function(err, body) { 
	//if (err) throw err; 
	//console.log(body); 
//}); 

//d.didYouMean('english', 'trape', 15, function(err, body) { 
	//if (err) throw err; 
	//console.log(body); 
//}); 
/** d.first('english', 'grape', 'html', function(err, res, body) { */
    /** var htmlToText = require('html-to-text'); */
    /** if (err) throw err; */
    /** var s = htmlToText.fromString(JSON.parse(body).entryContent); */
    /** console.log(s); */
/** }); */

d.entry('english', 'the-grape_1', 'html', function(err, body) { 
	console.log(body); 
}); 

/** d.pronunciation('english', 'grape_1', '', function(err, res, body) { */
    /** console.log(body); */
/** }); */

/** d.nearby('english', 'grape_1', 10, function(err, res, body) { */
    /** console.log(body); */
/** }); */
