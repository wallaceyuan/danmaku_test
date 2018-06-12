/**
 * Created by yuanyuan on 2018/2/23.
 */
const {client} = require('./redis')

var qe = {a: 2, b:3, c:4};
client.hmset('field003', qe, function(err, response) {
    console.log("err:", err);
    console.log("response:", response);
    client.rpop('message',function(err,result){
        if(err){
            console.log('err',err)
        }else{
            console.log('result',result)
        }
    })
});