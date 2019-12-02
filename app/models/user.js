
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

//define the schema for our user model
var userSchema = mongoose.Schema({	
	lastName: String,
	firstName: String,
	picture:String,
	dob:Date,
	mail: String,
	phoneNumber:String,
	active: { type: Boolean, default: true},
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now },
	active_hash: String,	
	role_id: { type: Number, default: 2 }
});


//checking if password is valid
userSchema.methods.validPassword = function(password,hash) {
 return bcrypt.compareSync(password, hash); 
};


//create the model for users and expose it to our app
module.exports = mongoose.model('login', userSchema);