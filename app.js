var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var fileupload = require('express-fileupload')
//Require router :
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var apiRouter = require('./routes/apiRouter');

// Dotenv"
require('dotenv').config()

// Mongoose:
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
  useCreateIndex : true,
  useFindAndModify: false,
  useNewUrlParser : true,
  useUnifiedTopology : true,
},err=>{
  if(err) throw err
  console.log('MongoDB To Connect')
})

var app = express();
//File upload:
app.use(fileupload({
  useTempFiles : true
}))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('Client/build'))
  app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'))
  })
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Router :
app.use('/', indexRouter);
app.use('/user',usersRouter)
app.use('/api',apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
