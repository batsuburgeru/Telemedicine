var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// INSERT 
// @routes POST doctor/add
// @desc View Data from the Database
// @accessible only to Admin and Doctors
router.post('/add',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}
    
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var fullName = req.body.fullName;
var gender = req.body.gender;
var dateOfBirth = req.body.dateOfBirth;
var email = decodedToken.data['email'];
var accountId = decodedToken.data['accountId'];
var address = req.body.address;
var qualificationDesc = req.body.qualificationDesc;
var cellphoneNumber = req.body.cellphoneNumber;
var role = decodedToken.data['role'];
    
// connect to mysql database and perform INSERT Query
    if(role === "admin"){
        sqlQuery = `INSERT INTO doctor_tb (accountId,fullName, gender, dateOfBirth, email, address, qualificationDesc, cellphoneNumber) VALUES ("${accountId}","${fullName}","${gender}","${dateOfBirth}","${email}","${address}","${qualificationDesc}",${cellphoneNumber})`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "doctor"){
        sqlQuery = `INSERT INTO doctor_tb (accountId,fullName, gender, dateOfBirth, email, address, qualificationDesc, cellphoneNumber) VALUES ("${accountId}","${fullName}","${gender}","${dateOfBirth}","${email}","${address}","${qualificationDesc}",${cellphoneNumber})`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');  
} 
});

// SELECT OR VIEW
// @routes GET doctors/view/:doctorId
// @desc View Data from the Database
// @accessible to All Roles

router.get('/view/:doctorId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
           
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var doctorId = req.params.doctorId;

    sqlQuery = `SELECT * FROM doctor_tb WHERE doctorId = ${doctorId}`;
    dbConn.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
    res.status(200).json(results);
    });
});

// UPDATE
// @routes POST/doctor/update/:doctorId
// @desc Update Data to Database
// @accessible only to Doctors and Admin

router.post('/update/:doctorId',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
               
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);

var doctorId = req.params.doctorId;
var fullName = req.body.fullName;
var gender = req.body.gender;
var dateOfBirth = req.body.dateOfBirth;
var email = decodedToken.data['email'];
var address = req.body.address;
var qualificationDesc = req.body.qualificationDesc;
var cellphoneNumber = req.body.cellphoneNumber;
var role = decodedToken.data['role'];
        
    if (role === "admin"){
        sqlQuery = `UPDATE doctor_tb SET fullName = "${fullName}", gender = "${gender}", dateOfBirth = "${dateOfBirth}", email = "${email}", address = "${address}", qualificationDesc = "${qualificationDesc}", cellphoneNumber = ${cellphoneNumber} WHERE doctorId = ${doctorId}`;
        dbConn.query(sqlQuery,  function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
    });
    }else if (role === "doctor"){
        sqlQuery = `UPDATE doctor_tb SET fullName = "${fullName}", gender = "${gender}", dateOfBirth = "${dateOfBirth}", email = "${email}", address = "${address}", qualificationDesc = "${qualificationDesc}", cellphoneNumber = ${cellphoneNumber} WHERE doctorId = ${doctorId}`;
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
    } 
});
    
// DELETE
// @routes DELETE /doctor/delete/:doctorId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:doctorId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
                   
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
    
var doctorId = req.params.doctorId;
var role = decodedToken.data['role'];
    
    if (role === "admin"){
        sqlQuery = `DELETE FROM doctor_tb WHERE doctorId = ${doctorId}`;
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