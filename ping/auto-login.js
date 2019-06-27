const tsObj = require('tesseract.js');
var request = require('request');
let fs = require('fs');

const logger = require('../log');

const TesseractWorker = tsObj.TesseractWorker;

const worker = new TesseractWorker(),
    loginUrl = 'http://duyc.jxoaxt.com/login/login';

var loginData = {
        username: '130105199501231518',
        password: '231518'
    },
    cookie;

function autoLogin() {

    let httpStream = request({
        method: 'GET',
        url: 'http://duyc.jxoaxt.com/login/verify'
    });
    let writeStream = fs.createWriteStream('./download/verify.png');

    httpStream.pipe(writeStream);

    writeStream.on('close', () => {
        console.log('download finished');
    });

    request.get({
        // url: 'http://duyc.jxoaxt.com/login/login',
        url: 'http://duyc.jxoaxt.com/login/verify',
    }, (error, response, body) => {
        logger.info('BODY: ' + body);

        cookie = cookie ? cookie : response.headers['set-cookie'][0];

        try{
            cookie = cookie.split(';')[0];
        }catch (e) {
            console.log('cookie split error')
        }

        logger.info(`setted cookie is:${cookie}`);

        if (!error && response.statusCode == 200) {

            worker.recognize('http://duyc.jxoaxt.com/login/verify')
            .progress(progress => {
                console.log('progress', progress);
            }).then(result => {
                // console.log('result', result);
                var resText = result.text.replace(/\/n/g, '');
                console.log('resultText', resText);
                loginData.verifycode = resText;
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
                        if(/错误信息：验证码输入错误!/.test(body)) {
                            logger.info(`登录失败，验证码识别错误，错误验证码为:${loginData.verifycode}`);
                            autoLogin();
                        }
                    }
                })
            }).catch(err => {
                console.log('error', err);
            });

        }
    });
}

autoLogin();
