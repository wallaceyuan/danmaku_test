/**
 * Created by yuanyuan on 2018/2/23.
 */
const {client} = require('./redis')

client.hset('filed002', 'key001', 'wherethersisadoor', function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log('res:', res);
        client.hget('filed002', 'key002', function (err, getRslt) {
            if (err) {
                console.log(err);
            } else {
                console.log('getRslt:', getRslt);
                client.end(true);
            }
        });
    }
});

