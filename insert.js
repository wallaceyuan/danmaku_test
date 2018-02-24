/**
 * Created by yuanyuan on 2018/2/23.
 */

var {query} = require("./test/redis");
const moment = require('moment')

query('insert into demo(message,createTime) values(?,?)',['啊哈哈哈',moment().unix()],function(err,results,fields){
    //do something
    if(err){
        console.log(err)
    }else {
        console.log(results)
    }
});