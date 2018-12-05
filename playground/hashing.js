 const {SHA256} = require('crypto-js');
 var jwt = require('jsonwebtoken');

var data = {
	id: 10
}

 var token = jwt.sign(data, '123abc');
 console.log(token);
 // jwt.verify();

 // var message = "This is a fuckin message";
 // var hash = SHA256(message).toString();

 // console.log(`Message: ${message}`);
 // console.log(`Hash: ${hash}`);