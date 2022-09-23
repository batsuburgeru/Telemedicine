var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT
// @routes GET patient/add
// @desc Insert Data to patient_tb
// @accessible only to Doctor and Admin
router.post('/add/:appointmentId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}
            
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
  
var appointmentId = req.params.appointmentId;
var patientName = req.body.patientName;    
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var status = req.body.status;
var role = decodedToken.data['role'];
            
    if(role === "admin"){    
        sqlQuery = `INSERT INTO patientTransaction_tb (appointmentId, patientName, date, time, meetingLink, status) VALUES (${appointmentId}, "${patientName}","${date}","${time}","${meetingLink}", "${status}")`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "doctor"){
        sqlQuery = `INSERT INTO patientTransaction_tb (appointmentId, patientName, date, time, meetingLink, status) VALUES (${appointmentId}, "${patientName}","${date}","${time}","${meetingLink}", "${status}")`;
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

// SELECT OR VIEW
// @routes GET patientTransaction/view
// @desc View Data from the Database
// @accessible to Patient and Admin

router.get('/view/:transactionId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
            
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
      
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
var transactionId = req.params.transactionId;
     
    if(role === "admin"){
        sqlQuery = `SELECT * FROM doctorTransaction_tb WHERE transactionId = ${transactionId}`;
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "patient"){
        sqlQuery = `SELECT * FROM doctorTransaction_tb WHERE referenceId = ${transactionId}`;
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json(results);
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');
        console.log(msg = "Error: Role Does Not Fit!");
    } 
});

// UPDATE
// @routes POST/patientTransaction/update/:referenceId
// @desc Update Data to Database
// @accessible only to Doctors and Admin

router.post('/update/:transactionId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
           
    if (!token){
       res.status(200).json({success:false,msg:'Error: Token was not found'});
    };
                       
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
        
var transactionId = req.params.transactionId;
var doctorName = req.body.doctorName;    
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var status = req.body.status;
var role = decodedToken.data['role'];
                
    if (role === "admin"){
        sqlQuery = `UPDATE doctorTansaction_tb SET patientName = "${patientName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}", status = "${status}" WHERE transactionId = ${transactionId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
    });
    }else if (role === "doctor"){
        sqlQuery = `UPDATE doctorTansaction_tb SET patientName = "${patientName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}", status = "${status}" WHERE transactionId = ${transactionId}`;
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
// @routes POST /patientTransaction/delete/:referenceId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:transactionId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
        
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                       
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
console.log(req.params.patientId);
        
var transactionId = req.params.transactionId;
var role = decodedToken.data['role'];
        
    if (role === "admin"){
        sqlQuery = `DELETE FROM doctorTransaction_tb WHERE transactionId = ${transactionId}`;
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
    };
});

module.exports = router;