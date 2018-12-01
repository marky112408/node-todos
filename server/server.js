var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log("Unable to connect to mongodb server");
	}
	console.log("Connected to mongodb server");
});

var Todo = mongoose.model('Todos', {
	text: {type: String, required: true, minlength: 1, trim: true},
	completed: {type: Boolean, default: false},
	completedAt: {type: Number, default: null}
});

var User = mongoose.model("Users", {
	email: {
		type: String,
		required: true,
		minlength: 10,
		trim: true
	}
})

var newTodo = new Todo({
	text: "Learn Node",
	completed: false,
	completedAt: 11302018
});

var otherTodo = new Todo({
	text: "Find high salary job",
	completed: false,
	completedAt: 0
});

var newUser = new User({
	email: "neri"
});

newUser.save().then((res) => {
	console.log(JSON.stringify(res, undefined, 2));
}, (err) => {
	console.log("Unable to create new user", JSON.stringify(err, undefined, 2));
});

// newTodo.save().then((res) => {
// 	console.log("Created new todo", res);
// }, (err) => {
// 	console.log("Unable to create new todo", err);
// });

// otherTodo.save().then((res) => {
// 	console.log("Created new todo", res);
// }, (err) => {
// 	console.log("Unable to create new todo", err);
// });


