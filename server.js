const express = require('express');
require('dotenv').config({path:'./.env'});

const app = express();
app.use(express.json());


const auth = require('./routes/api/auth.js');
const patient = require('./routes/api/patient.js');
const doctor = require('./routes/api/doctor.js');
const medRecord = require('./routes/api/medRecord.js');

app.get('/', (req, res) => res.send('API RUNNING'));
// init Middleware
app.use(express.json({ extended: false }));

app.use('/auth', auth);
app.use('/patient', patient);
app.use('/doctor', doctor);
app.use('/medRecord', medRecord);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

