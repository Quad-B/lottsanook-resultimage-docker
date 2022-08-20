var fs = require('fs');
const fastify = require('fastify')({ logger: true });
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const puppeteer = require('puppeteer');
const ratelimit = require("@fastify/rate-limit");

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

let goport = process.env.PORT || 4000;
let questurl = 'https://lotapi3.pwisetthon.com';
//let requestcount = 0;

(async () => {
    await fastify.register(ratelimit, {
        max: 4,
        timeWindow: 30000
    });
    //try {
    await fetch('http://192.168.31.210:5000', { 'timeout': 2000 })
        .then(res => res.status)
        .then(status => {
            //if status is 2xx, then we can start the server
            if (status >= 200 && status < 300) {
                questurl = 'http://192.168.31.210:5000'
            } else {
                questurl = 'https://lottsanook-cfworker.boy1556.workers.dev'
                //questurl = 'https://lotapi3.pwisetthon.com'
            }
        })
        .catch(err => {
            //questurl = 'https://lottsanook-cfworker.boy1556.workers.dev'
            questurl = 'https://lotapi3.pwisetthon.com'
        })
    //} catch (e) {
    // Deal with the fact the chain failed
    //}
    // `text` is not available here
})()

//use request to check if http://192.168.31.210:5000 is exist
/*request({'method': 'GET','url': 'http://192.168.31.210:5000','json': true,'headers': {},'timeout': 5000}, function(err, res, body) {
    if (err) {
        questurl = 'https://lotapi3.pwisetthon.com/api'
        console.log(err);
    } else {
        if (res.statusCode == 200) {
            questurl = 'http://192.168.31.210:5000'
        } else {
            questurl = 'https://lotapi3.pwisetthon.com/api'
        }
    }
    console.log(questurl)
});*/

/*http.createServer(function (req, res) {
    if (req.url == '/ctc') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('ok');
        res.end();
    } else if (req.url == '/fbbg') {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream('fbbg.jpg').pipe(res);
    } else if (req.url == '/fbrmbg') {
        res.writeHead(200, { 'content-type': 'image/png' });
        fs.createReadStream('fbrmbg.png').pipe(res);
    } else if (req.url == '/fbrmbn') {
        res.writeHead(200, { 'content-type': 'image/png' });
        fs.createReadStream('fbrmbn.png').pipe(res);
    } else if (req.url == '/fbrmbgabn') {
        res.writeHead(200, { 'content-type': 'image/png' });
        fs.createReadStream('fbrmbgabn.png').pipe(res);
    } else if (req.url == '/fbbg_val') {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream('fbbg_val.jpg').pipe(res);
    } else if (req.url == '/fbbggold') {
        res.writeHead(200, { 'content-type': 'image/png' });
        fs.createReadStream('fbbg_gold.png').pipe(res);
    } else {
        (async () => {

            requestcount++

            let date = new Date().getDate();
            let month = new Date().getMonth() + 1;
            let year = new Date().getFullYear();
            let byear = year + 543;

            date = padLeadingZeros(date, 2);
            month = padLeadingZeros(month, 2);

            let test
            let datecheck
            let thisistoday = true

            if (url.parse(req.url, true).query.date) {
                datecheck = url.parse(req.url, true).query.date;
            } else {
                datecheck = date + month + byear;
            }

            try {
                //console.log(fs.statSync("out.log").size)
                /*if (fs.statSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".png").size < 100) {
                    fs.unlink(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".png", function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                }*/
/*if (fs.statSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".jpg").size < 100) {
    fs.unlink(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".jpg", function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}
} catch (error) {

}

if (questurl == undefined || questurl == 'undefined') {
questurl = 'https://lotapi3.pwisetthon.com/api'
}

var options = {
'method': 'GET',
'url': questurl + '/?date=' + datecheck,
'json': true,
'headers': {
}
};

request(options, async function (error, response) {
if (error) throw new Error(error);
console.log(response.body[0][1]);
test = response.body

console.log(datecheck)
try {
    if (fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.jpg') && datecheck == date + month + byear) {
        fs.unlinkSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.jpg')
        console.log('remove today image')
        thisistoday = true
    } else {
        if (!fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.jpg')) {
            thisistoday = true
        } else {
            thisistoday = false
        }
    }
    /*if (fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png') && datecheck == date + month + byear) {
        fs.unlinkSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png')
        console.log('remove today image')
        thisistoday = true
    } else {
        if (!fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png')) {
            thisistoday = true
        } else {
            thisistoday = false
        }
    }*/
//file removed
/*} catch (err) {
    console.log('today image not be create')
    //console.error(err)
}

let monthtext;

switch (datecheck.substring(2, 4)) {
    case '01': monthtext = "มกราคม"; break;
    case '02': monthtext = "กุมภาพันธ์"; break;
    case '03': monthtext = "มีนาคม"; break;
    case '04': monthtext = "เมษายน"; break;
    case '05': monthtext = "พฤษภาคม"; break;
    case '06': monthtext = "มิถุนายน"; break;
    case '07': monthtext = "กรกฎาคม"; break;
    case '08': monthtext = "สิงหาคม"; break;
    case '09': monthtext = "กันยายน"; break;
    case '10': monthtext = "ตุลาคม"; break;
    case '11': monthtext = "พฤศจิกายน"; break;
    case '12': monthtext = "ธันวาคม"; break;
}

let bgurl

if (url.parse(req.url, true).query.bgimg && url.parse(req.url, true).query.rmber) {
    bgurl = 'fbrmbgabn'
} else if (url.parse(req.url, true).query.bgimg) {
    bgurl = 'fbrmbg'
} else if (url.parse(req.url, true).query.rmber) {
    bgurl = 'fbrmbn'
} else {
    //if this month is february and date <= 14
    if (datecheck.substring(2, 4) == '02' && datecheck.substring(0, 2) <= '14') {
        bgurl = 'fbbg_val'
    } else {
        bgurl = 'fbbg'
    }
}

//if requestcount > 0 wait for requestcount*5 seconds
if (requestcount > 0) {
    await setTimeout(() => { }, requestcount * 5000)
}

if (url.parse(req.url, true).query.bgimg) {
    //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-weight: 700;font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/'+bgurl+'\'), url(\'' + url.parse(req.url, true).query.bgimg + '\');background-position: center, center;background-repeat: no-repeat,no-repeat;background-size: cover,cover;color: white;}</style></head>'
    let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-weight: 700;font-family: \'Mitr\', font-noto-thai;background-image: url(\''+ bgurl + '\'), url(\'' + url.parse(req.url, true).query.bgimg + '\');background-position: center, center;background-repeat: no-repeat,no-repeat;background-size: cover,cover;color: white;}</style></head>'

    await new Pageres({ format: 'jpg', delay: 2, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:'+goport+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;font-weight: 700;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;font-weight: 700;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;font-weight: 700;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;font-weight: 700;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;font-weight: 700;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;font-weight: 700;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;font-weight: 700;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;font-weight: 700;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;font-weight: 700;">'+test[2][1]+' | '+test[2][2]+'</h2>', ['1600x1066'])
        .src('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
        .dest(__dirname)
        .run();

    console.log('Finished generating screenshots!');

    /*res.writeHead(200, { 'content-type': 'image/png' });
    fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg.png').pipe(res);*/
/*res.writeHead(200, { 'content-type': 'image/jpg' });
fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg.jpg').pipe(res);
} else if (url.parse(req.url, true).query.mode == "gold") {
let golddata

var options = {
    'method': 'GET',
    'url': 'https://thai-gold-api.herokuapp.com/latest',
    'json': true,
    'headers': {
    }
};

request(options, async function (error, response) {
    //if (error) throw new Error(error);
    //console.log(response.body);
    golddata = response.body

    //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'
    let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'

    await new Pageres({ delay: 1, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
        .src('data:text/html,' + headercap + '<h1 style="margin-top: 3px;margin-left: 5px;font-size: 65px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: -30px;margin-left: 0px;font-size: 50px;margin-right: 450px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 47px;font-size: 30px;margin-left: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 8vw;margin-left: 0px;margin-top: -80px;margin-right: 800px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-top: -115px;font-size: 30px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 170px;margin-top: -60px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 0px;font-size: 30px;margin-top: -70px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 180px;max-width: 475px;margin-top: -55px;">' + test[2][1] + ' | ' + test[2][2] + '</h2><h2 style="margin-top: -65px;font-size: 30px;position: fixed;">เลขท้าย สองตัว</h2><h2 style="margin-left: 300px;font-size: 150px;margin-top: -87px;position: fixed;">' + test[3][1] + '</h2><h1 style="margin-top: -860px;margin-left: 1010px;font-size: 65px;position: fixed;">ราคาทองวันนี้</h1><h1 style="margin-top: -625px;margin-left: 820px;font-size: 65px;position: fixed;">ทองคำ</h1><h1 style="margin-top: -500px;margin-left: 850px;font-size: 65px;position: fixed;">' + golddata.response.price.gold.buy + ' | ' + golddata.response.price.gold.sell + '</h1><h1 style="margin-top: -350px;margin-left: 792px;font-size: 60px;position: fixed;background-color: gold;padding-top: 7px;padding-left: 5px;padding-right: 5px;">ทองคำแท่ง</h1><h1 style="margin-top: -190px;margin-left: 827px;font-size: 65px;position: fixed;">' + golddata.response.price.gold_bar.buy + ' | ' + golddata.response.price.gold_bar.sell + '</h1><h1 style="position: absolute;left: 535px;top: 382px;">' + test[4][1] + ' | ' + test[4][2] + '</h1>', ['1600x1066'])
        .dest(__dirname)
        .run();

    res.writeHead(200, { 'content-type': 'image/png' });
    fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold.png').pipe(res);
    console.log('Finished generating screenshots!');
});

} else {
if (thisistoday) {
    //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/'+bgurl+'\');color: white;}</style></head>'
    let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\''+ bgurl + '\');color: white;}</style></head>'

    await new Pageres({ format: 'jpg', filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_' + bgurl, launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'https://lotpost.pwisetthon.com/fbbg.png\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;">' + test[3][1] + '</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
        .src('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
        .dest(__dirname)
        .run();

    console.log('Finished generating screenshots!');

    /*res.writeHead(200, { 'content-type': 'image/png' });
    fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png').pipe(res);*/
/*res.writeHead(200, { 'content-type': 'image/jpg' });
fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_' + bgurl + '.jpg').pipe(res);
} else {
/*res.writeHead(200, { 'content-type': 'image/png' });
fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png').pipe(res);*/
/*res.writeHead(200, { 'content-type': 'image/jpg' });
fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_' + bgurl + '.jpg').pipe(res);
console.log('Finished loading screenshots!');
}
}
requestcount = requestcount - 1;
});

})();
}
}).listen(goport);*/

fastify.get('/ctc', async (request, reply) => {
    //return ok text
    return 'OK';
})

fastify.get('/fbbg', async (request, reply) => {
    //return fbbg.jpg image
    reply.type('image/jpg');
    return fs.createReadStream(__dirname + '/fbbg.jpg');
})

//get fbrmbg and return fbrmbg.png image
fastify.get('/fbrmbg', async (request, reply) => {
    reply.type('image/png');
    return fs.createReadStream(__dirname + '/fbrmbg.png');
})

//get fbrmbn and return fbrmbn.png image
fastify.get('/fbrmbn', async (request, reply) => {
    reply.type('image/png');
    return fs.createReadStream(__dirname + '/fbrmbn.png');
})

//get fbrmbgabn and return fbrmbgabn.png image
fastify.get('/fbrmbgabn', async (request, reply) => {
    reply.type('image/png');
    return fs.createReadStream(__dirname + '/fbrmbgabn.png');
})

//get fbbg_val and return fbbg_val.jpg image
fastify.get('/fbbg_val', async (request, reply) => {
    reply.type('image/jpg');
    return fs.createReadStream(__dirname + '/fbbg_val.jpg');
})

//get fbbggold and return fbbg_gold.png image
fastify.get('/fbbggold', async (request, reply) => {
    reply.type('image/png');
    return fs.createReadStream(__dirname + '/fbbg_gold.png');
})

fastify.get('/', async (request, reply) => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let byear = year + 543;

    date = padLeadingZeros(date, 2);
    month = padLeadingZeros(month, 2);

    let test
    let datecheck
    let thisistoday = true

    const latest = await fetch(questurl + '/lastlot?info=true', { 'timeout': 5000 })
    const latestjson = await latest.json()

    if (request.query.date != undefined && request.query.date != null) {
        datecheck = request.query.date;
    } else if (request.query.latest == 'true') {
        datecheck = latestjson.info.date;
    } else {
        datecheck = date + month + byear;
    }

    try {
        //console.log(fs.statSync("out.log").size)
        /*if (fs.statSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".png").size < 100) {
            fs.unlink(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".png", function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        }*/
        if (fs.statSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".jpg").size < 100) {
            fs.unlink(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + ".jpg", function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        }
    } catch (error) {

    }

    /*if (questurl == undefined || questurl == 'undefined') {
        questurl = 'https://lotapi3.pwisetthon.com/api'
    }*/

    /*await fetch('http://192.168.31.210:5000', { 'timeout': 5000 })
        .then(res => res.status)
        .then(status => {
            if (status == 200) {
                questurl = 'http://192.168.31.210:5000'
            } else {
                questurl = 'https://lotapi3.pwisetthon.com/api'
            }
        })
        .catch(err => {
            questurl = 'https://lotapi2.pwisetthon.com/.netlify/functions/server/'
        })*/

    const lotapi = await fetch(questurl + '/?date=' + datecheck, { 'timeout': 5000 })
    const lotapijson = await lotapi.json()
    const isday = await fetch(questurl + '/reto', { 'timeout': 5000 })
    const isdaytext = await isday.text()

    console.log(questurl)

    console.log(lotapijson[0][1]);
    test = lotapijson

    console.log(datecheck)
    try {
        if (fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png') && (datecheck == date + month + byear && isdaytext == 'yes')) {
            fs.unlinkSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png')
            console.log('remove today image')
            thisistoday = true
        } else {
            if (!fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png')) {
                thisistoday = true
            } else {
                if (request.query.fresh == true || request.query.fresh == 'true') {
                    await fs.unlinkSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png')
                    thisistoday = true
                } else {
                    thisistoday = false
                }
            }
        }
        /*if (fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png') && datecheck == date + month + byear) {
            fs.unlinkSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png')
            console.log('remove today image')
            thisistoday = true
        } else {
            if (!fs.existsSync(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png')) {
                thisistoday = true
            } else {
                thisistoday = false
            }
        }*/
        //file removed
    } catch (err) {
        console.log('today image not be create')
        //console.error(err)
    }

    let monthtext;

    switch (datecheck.substring(2, 4)) {
        case '01': monthtext = "มกราคม"; break;
        case '02': monthtext = "กุมภาพันธ์"; break;
        case '03': monthtext = "มีนาคม"; break;
        case '04': monthtext = "เมษายน"; break;
        case '05': monthtext = "พฤษภาคม"; break;
        case '06': monthtext = "มิถุนายน"; break;
        case '07': monthtext = "กรกฎาคม"; break;
        case '08': monthtext = "สิงหาคม"; break;
        case '09': monthtext = "กันยายน"; break;
        case '10': monthtext = "ตุลาคม"; break;
        case '11': monthtext = "พฤศจิกายน"; break;
        case '12': monthtext = "ธันวาคม"; break;
    }

    let bgurl

    if (request.query.bgimg && request.query.rmber) {
        bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/fbrmbgabn.png'
    } else if (request.query.bgimg) {
        bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/fbrmbg.png'
    } else if (request.query.rmber) {
        bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/fbrmbn.png'
    } else if (request.query.tile == 'true') {
        bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/lot_seq.png'
    } else {
        //if this month is february and date <= 14
        if (datecheck.substring(2, 4) == '02' && datecheck.substring(0, 2) <= '14') {
            bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/fbbg_val.jpg'
        } else {
            bgurl = 'https://raw.githubusercontent.com/quad-b/lottsanook-resultimage-docker/main/fbbg.jpg'
        }
    }

    //if requestcount > 0 wait for requestcount*5 seconds
    /*if (requestcount > 0) {
        await delay(requestcount * 5000)
    }*/

    //requestcount++

    if (request.query.tile == 'true') {
        let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background: url(' + bgurl + '),linear-gradient(74deg, rgba(255,230,0,1) 0%, rgba(0,146,210,1) 100%);color: black;padding-left: 0px;margin-left: 0px;}</style></head>'
        if (request.query.bgimg) {
            headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background: url(' + bgurl + '),url(\'' + request.query.bgimg + '\');color: black;padding-left: 0px;margin-left: 0px;}</style></head>'
        }
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 2048, height: 2048 });
        await page.goto('data:text/html,' + headercap + '<div style="background: rgb(255,230,0);background: linear-gradient(254deg, rgba(255,230,0,1) 0%, rgba(0,146,210,1) 100%);margin-top: 65px;width: 2048px;text-align: center;"><h1 style="font-size: 80px;margin-bottom: 0px;padding-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-top: 0px;padding-top: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2></div><h2 style="font-size: 80px;margin-left: 845px;margin-top: 100px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 17vw;margin-top: -65px;text-align: center;margin-bottom: 0px;width: 100%;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -20px;font-size: 75px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1200px;font-size: 450px;margin-top: -90px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -765px;margin-left: 125px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 7vw;margin-left: 160px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 125px;margin-top: -90px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 7vw;margin-left: 160px;margin-top: -10px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>');
        //await page.waitForTimeout(1000);
        const image = await page.screenshot({ type: 'jpeg', quality: 75 });

        console.log('Finished generating screenshots!');

        await browser.close();
        reply.type('image/jpeg');
        return image;
    } else {
        if (request.query.bgimg) {
            //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-weight: 700;font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/'+bgurl+'\'), url(\'' + url.parse(req.url, true).query.bgimg + '\');background-position: center, center;background-repeat: no-repeat,no-repeat;background-size: cover,cover;color: white;}</style></head>'
            let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-weight: 700;font-family: \'Mitr\', font-noto-thai;background-image: url(\'' + bgurl + '\'), url(\'' + request.query.bgimg + '\');background-position: center, center;background-repeat: no-repeat,no-repeat;background-size: cover,cover;color: white;}</style></head>'

            /*await new Pageres({ crop: true, format: 'jpg', delay: 2, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:'+goport+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;font-weight: 700;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;font-weight: 700;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;font-weight: 700;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;font-weight: 700;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;font-weight: 700;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;font-weight: 700;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;font-weight: 700;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;font-weight: 700;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;font-weight: 700;">'+test[2][1]+' | '+test[2][2]+'</h2>', ['1600x1066'])
                .src('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
                .dest(__dirname)
                .run();
    
            console.log('Finished generating screenshots!');*/

            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] });
            const page = await browser.newPage();
            await page.setViewport({ width: 1600, height: 1066 });
            await page.goto('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>')
            //await page.waitForTimeout(2000);
            const image = await page.screenshot();

            await browser.close();

            //after 30 seconds, requestcount will be requestcount - 1
            /*setTimeout(function () {
                requestcount = requestcount - 1;
            }, 30000);*/

            reply.type('image/png');
            return image;

            /*res.writeHead(200, { 'content-type': 'image/png' });
            fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg.png').pipe(res);*/
            //res.writeHead(200, { 'content-type': 'image/jpg' });
            //fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg.jpg').pipe(res);

            //reply.type('image/jpg');
            //return fs.createReadStream(__dirname + '/' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_cbg.jpg');
        } else if (request.query.mode == "gold") {
            let golddata

            const data = await fetch('https://thai-gold-api.herokuapp.com/latest');
            golddata = await data.json();

            let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'https://raw.githubusercontent.com/Quad-B/lottsanook-resultimage-docker/main/fbbg_gold.png\');color: white;}</style></head>'

            /*await new Pageres({ delay: 1, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                .src('data:text/html,' + headercap + '<h1 style="margin-top: 3px;margin-left: 5px;font-size: 65px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: -30px;margin-left: 0px;font-size: 50px;margin-right: 450px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 47px;font-size: 30px;margin-left: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 8vw;margin-left: 0px;margin-top: -80px;margin-right: 800px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-top: -115px;font-size: 30px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 170px;margin-top: -60px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 0px;font-size: 30px;margin-top: -70px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 180px;max-width: 475px;margin-top: -55px;">' + test[2][1] + ' | ' + test[2][2] + '</h2><h2 style="margin-top: -65px;font-size: 30px;position: fixed;">เลขท้าย สองตัว</h2><h2 style="margin-left: 300px;font-size: 150px;margin-top: -87px;position: fixed;">' + test[3][1] + '</h2><h1 style="margin-top: -860px;margin-left: 1010px;font-size: 65px;position: fixed;">ราคาทองวันนี้</h1><h1 style="margin-top: -625px;margin-left: 820px;font-size: 65px;position: fixed;">ทองคำ</h1><h1 style="margin-top: -500px;margin-left: 850px;font-size: 65px;position: fixed;">' + golddata.response.price.gold.buy + ' | ' + golddata.response.price.gold.sell + '</h1><h1 style="margin-top: -350px;margin-left: 792px;font-size: 60px;position: fixed;background-color: gold;padding-top: 7px;padding-left: 5px;padding-right: 5px;">ทองคำแท่ง</h1><h1 style="margin-top: -190px;margin-left: 827px;font-size: 65px;position: fixed;">' + golddata.response.price.gold_bar.buy + ' | ' + golddata.response.price.gold_bar.sell + '</h1><h1 style="position: absolute;left: 535px;top: 382px;">' + test[4][1] + ' | ' + test[4][2] + '</h1>', ['1600x1066'])
                .dest(__dirname)
                .run();*/

            /*res.writeHead(200, { 'content-type': 'image/png' });
            fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold.png').pipe(res);
            console.log('Finished generating screenshots!');*/

            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] });
            const page = await browser.newPage();
            await page.setViewport({ width: 1600, height: 1066 });
            await page.goto('data:text/html,' + headercap + '<h1 style="margin-top: 3px;margin-left: 5px;font-size: 65px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: -30px;margin-left: 0px;font-size: 50px;margin-right: 450px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 47px;font-size: 30px;margin-left: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 8vw;margin-left: 0px;margin-top: -80px;margin-right: 800px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-top: -115px;font-size: 30px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 170px;margin-top: -60px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 0px;font-size: 30px;margin-top: -70px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 180px;max-width: 475px;margin-top: -55px;">' + test[2][1] + ' | ' + test[2][2] + '</h2><h2 style="margin-top: -65px;font-size: 30px;position: fixed;">เลขท้าย สองตัว</h2><h2 style="margin-left: 300px;font-size: 150px;margin-top: -87px;position: fixed;">' + test[3][1] + '</h2><h1 style="margin-top: -860px;margin-left: 1010px;font-size: 65px;position: fixed;">ราคาทองวันนี้</h1><h1 style="margin-top: -625px;margin-left: 820px;font-size: 65px;position: fixed;">ทองคำ</h1><h1 style="margin-top: -500px;margin-left: 850px;font-size: 65px;position: fixed;">' + golddata.response.price.gold.buy + ' | ' + golddata.response.price.gold.sell + '</h1><h1 style="margin-top: -350px;margin-left: 792px;font-size: 60px;position: fixed;background-color: gold;padding-top: 7px;padding-left: 5px;padding-right: 5px;">ทองคำแท่ง</h1><h1 style="margin-top: -190px;margin-left: 827px;font-size: 65px;position: fixed;">' + golddata.response.price.gold_bar.buy + ' | ' + golddata.response.price.gold_bar.sell + '</h1><h1 style="position: absolute;left: 535px;top: 382px;">' + test[4][1] + ' | ' + test[4][2] + '</h1>')
            //await page.waitForTimeout(1000);
            const image = await page.screenshot();

            //after 30 seconds, requestcount will be requestcount - 1
            /*setTimeout(function () {
                requestcount = requestcount - 1;
            }, 30000);*/

            //reply.type('image/png');
            //return fs.createReadStream(__dirname + '/' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold.png');

            await browser.close();

            reply.type('image/png');
            return image;

            /*fetch('https://thai-gold-api.herokuapp.com/latest')
                .then(res => res.json())
                .then(json => {
                    golddata = json
    
                    //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'
                    let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'
    
                    await new Pageres({ delay: 1, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                        .src('data:text/html,' + headercap + '<h1 style="margin-top: 3px;margin-left: 5px;font-size: 65px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: -30px;margin-left: 0px;font-size: 50px;margin-right: 450px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 47px;font-size: 30px;margin-left: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 8vw;margin-left: 0px;margin-top: -80px;margin-right: 800px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-top: -115px;font-size: 30px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 170px;margin-top: -60px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 0px;font-size: 30px;margin-top: -70px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 180px;max-width: 475px;margin-top: -55px;">' + test[2][1] + ' | ' + test[2][2] + '</h2><h2 style="margin-top: -65px;font-size: 30px;position: fixed;">เลขท้าย สองตัว</h2><h2 style="margin-left: 300px;font-size: 150px;margin-top: -87px;position: fixed;">' + test[3][1] + '</h2><h1 style="margin-top: -860px;margin-left: 1010px;font-size: 65px;position: fixed;">ราคาทองวันนี้</h1><h1 style="margin-top: -625px;margin-left: 820px;font-size: 65px;position: fixed;">ทองคำ</h1><h1 style="margin-top: -500px;margin-left: 850px;font-size: 65px;position: fixed;">' + golddata.response.price.gold.buy + ' | ' + golddata.response.price.gold.sell + '</h1><h1 style="margin-top: -350px;margin-left: 792px;font-size: 60px;position: fixed;background-color: gold;padding-top: 7px;padding-left: 5px;padding-right: 5px;">ทองคำแท่ง</h1><h1 style="margin-top: -190px;margin-left: 827px;font-size: 65px;position: fixed;">' + golddata.response.price.gold_bar.buy + ' | ' + golddata.response.price.gold_bar.sell + '</h1><h1 style="position: absolute;left: 535px;top: 382px;">' + test[4][1] + ' | ' + test[4][2] + '</h1>', ['1600x1066'])
                        .dest(__dirname)
                        .run();
    
                    /*res.writeHead(200, { 'content-type': 'image/png' });
                    fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold.png').pipe(res);
                    console.log('Finished generating screenshots!');*/
            //})

            /*var options = {
                'method': 'GET',
                'url': 'https://thai-gold-api.herokuapp.com/latest',
                'json': true,
                'headers': {
                }
            };
    
            request(options, async function (error, response) {*/
            //if (error) throw new Error(error);
            //console.log(response.body);
            /*golddata = response.body
    
            //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'
            let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/fbbggold\');color: white;}</style></head>'
    
            await new Pageres({ delay: 1, filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                .src('data:text/html,' + headercap + '<h1 style="margin-top: 3px;margin-left: 5px;font-size: 65px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: -30px;margin-left: 0px;font-size: 50px;margin-right: 450px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 47px;font-size: 30px;margin-left: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 8vw;margin-left: 0px;margin-top: -80px;margin-right: 800px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-top: -115px;font-size: 30px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 170px;margin-top: -60px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 0px;font-size: 30px;margin-top: -70px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 180px;max-width: 475px;margin-top: -55px;">' + test[2][1] + ' | ' + test[2][2] + '</h2><h2 style="margin-top: -65px;font-size: 30px;position: fixed;">เลขท้าย สองตัว</h2><h2 style="margin-left: 300px;font-size: 150px;margin-top: -87px;position: fixed;">' + test[3][1] + '</h2><h1 style="margin-top: -860px;margin-left: 1010px;font-size: 65px;position: fixed;">ราคาทองวันนี้</h1><h1 style="margin-top: -625px;margin-left: 820px;font-size: 65px;position: fixed;">ทองคำ</h1><h1 style="margin-top: -500px;margin-left: 850px;font-size: 65px;position: fixed;">' + golddata.response.price.gold.buy + ' | ' + golddata.response.price.gold.sell + '</h1><h1 style="margin-top: -350px;margin-left: 792px;font-size: 60px;position: fixed;background-color: gold;padding-top: 7px;padding-left: 5px;padding-right: 5px;">ทองคำแท่ง</h1><h1 style="margin-top: -190px;margin-left: 827px;font-size: 65px;position: fixed;">' + golddata.response.price.gold_bar.buy + ' | ' + golddata.response.price.gold_bar.sell + '</h1><h1 style="position: absolute;left: 535px;top: 382px;">' + test[4][1] + ' | ' + test[4][2] + '</h1>', ['1600x1066'])
                .dest(__dirname)
                .run();
    
            res.writeHead(200, { 'content-type': 'image/png' });
            fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_gold.png').pipe(res);
            console.log('Finished generating screenshots!');*/
            //});
        } else {
            if (thisistoday || request.query.rmber) {
                //let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'http://localhost:' + goport + '/'+bgurl+'\');color: white;}</style></head>'
                let headercap = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'' + bgurl + '\');color: white;}</style></head>'

                /*await new Pageres({ format: 'jpg', filename: datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal', launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                    //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', font-noto-thai;background-image: url(\'https://lotpost.pwisetthon.com/fbbg.png\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;">' + test[3][1] + '</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
                    .src('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
                    .dest(__dirname)
                    .run();*/

                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] });
                const page = await browser.newPage();
                await page.setViewport({ width: 1600, height: 1066 });
                await page.goto('data:text/html,' + headercap + '<h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + monthtext + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>');
                //await page.waitForTimeout(1000);
                const image = await page.screenshot();

                console.log('Finished generating screenshots!');

                /*res.writeHead(200, { 'content-type': 'image/png' });
                fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png').pipe(res);*/
                //res.writeHead(200, { 'content-type': 'image/jpg' });
                //fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_' + bgurl + '.jpg').pipe(res);

                //console.log(requestcount);

                //after 30 seconds, requestcount will be requestcount - 1
                /*setTimeout(function () {
                    requestcount = requestcount - 1;
                }, 30000);*/

                await browser.close();

                //return image

                if (!request.query.rmber && test[0][1] != 0 && test[0][1] != '0') {
                    fs.writeFile(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png', image, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('The file ' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png' + ' was saved!');
                    });
                }

                reply.type('image/png');
                return image;

                //reply.type('image/jpg');
                //return fs.createReadStream(__dirname + '/' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.jpg');
            } else {
                //bgurl = 'thehellisthat'
                /*res.writeHead(200, { 'content-type': 'image/png' });
                fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '.png').pipe(res);*/
                //res.writeHead(200, { 'content-type': 'image/jpg' });
                //fs.createReadStream(datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_' + bgurl + '.jpg').pipe(res);
                //console.log('Finished loading screenshots!');

                /*reply.type('image/jpg');
                return fs.createReadStream(__dirname + '/' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.jpg');*/

                reply.type('image/png');
                return fs.createReadStream(__dirname + '/' + datecheck.substring(0, 2) + '-' + datecheck.substring(2, 4) + '-' + datecheck.substring(4, 8) + '_normal.png');
            }
        }
    }
})

/*const start = async () => {
    try {
        await fastify.listen(goport, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}*/

const start = async () => {
    try {
        await fastify.listen({ port: goport, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()