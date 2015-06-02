var mongoose = require('mongoose');
mongoose.connect('mongodb://lfc-test:72267455@ds055689.mongolab.com:55689/lfc-test');
exports.mongoose = mongoose;