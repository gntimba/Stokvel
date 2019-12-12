
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');


//define the schema for our user model
var statementSchema = mongoose.Schema({	
	userID: mongoose.Schema.Types.ObjectId,
	description: String,
	currency:mongoose.Schema.Types.Decimal128,
	type:{type:String,enum:['in','out']},
	created_date: { type: Date, default: Date.now }
});

statementSchema.set('toJSON',{
	getters: true,
	transform: (doc, ret) => {
		if (ret.currency) {
		  ret.currency = ret.currency.toString();
		}
		delete ret.__v;
		delete ret._id;
		delete ret.id;
		return ret;
	  }
})

//create the model for users and expose it to our app
module.exports = mongoose.model('statement', statementSchema);