var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT
// @routes POST appointment/add/:doctorId
// @desc Insert Data to Database
// @accessible only to Doctor and Admin
router.post('/add/:doctorId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];   
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}
        
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var doctorId = req.params.doctorId;
var patientId = req.body.patientId;
var doctorName = req.body.doctorName;    
var patientName = req.body.patientName;
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var role = decodedToken.data['role'];
        
    if(role === "admin"){    
        sqlQuery = `INSERT INTO appointment_tb (doctorId, patientId, patientName, doctorName, date, time, meetingLink) VALUES (${doctorId}, ${patientId}, "${patientName}","${doctorName}","${date}","${time}","${meetingLink}")`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "doctor"){
        sqlQuery = `INSERT INTO appointment_tb (doctorId, patientId, patientName, doctorName, date, time, meetingLink) VALUES (${doctorId}, ${patientId}, "${patientName}","${doctorName}","${date}","${time}","${meetingLink}")`;
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
// @routes GET appointment/view/:appointmentId
// @desc View Data from the Database
// @accessible to All Roles

router.get('/view/:appointmentId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
        
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};

var appointmentId = req.params.appointmentId

const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
        
    sqlQuery = `SELECT * FROM appointment_tb WHERE appointmentId = ${appointmentId}`;
    dbConn.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
    res.status(200).json(results);
    });
});

// UPDATE
// @routes POST/appointment/update/:appointmentId
// @desc Update Data to Database
// @accessible only to Doctors and Admin

router.post('/update/:appointmentId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
        
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                   
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
    
var appointmentId = req.params.appointmentId;
var patientId = req.body.patientId;
var doctorName = req.body.doctorName;    
var patientName = req.body.patientName;
var date = req.body.date;
var time = req.body.time;
var meetingLink = req.body.meetingLink;
var role = decodedToken.data['role'];
            
    if (role === "admin"){
        sqlQuery = `UPDATE appointment_tb SET patientId = "${patientId}", patientName = "${patientName}", doctorName = "${doctorName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}" WHERE appointmentId = ${appointmentId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
    });
    }else if (role === "doctor"){
        sqlQuery = `UPDATE appointment_tb SET patientId = "${patientId}", patientName = "${patientName}", doctorName = "${doctorName}", date = "${date}", time = "${time}", meetingLink = "${meetingLink}" WHERE appointmentId = ${appointmentId}`;
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
// @routes DELETE /appointment/delete/:appointmentId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:appointmentId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                   
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
console.log(req.params.patientId);
    
var appointmentId = req.params.appointmentId;
var role = decodedToken.data['role'];
    
    if (role === "admin"){
        sqlQuery = `DELETE FROM appointment_tb WHERE appointmentId = ${appointmentId}`;
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