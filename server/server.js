var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
	var todo_id = req.params.id;
	if(!ObjectID.isValid(todo_id)){
		return res.status(404).send();
	}

	Todo.findById(todo_id).then((todo) => {
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});
	},(e) => {
		res.status(400).send();
	});
});

//Patch /todos/:id
app.patch('/todos/:id/:text', (req, res) => {
	var id = req.params.id;
	var text = req.params.text;

	if(!ObjectID.isValid(id)){
		res.status(404);
	}

	Todo.findByIdAndUpdate(id, {
		$set:{
			text: text
		}
	}, {
		new: true
	}).then((newTodos) => {
		if(!newTodos){
			res.status(404).send();
		}
		res.send(newTodos);
	}).catch((e) => {
		res.status(400).send();
	});
});

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send("Invalid Id");
	}

	Todo.findByIdAndDelete(id).then((doc) => {
		res.status(200).send(doc);
	}).catch((e) => {
		res.status(404).send("Unable to delete todos "+ e);
	});
});



app.listen(port, () => {
	console.log(`Server listening to port ${port}`);
});

module.exports = {app};



