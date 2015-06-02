var express = require('express');
var router = express.Router();
var News = require('../models/News.js');
var path = require('path');
//新闻首页
router.get('/', function(req, res, next) {
	News.queryNews(function(data) {
		res.render('index', {
			title: 'Express',
			newsData: data
		});
	});
});
//添加
router.get('/add', function(req, res) {
	res.render('news_add', {
		data: ''
	});
});
router.post('/add', function(req, res) {
	if (!req.body.title || !req.body.content || !req.body.type || !req.body.author) {
		res.render('news_add', {
			msg: '添加失败，请检查未填项 '
		});
		return false
	}
	News.create({
		title: req.body.title,
		content: req.body.content,
		type: req.body.type,
		author: req.body.author
	}, function(err, small) {
		if (err) return false
		res.render('news_add', {
			msg: '添加成功'
		});
	});
});
//详情
router.get('/:id', function(req, res) {
	News.queryNewsDetails(req.params.id, function(data) {
		res.render('news_details', {
			data: data
		});
	});
});
//删除
router.get('/del/:id', function(req, res) {
	News.newsDelete({
		_id: req.params.id
	}, function(err, docs) {
		console.log(err);
	});
	res.redirect('/news');
});
module.exports = router