/**
 * Created by yuanyuan on 2018/2/23.
 */
const {client} = require('./redis')

client.lpush('test', 12345, function(err, response) {
    if(err){
        console.log("err:", err);
    }else{
        console.log("response:", response);
        client.rpop('test',function (err, res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                client.end(true);
            }
        });
    }
});