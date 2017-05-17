var cryptoJs = require('crypto-js');
var secretKey = '@6!d';
module.exports = {
    toId: function (token) {
        var bytes  = cryptoJs.AES.decrypt(token , secretKey);
        var loginInfo = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
        return loginInfo.uid;
    },
    toIp:function (token){
        var bytes  = cryptoJs.AES.decrypt(token , secretKey);
        var loginInfo = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
        return loginInfo.ip;
    }
}