var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');


var app = express();

hbs.localsAsTemplateData(app);

app.locals.DEBUG = process.env.DEBUG;
// DOESNT WORK :( 
// Handlebars Custom Helpers
// hbs.registerHelper('reverseWord', function (value) {
//     var reversedWord = value.split("").reverse().join("");
//     return reveredWord;
// });
// //

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
//////////// 413 Error (Request Entity Too Large Solution) ///////////////
// app.use(express.bodyParser({limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

//trailing slashes 
app.use(function(req, res, next) {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
        console.log('HANDLED')

    } else {
        next();
    }
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