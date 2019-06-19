var Pinger = require('./Pinger.js');
var Clocker = require('./Clocker.js');

var Cookie = 'PHPSESSID=iiffnmpkpcltraia3bqfa7d8t6',
    sdate = '2019-06-23',
    startTime = '11:24',
    startTimeRange = [-1, 1],

    loopTimes = 'infinity',//请求次数'infinity'为无限请求
    rps = 1000;//每秒请求次数

var test = new Pinger({
    url: 'http://localhost:1101',
    headers: {
        Cookie
    },
    form: {

    }
});

var saveClass = new Pinger({
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
});

var getTeacher = new Pinger({
    url: 'http://duyc.jxoaxt.com/order/getteacherbyexam',
    headers: {
        Cookie
    },
    form: {
        exam: 3,
        page: 1
    }
});

new Clocker({
    time: startTime,
    range: startTimeRange,
    start(run) {
        console.log('+ clocker is starting pinging');
        run({
            rps,
            times: loopTimes,
            callback(index) {
                // test.action();
                console.log(index);
            }
        })
    },
    end(stop) {
        stop();
        console.log('- clocker is stopping pinging');
    }
});
