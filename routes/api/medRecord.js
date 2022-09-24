var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT
// @routes POST medRecord/add/:patientId
// @desc Insert Data to Database
// @accessible only to Patient and Admin

router.post('/add/:patientId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}      
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
    
console.log(decodedToken.data);
console.log(req.body);

var patientId = req.params.patientId;
var role = decodedToken.data['role'];
var fullName = req.body.fullName;
var date = req.body.date;
var record = req.body.record;

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
        console.log(msg = "Error: Role Does Not Fit!");
    } 
});

// SELECT OR SEARCH
// @routes GET medRecord/view/:patientId
// @desc View Data from the Database
// @accessible to All Roles

router.get('/view/:patientId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}      
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var patientId = req.params.patientId;

sqlQuery = `SELECT * FROM medRecord_tb WHERE patientId = ${patientId}`;
dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({
    msg: 'Data Successfully Fetched',
    results: results,
    });
    console.log(msg = "Data Successfully Fetched!")
});
});

// UPDATE
// @routes POST/medRecord/update/:patientId
// @desc Update Data to Database
// @accessible only to Patient and Admin

router.post('/update/:patientId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
               
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var patientId = req.params.patientId;
var fullName = req.body.fullName;
var date = req.body.date;
var record = req.body.record;
var role = decodedToken.data ['role'];
        
    if (role === "admin"){
        sqlQuery = `UPDATE medRecord_tb SET fullName = "${fullName}", date = "${date}", record = "${record}" WHERE patientId = ${patientId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
        });
    }else if (role === "patient"){
        sqlQuery = `UPDATE medRecord_tb SET fullName = "${fullName}", date = "${date}", record = "${record}" WHERE patientId = ${patientId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
            });
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');
        console.log(msg = "Error: Role Does Not Fit!");
    } 
});

// DELETE
// @routes DELETE /medRecord/delete/:medRecordId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:medRecordId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                   
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
    
var medRecordId = req.params.medRecordId;
var role = decodedToken.data['role'];
    
    if (role === "admin"){
        sqlQuery = `DELETE FROM medRecord_tb WHERE medRecordId = ${medRecordId}`;
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Deleted',
        results: results,
            });
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');
        console.log(msg = "Error: Role Does Not Fit!");  
    };
});


module.exports = router;