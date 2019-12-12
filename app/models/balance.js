
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');


//define the schema for our user model
var balanceSchema = mongoose.Schema({	
userID:mongoose.Schema.Types.ObjectId,
balance:mongoose.Schema.Types.Decimal128
});


//checking if password is valid



//create the model for users and expose it to our app
module.exports = mongoose.model('balance', balanceSchema);