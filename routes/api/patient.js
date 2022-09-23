var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

var dbConn = require('../../config/db.js');

// INSERT
// @routes GET patient/add
// @desc Insert Data to patient_tb
// @accessible only to Patients and Admin
router.post('/add',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];
    
if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
}
    
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

console.log(decodedToken.data['email']);
console.log(decodedToken.data['accountId']);

var fullName = req.body.fullName;
var gender = req.body.gender;
var dateOfBirth = req.body.dateOfBirth;
var email = decodedToken.data['email'];
var accountId = decodedToken.data['accountId'];
var address = req.body.address;
var cellphoneNumber = req.body.cellphoneNumber;
var role = decodedToken.data['role'];
    
// connect to mysql database and perform INSERT Query
    if(role === "admin"){    
        sqlQuery = `INSERT INTO patient_tb (accountId, fullName, gender, dateOfBirth, email, address, cellphoneNumber) VALUES (${accountId},"${fullName}","${gender}","${dateOfBirth}","${email}","${address}",${cellphoneNumber})`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "patient"){
        sqlQuery = `INSERT INTO patient_tb (accountId, fullName, gender, dateOfBirth, email, address, cellphoneNumber) VALUES (${accountId},"${fullName}","${gender}","${dateOfBirth}","${email}","${address}",${cellphoneNumber})`;
        dbConn.query(sqlQuery, function( error, results, fields ){ 
            if (error) throw error;
        res.status(200).json(results);
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');  
} 
});

//SELECT OR VIEW
// @routes GET patient/view
// @desc View Data from the Database
// @accessible only to Admin and Doctors

router.get('/view', (req, res) => {
const token = req.headers.authorization.split(' ')[1];

if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
       
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);

var role = decodedToken.data['role'];

    if(role === "admin"){
        sqlQuery = 'SELECT * FROM patient_tb';
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json(results);
        });
    } else if (role === "doctor"){
        sqlQuery = 'SELECT * FROM patient_tb';
        dbConn.query(sqlQuery, function (error, results, fields) {
            if (error) throw error;
        res.status(200).json(results);  
        });
    } else { 
        res.status(200).json(
        noAccess = 'You have no access');  
} 
});

// UPDATE
// @routes POST /patient/update/:patientId
// @desc Update Data to Database
// @access Private (Only Patients and Admin can update the patient_tb)
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
var gender = req.body.gender;
var dateOfBirth = req.body.dateOfBirth;
var email = req.body.email;
var address = req.body.address;
var cellphoneNumber = req.body.cellphoneNumber;
var role = decodedToken.data['role'];
    
    if (role === "admin"){
      sqlQuery = `UPDATE patient_tb SET fullName = "${fullName}", gender = "${gender}", dateOfBirth = "${dateOfBirth}", email = "${email}", address = "${address}", cellphoneNumber = ${cellphoneNumber} WHERE patientId = ${patientId}`;
      dbConn.query(sqlQuery,  function( error, results, fields ){ 
        if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Updated',
        results: results,
        });
      });
    }else if (role === "patient"){
        sqlQuery = `UPDATE patient_tb SET fullName = "${fullName}", gender = "${gender}", dateOfBirth = "${dateOfBirth}", email = "${email}", address = "${address}", cellphoneNumber = ${cellphoneNumber} WHERE patientId = ${patientId}`;
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
// @routes POST /patient/delete/:patientId
// @desc DELETE Data to Database
// @accessible only to Admin

router.delete('/delete/:patientId', (req, res) => {
const token = req.headers.authorization.split(' ')[1];

if (!token){
    res.status(200).json({success:false,msg:'Error: Token was not found'});
};
               
const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
console.log(decodedToken.data);
console.log(req.body);
console.log(req.params.patientId);

var patientId = req.params.patientId;
var role = decodedToken.data['role'];

    if (role === "admin"){
        sqlQuery = `DELETE FROM patient_tb WHERE patientId = ${patientId}`;
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