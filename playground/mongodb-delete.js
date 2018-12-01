const {MongoClient, ObjectID} = require("mongodb");
MongoClient.connect("mongodb://localhost:27017/TodoApp", {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb");
	}

	console.log("Connected to mongodb database");

	const db = client.db("TodoApp");

	// deleteMany
	// db.collection("Users").deleteMany({name: "Andrew"}).then((res) => {
	// 	console.log(res);
	// });

	//deleteOneFindOne
	db.collection("Users").findOneAndDelete({_id: new ObjectID('5bffc165bba2b42ddc675ada')}).then((result) => {
		console.log(result);
		console.log(JSON.stringify(result.value, undefined, 2));
	});

	client.close();
});
