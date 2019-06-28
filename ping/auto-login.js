const tsObj = require('tesseract.js');
var request = require('request');
let fs = require('fs');

const logger = require('../log');
const Chain = require('../lib/Chain');

const TesseractWorker = tsObj.TesseractWorker;

const worker = new TesseractWorker(),
    loginUrl = 'http://duyc.jxoaxt.com/login/login';

var loginData = {
        username: '130105199501231518',
        password: '231518'
    },
    cookie;

function autoLogin() {

    new Chain().link(function(next) {
        //通过获取页面来设定cookie；
        request.get({
            url: 'http://duyc.jxoaxt.com/login/login',
            // url: 'http://duyc.jxoaxt.com/login/verify',
        }, (error, response, body) => {
            // logger.info('BODY: ' + body);
            console.log('* into the login page')

            cookie = cookie ? cookie : response.headers['set-cookie'][0];

            try{
                cookie = cookie.split(';')[0];
            }catch (e) {
                console.log('cookie split error')
            }

            logger.info(`setted cookie is:${cookie}`);

            if (!error && response.statusCode == 200) {

                next()

            }
        });
    }).link(next => {

        //获取验证码并存为文件
        let httpStream = request({
            method: 'GET',
            url: 'http://duyc.jxoaxt.com/login/verify'
        });
        let writeStream = fs.createWriteStream('./download/verify.png');

        httpStream.pipe(writeStream);

        writeStream.on('close', () => {
            console.log('* download finished');

            next();
        });
    }).link(next => {
        //将已存的验证码图片上传进行识别；
        worker.recognize('./download/verify.png')
        .progress(progress => {
            console.log('progress', progress);
        }).then(result => {
            // console.log('result', result);
            var resText = result.text.replace(/\/n/g, '');
            console.log('* resultText', resText);
            loginData.verifycode = resText;

            next();
        }).catch(err => {
            console.log('error', err);
        });
    }).link(next => {
        //发起登录请求
        loginData.ts = new Date().getTime();

        request.post({
            url: loginUrl,
            form: loginData,
            header: {
                Cookie: cookie,
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            }
        }, (error, response, body) => {
            // logger.info('BODY: ' + body);
            if (!error && response.statusCode == 200) {
                var errText = body.match(/(?<=<span style="color:red">错误信息：).*?(?=<\/span>)/i);
                if(errText) {
                    logger.info(`* 登录失败错误为:${errText}`);
                    autoLogin();
                } else {
                    logger.info(body);
                }
            }
        })
    }).run();

}

autoLogin();
