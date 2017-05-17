var cryptoJs = require('crypto-js');
var database = require('./../config/database');
var secretKey = '@6!d';
var ipinfo = require("./../modules/ipinfo");
module.exports =   function(req , callback) {
    if(req.cookies.token !== undefined){
        var bytes  = cryptoJs.AES.decrypt(req.cookies.token , secretKey);
        var loginInfo = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
        database.sequelize.sync().then(function () {
            database.login.find({where : {uid: loginInfo.uid , ip:loginInfo.ip}}).then(function(user){
                if(user){
                    callback({isAuthenticated:true , token: req.cookies.token});
                }else{
                    callback({isAuthenticated:false});
                }
            })
        });
    }else {
        callback ({isAuthenticated:false});
    }
}