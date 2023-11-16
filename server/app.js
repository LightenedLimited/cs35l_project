var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); 
const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pdfsRouter = require("./routes/pdfs"); 

var app = express();

dotenv.config(); 

mongoose.connect(process.env.MONGODB_ACCESS).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err); 
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/pdfs", pdfsRouter); 

module.exports = app;
