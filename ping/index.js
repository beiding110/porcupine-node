var http = require('http');
var qs = require('querystring');
const logger = require('../log');
var request = require('request');

request.post({
    url: 'http://duyc.jxoaxt.com/order/getteacherbyexam',
    headers: {
        Cookie: 'PHPSESSID=m42ebqsgt2i1keaqq9tp0iko61'
    },
    form: {
        exam: 3,
        page: 1
    }
}, function(error, response, body) {
    logger.info('BODY: ' + body);
    if (!error && response.statusCode == 200) {}
});
