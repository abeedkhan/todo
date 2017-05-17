var request = require("request");
var url = "https://ipinfo.io/";
module.exports = function (callback) {
    request({url:url , json:true} , function (err, res, body) {
        callback(body.ip);
    });
}