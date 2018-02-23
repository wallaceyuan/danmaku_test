/**
 * Created by yuanyuan on 2018/2/23.
 */
var {query} = require("./test/redis");

query("select * from demo", function(err,results,fields){
    //do something
    if(err){
        console.log(err)
    }else {
        console.log(results)
    }
});