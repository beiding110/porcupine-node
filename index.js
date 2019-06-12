const http = require('http');

const express = require('express');
const app = express();

const conf = require('./config');
const appUrl = require('./router')(app);
// require('./ping');

app.use('/static',express.static(__dirname + '/static'));

const server = http.createServer(appUrl);
server.listen(conf.server.port, conf.server.host, () => {
    console.log(`服务器运行在 http://${conf.server.host}:${conf.server.port}/`);
});
