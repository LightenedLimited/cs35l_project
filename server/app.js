var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); 
var dotenv = require('dotenv');
var session = require('express-session')
const cors = require('cors')

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //one day
    },
    saveUninitialized: true,
    resave: false, 
    credentials: true
}))
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true,}))


app.use((req, res, next) => {
    console.log('lets get this middleware thing going')
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Credentials",
      "true"
    );
    next();
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/pdfs", pdfsRouter); 

module.exports = app;
