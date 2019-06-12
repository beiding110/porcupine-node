var log4js = require("log4js");
var log4js_config = require("./config.json");

log4js.configure(log4js_config);
console.log("log_start start!");

var LogFile = log4js.getLogger('log_file');

module.exports = LogFile

// LogFile.trace('This is a Log4js-Test');
// LogFile.debug('We Write Logs with log4js');
// LogFile.info('You can find logs-files in the log-dir');
// LogFile.warn('log-dir is a configuration-item in the log4js.json');
// LogFile.error('In This Test log-dir is : \'./logs/log_test/\'');

/*var dateFile = log4js.getLogger('log_date');
dateFile.info("This is console data1");
dateFile.info("This is console data2");
dateFile.info("This is console data3");*/
