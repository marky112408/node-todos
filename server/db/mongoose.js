var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb server");
	}
	console.log("Connected to mongodb server");
});

module.exports = {mongoose};