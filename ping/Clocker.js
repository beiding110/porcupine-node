function Clocker(obj) {
    this.init(obj);
};

Clocker.prototype = {
    init: function(obj) {
        var time = obj.time;
        var hh = time.split(':')[0] || '0',
            mm = time.split(':')[1] || '0',
            ss = time.split(':')[2] || '0';

        // hh = Number(hh);
        // mm = Number(mm);
        // mm = Number(mm);

        this.time = new Date();
        this.time.setHours(hh);
        this.time.setMinutes(mm);
        this.time.setSeconds(ss);

        console.log(this.time.toLocaleString(), new Date().toLocaleString());
    },
    time: function() {

    }
};

module.exports = Clocker;
