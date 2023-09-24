const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 5000 || process.env.PORT;

const app = express();


app.use(cors());
app.use(bodyParser.json());

//MONGO DB CONNECTION CONFIGURATION
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB Connection Success !')
    app.listen(port,()=>{
        console.log(`Server Running On PORT ${port}`);
    })
});

//ROUTES HANDLING
//student router
const studentRouter = require('./routes/students');
app.use('/student', studentRouter);







