/**
 * Created by yuanyuan on 2018/2/23.
 */
const io = require('socket.io-client');
const async = require('async');
const moment = require('moment');
const redis = require('redis');

const {client,ip} = require('./test/redis');
const domain = require('domain');
const debug = require('debug')('socket-client:main');

var origin = io.connect(ip+'/', {reconnect: true});
var chatroom = io.connect(ip+'/chatroom', {reconnect: true});
var live = io.connect(ip+'/live', {reconnect: true});
var vod = io.connect(ip+'/vod', {reconnect: true});
var wechat = io.connect(ip+'/wechat', {reconnect: true});
var broadcast = io.connect(ip+'/broadcast', {reconnect: true});

var namBox = {root:origin,chatroom:chatroom,live:live,vod:vod,wechat:wechat,broadcast:broadcast};

var reqDomain = domain.create();
reqDomain.on('error', function (err) {
    console.log(err);
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 100);
        killTimer.unref();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});

reqDomain.run(function () {
    compute();
});

process.on('uncaughtException', function (err) {
    console.log(err);
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 100);
        killTimer.unref();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});

function compute() {
    client.llen('message', function(error, count){
        if(error){
            console.log(error);
        }else{
            if(count){
                //console.log('-------------has count',time);
                popLogs();
                process.nextTick(compute);
            }else{
                //console.log('-------------empty',time);
                setTimeout(function(){
                    compute();
                },100);
            }
        }
    });
}

function popLogs(){
    var time = moment().unix();
    console.log('-------------dealStart-------------',time);
    client.rpop('message',function(err,result){
        if(err){
            console.log(err);
        }else{
            var result = JSON.parse(result);
            try{
                var cid = result.cid;
                //console.log('place',result.place);
            }catch(e){
                console.log('empty data cid',result);
                return;
            }
            console.log(' start '+' nsp: '+cid +' time: '+time);
            if(namBox[cid]){
                console.log(result);
                namBox[cid].emit('redisCome',result);
            }
        }
    });
}
