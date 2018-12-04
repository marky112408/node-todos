var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://marky112408:soulripper112408@ds225294.mlab.com:25294/todos_app' || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb server");
	}
	// console.log("Connected to mongodb server");
});

module.exports = {mongoose};