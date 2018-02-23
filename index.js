/**
 * Created by yuanyuan on 2018/2/22.
 */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('socket.io-redis');
const {client} = require('./test/redis')
const moment = require('moment')

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.adapter(redis({host: 'localhost', port: 6379}));

var nameBox = ['/chatroom','/live','/vod','/wechat','/broadcast'];

for(var item in nameBox){
    var nsp = io.of(nameBox[item])
    socketMain(nsp,nameBox[item])
}

function socketMain(nsp) {
    var NSP = nsp.name == '/'?'root': nsp.name.replace(/\//g, "");
    nsp.on('connection',function (socket) {
        console.log('a user connected')
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('chat message', function(msg){
            var data = {"socketid":socket.id,"cid":NSP,"msg":msg,createTime:moment().unix()};
            client.lpush('message',JSON.stringify(data),redis.print)
            console.log('message: ' + msg);
        });
        /*接收redis发来的消息*/
        socket.on('redisCome',function (data) {
            console.log('-------------redisCome',data.msg);
            try{
                var msg = data.msg
            }catch(e){
                var msg = '';
            }
            console.log(data);
            nsp.emit('message.add',msg);
        });
    })
}

http.listen(4000, function(){
    console.log('listening on *:4000');
});