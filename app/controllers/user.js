var numeral = require('numeral');
var bcrypt = require('bcrypt');
var dateFormat = require('dateformat');
var User = require('../models/user');
var Webtoken =require('../models/session');
var jwt = require('jsonwebtoken');

exports.signup = function (req, res) {
	let data = req.body
	User.findOne({ mail: data.email }, function (err, user) {
		// if there are any errors, return the error
		if (err)
			res.status(500).json({ "message": "Something went bad", "code": 500 })

		// check to see if theres already a user with that email
		if (user) {
			res.status(409).json({ "message": "That email is already taken", "code": 409 })
		} else {
			// if there is no user with that email
			// create the user
			var newUser = new User();
			const saltRounds = 10;
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(data.password, salt);



			newUser.mail = data.email;
			newUser.name = data.name;
			newUser.active = true;
			newUser.active_hash = hash;
			// save the user
			newUser.save(function (err) {
				if (err)
					throw err;

				res.status(201).json({ "message": "Account Created Successfully", "code": 201 })

				//	req.session.destroy();

			});




		}

	});

}
exports.users=function (req,res) {
	res.json(req.user)
	//console.log(req.user)
	
}

exports.login = function (req, res) {
	let data = req.body;
	User.findOne({ mail: data.email }, function (err, user) {
		if (user) {
			bcrypt.compare(data.password, user.active_hash).then(isMatch => {
				if (isMatch) {
					let payload = {
						id: user._id,
						role: user.role_id
					}
				var token = jwt.sign(payload,process.env.secret,{expiresIn:6000*5}); //made it that the token expires in 5 minutes
				webtoken = new Webtoken();
				//Webtoken.userID=user._id;
				webtoken.token=token;
				Webtoken.user_ID=user._id;
			//	console.log(user._id)
				webtoken.save(function (err) {
					if (err)
						throw err;
	
						res.json({message:"ok",token:token,code:200})
	
					//	req.session.destroy();
	
				});
				
			
				}else
				res.status(401).json({ "message": "Password is wrong", "code": 401 })
			})
		} else {
			res.status(404).json({ "message": "Account Not found", "code": 404 })
		}
	})

}



