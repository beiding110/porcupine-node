var qs = require('querystring');
const logger = require('../log');
var request = require('request');

function Pinger(obj) {
    this.init(obj);
};

Pinger.prototype = {
    init: function(obj) {
        this.$settings = obj;
    },
    action: function() {
        var ts = new Date().getTime(),
            cloneObj = JSON.parse(JSON.stringify(this.$settings));
            url = this.$settings.url;

        url = /\?/.test(url) ? url + '&ts=' + ts : url + '?ts=' + ts;
        cloneObj.url = url;

        request.post(cloneObj, (error, response, body) => {
            logger.info('BODY: ' + body + `( ${JSON.stringify(cloneObj)} )`);
            if (!error && response.statusCode == 200) {}
        });
    }
}

module.exports = Pinger;
