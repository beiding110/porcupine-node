var http = require('http');
var qs = require('querystring');
const logger = require('../log');
var request = require('request');

var Cookie = 'PHPSESSID=iiffnmpkpcltraia3bqfa7d8t6',
    sdate = '2019-06-23',

    loopTimes = 5,//请求次数'infinity'为无限请求
    rps = 1000;//每秒请求次数

function getTeacher() {
    request.post({
        url: 'http://duyc.jxoaxt.com/order/getteacherbyexam',
        headers: {
            Cookie
        },
        form: {
            exam: 3,
            page: 1
        }
    }, function(error, response, body) {
        logger.info('BODY: ' + body);
        if (!error && response.statusCode == 200) {}
    });
};

function saveClass() {
    request.post({
        url: 'http://duyc.jxoaxt.com/order/save',
        headers: {
            Cookie
        },
        form: {
            teacherid:'3',
            sdate,
            time:'5',
            exam:'3'
        }
    }, function(error, response, body) {
        logger.info('BODY: ' + body);
        if (!error && response.statusCode == 200) {}
    });
};

function run() {
    var si = setInterval(function() {

        saveClass();

        if(loopTimes !== 'infinity') {
            loopTimes --;
            if(!loopTimes) {
                clearInterval(si);
            };
        }
    }, 1000 / rps);
};

// run();
