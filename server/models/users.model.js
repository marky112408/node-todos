var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model("Users", {
	email: {
		type: String,
		required: true,
		minlength: 10,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 10
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

module.exports = {User};