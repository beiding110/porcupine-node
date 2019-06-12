const mysql = require('mysql');
const conf = require('../config');

let db = {};
db.connection = function () {
    let connection = mysql.createConnection(conf.sql);
    //数据库连接
    connection.connect(function(err){
        if(err){
            console.log("err",err);
            return;
        }
    });
    return connection;
}
//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}
db.operate = function (connection, sql, param, callback) {
    connection.query(sql, param, function(err,data){
        if(err){

        } else {
          callback(data)
        }
    })
}

exports = module.exports = db;
