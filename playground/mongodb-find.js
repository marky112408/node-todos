// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // es6 object deconstruction;
MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
	if(err){
		console.log("Unable to connect to mongodb server");
	}else{
		console.log("Connected to MongoDb server");
	}
	const db = client.db("TodoApp");

	// db.collection("Todos").find({_id: new ObjectID('5bffb66488ffab2aec185398') }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// },(err) => {
	// 	console.log("Unable to fetch Data");
	// });

	db.collection("Users").find({name: "Patrick"}).toArray().then((docs) => {
		// console.log("Todos Count: ", count);
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log("Unable to count todos");
	});

	client.close();
});