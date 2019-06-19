var Pinger = require('./Pinger.js');
var Clocker = require('./Clocker.js');

var Cookie = 'PHPSESSID=iiffnmpkpcltraia3bqfa7d8t6',
    sdate = '2019-06-23',

    loopTimes = 5,//请求次数'infinity'为无限请求
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
    time: '22:40',
    range: [-1, 1],
    callback() {
        console.log('clocker!');
    }
})

function run() {
    var si = setInterval(function() {

        // test.action();
        // saveClass.action();
        // getTeacher.action();

        if(loopTimes !== 'infinity') {
            loopTimes --;
            if(!loopTimes) {
                clearInterval(si);
            };
        }
    }, 1000 / rps);
};

run();
