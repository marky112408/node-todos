// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // es6 object deconstruction;
MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
	if(err){
		console.log("Unable to connect to mongodb server");
	}else{
		console.log("Connected to MongoDb server");
	}
	// const db = client.db("TodoApp");
	// db.collection('Todos').insertOne({
	// 	text: "Something to do 2",
	// 	completed: true
	// }, (err, result) => {
	// 	if(err){
	// 		console.log("Unable to insert todo");
	// 	}else{
	// 		console.log(JSON.stringify(result.ops, undefined, 2));
	// 	}
	// });

	// db.collection("Users").insertOne({
	// 	name: "Ace",
	// 	age: 22,
	// 	location: "Nueva Ecija"
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log("Unable to insert user". err);
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	client.close();

})