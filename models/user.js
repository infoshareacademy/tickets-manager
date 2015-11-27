var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
    
    fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	},
});