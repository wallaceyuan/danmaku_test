var mysql = require('mysql');

var client = require("redis").createClient();



var ip = 'http://127.0.0.1:3000';
var host = 'localhost';
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin',
    database:'danmaku',
    connectTimeout:30000
});

module.exports = {
    client:client,
    ip:ip,
    pool:pool,
    host:host
}