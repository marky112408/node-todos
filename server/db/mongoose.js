var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb server");
	}
	// console.log("Connected to mongodb server");
});

module.exports = {mongoose};