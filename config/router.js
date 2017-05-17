var express = require("express");
var cryptoJs = require('crypto-js');
var database = require('./../config/database');
var secretKey = '@6!d';
var ipinfo = require("./../modules/ipinfo");
var router = express.Router();
var tokenInfo = require("./../modules/token-info");
var userAuth = require("./../modules/user-auth");
router
    .get('/authenticate' , function (req, res) {
        userAuth(req , function(data){
            res.json(data);
        })
    })
    .get("/logout" , function (req, res) {
        var id = tokenInfo.toId(req.cookies.token);
        var ip = tokenInfo.toIp(req.cookies.token);
        database.sequelize.sync().then(function () {
            database.login.destroy({where : {uid: id , ip: ip}}).then(function(user){
                res.send("logout");
            });
        })
    .get("/logoutall" , function(req , res){
        var id = tokenInfo.toId(req.cookies.token);
        var ip = tokenInfo.toIp(req.cookies.token);
        database.sequelize.sync().then(function () {
            database.login.destroy({where : {uid: id}}).then(function(data){
                database.login.create({uid:id , ip:ip}).then(function(user){
                    res.send("logout");
                });
            });
        })
        })
    });


var session = require('./../config/session');
var userAuth = require('./../modules/user-auth');


module.exports = router;