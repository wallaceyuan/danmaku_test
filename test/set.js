/**
 * Created by yuanyuan on 2018/2/23.
 */
const {client} = require('./redis')

client.set('key001', 'AAA', function (err, response) {
    if (err) {
        console.log("err:", err);
    } else {
        console.log(response);
        client.get('key001', function (err, res) {
            if (err) {
                console.log("err:", err);
            } else {
                console.log(res);
                client.end(true);
            }
        });
    }
});