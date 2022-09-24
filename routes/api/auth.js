var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var dbConn = require('../../config/db');

// SIGNUP
// @routes POST /auth/signup
// @desc Signup to Database
// @accessible to all Roles

router.post('/signup',(req,res,next) => {
var username = req.body.username;
var email = req.body.email;
var password = req.body.password;
var role = req.body.role;
accountId = " ";

try {
sqlQuery = `INSERT INTO account_tb (username, role, email, password) VALUES ("${username}","${role}","${email}","${password}")`;
dbConn.query (sqlQuery, function(error,results, fields) {
    console.log(results.insertId);
    accountId = results.insertId;
    res.status(200).json({success:true,accountId:accountId});
});
} catch (error) {
    console.log(results);
    return next(error)
}
});

// LOGIN
// @routes POST /auth/login
// @desc Login to Database
// @accessible to all Roles

router.post('/login',(req,res,next) => {
        var email = req.body.email;
        var password = req.body.password;
    
try {
sqlQuery = `SELECT * FROM account_tb WHERE email="${email}" AND password="${password}"`;
dbConn.query (sqlQuery, function(error,results) {
    console.log(results);
    Object.keys(results).forEach(function(key){
var row = results[key];
var accountId = row.accountId;
var username = row.username;
var email = row.email;
var role = row.role;
var data = {
    accountId:row.accountId,
    username:row.username,
    email:row.email,
    role:row.role,
};

//Create Token
token = jwt.sign({data:data},process.env.SECRET_TOKEN,{expiresIn: '1h'});

res.status(200).json({success:true,token:token});
});
});
} catch (error) {
    console.log(error);
    return next(error)
}
});

module.exports = router;