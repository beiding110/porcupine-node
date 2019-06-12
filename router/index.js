const db = require('../sql');
const logger = require('../log');

module.exports = function(app) {
    app.use('*', function(req, res, next) {

        res.header('Access-Control-Allow-Origin', req.headers.origin);//注意这里不能使用 *
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("X-Powered-By",' 3.2.1');
        res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
        if (req.method == 'OPTIONS') {
            res.sendStatus(200); // 在正常的请求之前，会发送一个验证，是否可以请求。
        }
        else {
            next();
        }
    });

    // app.use('/static', express.static(__dirname + '/static'));

    app.get('/login', function (res,req) {
        logger.info("我访问了");
        console.log(req.query);

        // var connect = db.connection();
        // db.operate(connect, "UPDATE admin SET token=? WHERE id=?", [data1,data2], function(result){
        //     res.end(JSON.stringify({
        //         state:1,
        //         data:{
        //             data:null,
        //             token:""
        //         }
        //     }));
        // });
    });

    return app;
}
