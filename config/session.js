var session = require("express-session");
module.exports = function(){
    return session({
        secret:'@m! 90lu6',
        resave: true,
        saveUninitialized: false
    })
}