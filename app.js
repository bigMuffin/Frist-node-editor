var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ueditor = require("ueditor");
var routes = require('./routes/index');
var users = require('./routes/users'),
	//test-----------------------------------------------------------------
	news = require('./routes/news'),
	http = require('http');
var app = express();
//test end-------------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/news', news);
//session
app.use(cookieParser('sessiontest'));
app.use(session({
	secret: 'sessiontest', //与cookieParser中的一致
	resave: true,
	saveUninitialized: true
}));
//上传图片
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {
		var foo = req.ueditor;

		var imgname = req.ueditor.filename;

		var img_url = '/images/ueditor/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = '/images/ueditor/';
		res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {
		// console.log('config.json')
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/ueditor/nodejs/config.json');
	}
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;