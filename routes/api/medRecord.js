var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT
// @routes GET medRecord/add
// @desc Insert Data to medRecord_tb
// @accessible only to Patient and Admin

router.post('/add/:patientId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}      
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
    
console.log(decodedToken.data['email']);
console.log(decodedToken.data['accountId']);

var patientId = req.params.patientId;
var role = decodedToken.data['role'];
var fullName = req.body.fullName;
var date = req.body.date;
var record = req.body.record;

// connect to mysql database and perform INSERT Query
    if(role === "admin"){    
        sqlQuery = `INSERT INTO medRecord_tb (patientId, fullName, date, record) VALUES (${patientId},"${fullName}","${date}","${record}")`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "patient"){
        sqlQuery = `INSERT INTO medRecord_tb (patientId, fullName, date, record) VALUES (${patientId},"${fullName}","${date}","${record}")`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');  
    } 
});

module.exports = router;