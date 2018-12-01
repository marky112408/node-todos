const {MongoClient, ObjectID} = require("mongodb");
MongoClient.connect("mongodb://localhost:27017/TodoApp", {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb server", err);
	}
	console.log("Connected to mongodb server");

	const db = client.db("TodoApp");

	db.collection("Users").findOneAndUpdate({
		_id: new ObjectID('5bffbe3003b97b059c8998bf')
	},{
		$set: {
			name: "Patrick"
		},
		$inc: {
			age: +5
		}
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(JSON.stringify(result.value, undefined, 2));
	});

	client.close();
});