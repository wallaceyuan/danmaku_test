/**
 * Created by yuanyuan on 2018/2/23.
 */
// redis 链接
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});
// redis 验证 (reids.conf未开启验证，此项可不需要)
// client.auth("foobared");

var mysql      = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'123456',
    database : 'danmaku'
});

var query = function(sql,options,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,function(err,results,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err,results,fields);
            });
        }
    });
};

module.exports = {
    client:client,
    ip:'http://127.0.0.1:4000',
    query:query
}