(function() {
  var gutil;

  gutil = require('gulp-util');
  var notify = require('gulp-notify');

  module.exports = function(error) {
    gutil.log([(error.name + ' in ' + error.plugin).bold.red, '', error.message, ''].join('\n'));
    if (gutil.env.beep) {
      gutil.beep();
    }
    return this.emit('end');
  };

}).call(this);
