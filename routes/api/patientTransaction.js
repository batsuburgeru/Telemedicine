var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT
// @routes POST patientTransaction/add/:appointmentId
// @desc Insert Data to patient_tb
// @accessible only to Doctor and Admin

router.post('/add/:appointmentId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}
            
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body); 

var appointmentId = req.params.appointmentId;
var doctorName = req.body.doctorName;    
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var status = req.body.status;
var role = decodedToken.data['role'];
            
    if(role === "admin"){    
        sqlQuery = `INSERT INTO patientTransaction_tb (appointmentId, doctorName, date, time, meetingLink, status) VALUES (${appointmentId}, "${doctorName}","${date}","${time}","${meetingLink}", "${status}")`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "doctor"){
        sqlQuery = `INSERT INTO patientTransaction_tb (appointmentId, doctorName, date, time, meetingLink, status) VALUES (${appointmentId}, "${doctorName}","${date}","${time}","${meetingLink}", "${status}")`;
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
// @routes GET patientTransaction/view/:referenceId
// @desc View Data from the Database
// @accessible to Patient and Admin

router.get('/view/:referenceId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
            
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
      
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var referenceId = req.params.referenceId;
     
    if (role === "admin"){
        sqlQuery = `SELECT * FROM patientTransaction_tb WHERE referenceId = ${referenceId}`;
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "patient"){
        sqlQuery = `SELECT * FROM patientTransaction_tb WHERE referenceId = ${referenceId}`;
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

router.post('/update/:referenceId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
           
    if (!token){
       res.status(200).json({success:false,msg:'Error: Token was not found'});
    };
                       
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
        
var referenceId = req.params.referenceId;
var doctorName = req.body.doctorName;    
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var status = req.body.status;
var role = decodedToken.data['role'];
                
    if (role === "admin"){
        sqlQuery = `UPDATE appointment_tb SET doctorName = "${doctorName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}", status = "${status}" WHERE referenceId = ${referenceId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
    });
    }else if (role === "doctor"){
        sqlQuery = `UPDATE appointment_tb SET doctorName = "${doctorName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}", status = "${status}" WHERE referenceId = ${referenceId}`;
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
// @routes DELETE /patientTransaction/delete/:referenceId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:referenceId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
        
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                       
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
        
var referenceId = req.params.referenceId;
var role = decodedToken.data['role'];
        
    if (role === "admin"){
        sqlQuery = `DELETE FROM patientTransaction_tb WHERE referenceId = ${referenceId}`;
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