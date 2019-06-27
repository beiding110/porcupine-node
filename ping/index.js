var Pinger = require('./Pinger.js');
var Clocker = require('./Clocker.js');

require('./auto-login.js');

var Cookie = 'PPHPSESSID=iiffnmpkpcltraia3bqfa7d8t6',
    sdate = '2019-06-30',       //上课时间
    startTime = '18:16',        //脚本启动时刻
    startTimeRange = [-3, 3],   //脚本启动时间范围

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
        time:'13',
        exam:'3'
    }
});

var saveClass2 = new Pinger({
    url: 'http://duyc.jxoaxt.com/order/save',
    headers: {
        Cookie
    },
    form: {
        teacherid:'3',
        sdate,
        time:'14',
        exam:'3'
    }
});

var getTeacher = new Pinger({
    url: 'http://duyc.jxoaxt.com/order/getteacherbyexam',
    headers: {
        Cookie,
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
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
                //
                // getTeacher.action();

                saveClass.action();
                saveClass2.action();

                console.log(index);
            }
        })
    },
    end(stop) {
        stop();
        console.log('- clocker is stopping pinging');
    }
});
