var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

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

UserSchema.statics.findByCredentials = function(email, password){
	return this.findOne({email}).then((user) => {
		if(!user){
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, function(err, res){
				if(!res){
					reject();
				}
				resolve(user);
			});
		});
	});
}

UserSchema.statics.findByToken = function(token){
	var decoded;

	try{
		decoded = jwt.verify(token, '123abc');
		// console.log(decoded);
	}catch(e){
		return Promise.reject();
	}
	
	return this.findOne({
		'_id': decoded._id,
		'tokens.access': 'auth',
		'tokens.token': token
	});
}

UserSchema.pre('save', function(next){
	var user = this;
	if(user.isModified('password')){
		bcrypt.hash(user.password, 10, function(err, hash){
			user.password = hash;
			next();
		});
	}else{
		next();
	}
});

var User = mongoose.model("Users", UserSchema);

module.exports = {User};