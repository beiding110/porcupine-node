var qs = require('querystring');
const logger = require('../log');
var request = require('request');

function Pinger(obj) {
    this.init(obj);
};

Pinger.prototype = {
    init: function(obj) {
        this.ajax = function() {
            request.post(obj, function(error, response, body) {
                logger.info('BODY: ' + body + `( ${JSON.stringify(obj)} )`);
                if (!error && response.statusCode == 200) {}
            });
        };
    },
    action: function() {
        this.ajax();
    }
}

module.exports = Pinger;
