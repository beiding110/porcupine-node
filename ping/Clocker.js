function Clocker(obj) {
    this.init(obj);
};

Clocker.prototype = {
    init: function(obj) {
        this.$settings = obj;
        this.$startRunned = false;
        this.$endRunned = false;

        var time = obj.time;
        var hh = time.split(':')[0] || '0',
            mm = time.split(':')[1] || '0',
            ss = time.split(':')[2] || '0';

        hh = Number(hh);
        mm = Number(mm);
        ss = Number(ss);

        this.$time = new Date();
        this.$time.setHours(hh);
        this.$time.setMinutes(mm);
        this.$time.setSeconds(ss);

        this.$tergetTime = this.$time.getTime();

        if(obj.range) {
            this.$startTime = new Date(this.$time);
            this.$endTime = new Date(this.$time);

            var stt = Number(obj.range[0]),
                edt = Number(obj.range[1] || 0);

            var disMin = Math.floor(stt / 60),
                addMin = Math.floor(edt / 60);

            var disSec = (stt % 60),
                addSec = (edt % 60);

            this.$startTime.setMinutes(mm + disMin);
            this.$endTime.setMinutes(mm + addMin);

            this.$startTime.setSeconds(ss + disSec + 60);
            this.$endTime.setSeconds(ss + addSec);

            this.$startTargetTime = this.$startTime.getTime();
            this.$endTargetTime = this.$endTime.getTime();
        };

        // console.log(this.$startTime.toLocaleString(), this.$endTime.toLocaleString());

        // console.log(this.$time.toLocaleString(), new Date().toLocaleString());


        this.time();
    },
    time: function() {
        var now;

        try{
            clearInterval(this.$timer);
        } catch(e) {}

        this.$timmer = setInterval(() => {
            now = new Date();
            var nowTime = now.getTime();

            if(this.$settings.range) {
                //开始执行
                if(nowTime >= this.$startTargetTime && !this.$startRunned) {
                    this.$settings.start && this.$settings.start(this.run.bind(this));
                    this.$startRunned = true;
                };
                //结束执行
                if(nowTime >= this.$endTargetTime && !this.$endRunned && this.$settings.range.length > 1) {
                    this.$settings.end && this.$settings.end(this.stop.bind(this));
                    this.$endRunned = true;
                };
            } else {
                if(nowTime >= this.$tergetTime && !this.$startRunned) {
                    this.$settings.start && this.$settings.start(this.run.bind(this));
                    this.$startRunned = true;
                }
            };
        }, 100);
    },
    run: function(settings) {
        try{
            this.stop();
        } catch(e) {};

        var loopTimes = settings.times || 'infinity',
            rps = settings.rps || 10,
            cb = settings.callback,
            currentTime = 0;

        this.interval = setInterval(() => {

            cb && cb(currentTime);

            currentTime++;

            if(loopTimes !== 'infinity') {
                loopTimes --;
                if(!loopTimes) {
                    this.stop();
                };
            }
        }, 1000 / rps)
    },
    stop: function() {
        clearInterval(this.interval);
    }
};

module.exports = Clocker;
