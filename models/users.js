var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username:{
		type: String,
		required: true,
		unique: true
	},
	passwod:{
		type: String,
		required: true
	},
	admin:{
		type: boolean,
		required: false
	}
});

module.exports = mongoose.model('User', User);
