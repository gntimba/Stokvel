
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');

//define the schema for our user model
var sessionSchema = mongoose.Schema({	
	user_ID: String,
	token: String,
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now },
	active: { type: Boolean, default: true},
});



//create the model for users and expose it to our app
module.exports = mongoose.model('session', sessionSchema);