var express = require('express');
var router = express.Router();
var News = require('../models/News');
/* GET home page. */
router.get('/', function(req, res, next) {
	News.queryNews(function(data) {
		res.render('index', {
			title: 'Express',
			newsData: data
		});
	});
});

module.exports = router;