var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function(){
	var userObject = this.toObject();
	return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function (){
	var access = 'auth';
	var token = jwt.sign({_id: this._id.toHexString(), access: access}, '123abc').toString();
	this.tokens = this.tokens.concat([{access: access, token: token}]);
	return this.save().then(() => {
		return token;
	});
}
var User = mongoose.model("Users", UserSchema);

module.exports = {User};