/**
 * Created by yuanyuan on 2018/2/23.
 */
const {client} = require('./redis')

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