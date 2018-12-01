var {mongoose} = require('./../server/db/mongoose.js');
var {ObjectID} = require('mongodb');
var {Todo} = require('./../server/models/todos.model.js');
var {User} = require('./../server/models/users.model.js');

var todo_id = '5c0209bd626a8630e4a90158';
var user_id = '5c0145bc8c565c27388a7e6011';
if(!ObjectID.isValid(todo_id)){
	return console.log("Invalid todo id");
}

if(!ObjectID.isValid(user_id)){
	return console.log("Invalid user id");
}

Todo.findById(todo_id).then((todo) => {
	if(!todo){
		console.log("Todo unable to find");
	}
	console.log("Todo ", todo);
}).catch((e) => {
	console.log(e);
});

User.findById(user_id).then((user) => {
	if(!user){
		return console.log("User was not found");
	}
	console.log("User", user);
}).catch((e) => {
	console.log(e);
});