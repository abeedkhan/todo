var express = require("express");
var PORT = process.env.PORT || 3000;
var api = require("./config/api");
var router = require("./config/router");
var app = express({});
var cookieParser = require("cookie-parser");
var userAuth = require('./modules/user-auth');
app
    .use(cookieParser())
    .use(express.static('./public'))
    .use('/api',api)
    .use('/app' ,router)
    .get('/' , function(req , res){
        userAuth(req , function(data){
            if(data.isAuthenticated){
                res.redirect("/todos");
            }else{
                res.sendFile(__dirname+'/public/main.html');
            }
        });
    }).get('/users' , function(req , res){
    userAuth(req , function(data){
        if(data.isAuthenticated){
            res.sendFile(__dirname+'/public/main.html');
        }else{
            res.redirect("/");
        }
    });
})
    .get("*" , function(req , res){
        res.sendFile(__dirname+'/public/main.html');
    });
app.listen(PORT , function(){
    console.log(PORT);
});