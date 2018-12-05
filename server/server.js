var env = process.env.NODE_ENV || 'development';
process.env.MONGODB_URI = 'mongodb://marky112408:soulripper112408@ds225294.mlab.com:25294/todos_app';
if(env == "development"){
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env == "test"){
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

var _ = require('lodash');
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
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	// var completed = req.params.completed;
	var body = _.pick(req.body, ['text', 'completed']);
	body.completed = true;

	if(!ObjectID.isValid(id)){
		res.status(404);
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completedAt = null;
		body.completed = false;
	}

	Todo.findByIdAndUpdate(id, { $set: body}, {new: true}).then((doc) => {
		if(!doc){
			res.status(404).send();
		}
		res.send(doc);
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

//POST /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var newUser = new User(body);
	newUser.save().then((users) => {
		res.status(200).send(users);
	}, (err) => {
		res.status(400).send(err);
	});
});

//GET /users
app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.status(200).send({users});
	}).catch((err) => {
		res.status(400).send(err);
	});
});

//GET /users/:id
app.get('/users/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}

	User.findById(id).then((user) => {
		if(!user){
			res.status(404).send();
		}

		res.status(200).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});

//DELETE /users/:id
app.delete('/users/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}

	User.findByIdAndDelete(id).then((user) => {
		if(!user){
			res.status(404).send();
		}

		res.send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//PATCH /users/:id
app.patch('/users/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['email', 'password']);
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}
	User.findByIdAndUpdate(id, {
		$set: body
	},{ new: true}).then((user) => {
		res.send(user);
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log(`Server listening to port ${port}`);
});

module.exports = {app};



