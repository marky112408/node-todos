var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todos.model.js');
var {User} = require('./models/users.model.js');

var app = express();
var port = process.env.PORT || 3000; 

app.use(bodyParser.json());

//POST /todos
app.post('/todos', (req, res) => {
	var todos = new Todo({
		text: req.body.text
	});

	todos.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

//GET /todos
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.status(200).send({todos});
	},(e) => {
		if(e){
			res.status(400).send(e);
		}
	});
});


app.listen(port, () => {
	console.log(`Server listening to port ${port}`);
});



