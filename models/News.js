var mongodb = require('./mongodb'),
	Schema = mongodb.mongoose.Schema,
	NewsSchema = new Schema({
		title: String,
		content: String,
		type: String,
		author: String,
		create_date: {
			type: Date,
			default: Date.now
		}
	}),
	News = mongodb.mongoose.model('news', NewsSchema);
module.exports = News;
//查询所有
module.exports.queryNews = function(callback) {
	News.find({}, function(err, data) {
		callback(data);
	});
};
//id查询
module.exports.queryNewsDetails = function(id, callback) {
	News.findById(id, function(err, data) {
		callback(data);
	});
};
//id删除
module.exports.newsDelete = function(id) {
	News.findByIdAndRemove(id, function() {});
}