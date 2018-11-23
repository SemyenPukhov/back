var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');
//var usersRouter = require('./routes/users');
//var registrationRouter = require('./сontrollers/user.cntr');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(cors());


app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.use('/users', usersRouter);

// app.use('/reg', registrationRouter);
app.use(bodyParser.json());
app.use(require('./controllers'));

/*app.use(express.static(__dirname + '/public'))
app.use(require('./middlewares/users'))
app.use(require('./controllers'))
*/

// app.listen(3001, function() {
//   console.log('Listening on port 3005...')
// })



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
