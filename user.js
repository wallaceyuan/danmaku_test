exports.messageDirty      = function(message,callback){
    //console.log(message.msg);
    var re = /select|update|delete|exec|count|=|;|>|<|%/i;
    if (re.test(message.msg)) {//特殊字符和SQL关键字
        //console.log('存在特殊字符');
        callback({"status":703,"msg":'存在特殊字符'},null);
    }else{
        callback(null,message);
    }
}

exports.messageValidate      = function(message,callback){
    callback(null,message);
}
