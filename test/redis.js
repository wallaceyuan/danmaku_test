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

module.exports = {
    client:client,
    ip:'http://127.0.0.1:4000'
}