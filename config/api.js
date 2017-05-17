var express = require("express")
var router = express.Router();
var crypto = require('crypto');
var cryptoJs = require('crypto-js');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require('./../config/session');
var database = require('./../config/database');
var ipinfo = require("./../modules/ipinfo");
var path = require('path');
router
    .use(session())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:false}))
    .use(function (req , res , next) {
        if(!req.user) req.user = {id:1}
        next();
    })
    .route('/user')
    .get(function(req , res){
        database.sequelize.sync().then(function () {
            database.user.findAll({}).then(function(items){
                res.json(items);
            });
        });
    });
    router.route('/todo')
     .get(function(req , res){
            database.sequelize.sync().then(function () {
                database.todo.findAll({}).then(function(items){
                    res.json(items);
                });
            });
        })
        .delete(function (req, res) {
            database.sequelize.sync().then(function () {
                database.todo.destroy({ where: { uid: [1] }}).then(function () {
                    res.send("deleted");
                })
            });
        })
        .post(function (req, res) {
            database.sequelize.sync().then(function () {
                database.todo.create({
                    uid:1,
                    status:req.body.status,
                    title:req.body.title,
                    detail:req.body.detail
                });
                res.send('created')
            });
        });
    router.post("/deleteSelected" , function (req , res) {
        database.sequelize.sync().then(function () {
            database.todo.destroy({ where: { tid: req.body.data.slectedTodos }}).then(function () {
                res.send("deleted");
            })
        });
});
    router
        .param('tid' , function(req , res , next){
            req.dbQuery = {where : {tid: req.params.tid}};
            next();
        })
        .route('/todo/:tid')
        .get(function (req, res) {
            database.sequelize.sync().then(function () {
                database.todo.find(req.dbQuery).then(function(item){
                    res.json(item);
                });
            });
        })
        .post(function(req , res){
            database.sequelize.sync().then(function () {
                database.todo.update(req.body , req.dbQuery).then(function(item){
                    res.send("yes");
                });
            });
        })
    router
        .param('id' , function(req , res , next){
        req.dbQuery = {where : {uid: parseInt(req.params.id , 10)}};
            next();
    })
        .route('/user/:id')
        .get(function (req, res) {
                database.sequelize.sync().then(function () {
                    database.user.find(req.dbQuery).then(function(item){
                        res.json(item);
                    });
                });
                })
        .put(function (req, res) {
            var changes = req.body;
            database.sequelize.sync().then(function () {
                database.user.update(changes , req.dbQuery).then(function(item){
                    res.send("yes");
                        });
                    });
                });
    router.get("/add" , function(req, res){
        var data = [{"uid":1,"companyid":null,"email":"g@b.com","firstName":"ratul","lastName":"ali","status":"disabled","role":"admin","createdAt":"2016-09-19T22:02:30.256Z","updatedAt":"2016-09-19T22:02:30.256Z"},{"uid":2,"companyid":null,"email":"f@b.com","firstName":"sakil","lastName":"uddin","status":"disabled","role":"admin","createdAt":"2016-09-19T22:02:49.904Z","updatedAt":"2016-09-19T22:02:49.904Z"},{"uid":3,"companyid":null,"email":"e@b.com","firstName":"sibat","lastName":"ali","status":"invited","role":"user","createdAt":"2016-09-19T22:03:05.393Z","updatedAt":"2016-09-22T07:14:10.629Z"},{"uid":4,"companyid":null,"email":"d@b.com","firstName":"anik","lastName":"sikder","status":"invited","role":"user","createdAt":"2016-09-19T22:03:16.554Z","updatedAt":"2016-09-23T05:59:44.619Z"},{"uid":5,"companyid":null,"email":"c@b.com","firstName":"rahat","lastName":"khan","status":"disabled","role":"guest","createdAt":"2016-09-19T22:03:23.117Z","updatedAt":"2016-09-19T22:03:23.117Z"},{"uid":6,"companyid":null,"email":"b@b.com","firstName":"rahat","lastName":"hossain","status":"registered","role":"user","createdAt":"2016-09-20T19:22:28.718Z","updatedAt":"2016-09-20T19:22:28.718Z"},{"uid":7,"companyid":null,"email":"a@b.com","firstName":"rubel","lastName":"sheikh","status":"registered","role":"user","createdAt":"2016-09-20T19:23:20.125Z","updatedAt":"2016-09-21T20:40:07.495Z"}]
        database.sequelize.sync({force:true}).then(function () {
            data.forEach(function (item, key, arr) {
                database.user.create({
                    uid:item.uid,
                    email:item.email,
                    firstName:item.firstName,
                    lastName:item.lastName,
                    status:item.status,
                    role:item.role,
                    password:"d6d438f0e9d7f7bc258ad6a5f7fe3e8f1dfafd170fb5e020c8bf4bc7e1b25428"
                });
            })
        });
        res.send('user created')
    });
router.get("/todoadd" , function(req, res){
    var data = [
                {"uid":1,"status":"done", "title":"Lorem ipsum","detail":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
                {"uid":1,"status":"doing", "title":"Etiam facilisis","detail":"Ut finibus elementum odio, eget bibendum libero tempus et "},
                {"uid":1,"status":"have to", "title":"Mauris non","detail":"raesent fermentum molestie diam et interdum"},
                {"uid":1,"status":"done", "title":"Vestibulum","detail":"Sed quis cursus sem. Pellentesque interdum in ex sit amet lacinia"},
                {"uid":1,"status":"doing", "title":"Donec et","detail":"Donec et ex tempus, eleifend mauris at"},
                {"uid":1,"status":"done", "title":"Pellentesque interdum","detail":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
                {"uid":1,"status":"doing", "title":"Vestibulum a odio","detail":"Ut finibus elementum odio, eget bibendum libero tempus et "},
                {"uid":1,"status":"have to", "title":"Etiam facilisis","detail":"raesent fermentum molestie diam et interdum"},
                {"uid":1,"status":"done", "title":"Mauris magna","detail":"Sed quis cursus sem. Pellentesque interdum in ex sit amet lacinia"},
                {"uid":1,"status":"doing", "title":"Cras aliquam","detail":"Donec et ex tempus, eleifend mauris at"}
               ];
    database.sequelize.sync({}).then(function () {
        data.forEach(function (item, key, arr) {
            database.todo.create({
                uid:item.uid,
                status:item.status,
                title:item.title,
                detail:item.detail
            });
        })
    });
    res.send(' created')
});
    router.post("/login" , function (req, res) {
        var email = req.body.email;
        var rowPassword = req.body.password;
        var secret = 'khan';
        var password = crypto.createHmac('sha256', secret)
            .update(rowPassword)
            .digest('hex');
        console.log(password)
        database.sequelize.sync().then(function () {
            database.user.find({where : {email: email , password:password}}).then(function(user){
                if(user){
                    ipinfo(function (ipAddress) {
                        var logInInfo = JSON.stringify({uid:user.uid , ip:ipAddress});
                        var secretKey = '@6!d';
                        var token = cryptoJs.AES.encrypt(logInInfo, secretKey).toString();
                        res.cookie('token', token, { maxAge: 9000000000, httpOnly: true });
                        database.login.create({
                            uid:user.uid,
                            ip:ipAddress
                        });
                        res.send(true);
                    });
                }else{
                    res.send(false)
                }
            });
        });
    });
module.exports = router;