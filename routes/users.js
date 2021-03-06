var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/users');

router.use(bodyParser.json());

/* GET users listing. */
router.post('signup', (req, res, next)=>{
	User.findOne({username: req.body.username})
	.then((user)=> {
		if(user != null){
			var err = new Error('User'+ req.body.username+ ' aleady exsts');
			err.status = 403;
			next(err);
		}
		else{
			return User.create({
				username: req.body.username,
				password: req.body.password
			});
		}
	})
	.then((user)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({status: 'registeration succesfull', user: user});
	},(err)=> next(err))
	.catch((err)=>next(err));
});

router.post('/login',(req, res, next)=> {
	if(!req.session.user){
		var authheader = req.headers.authorization;
		if(!authheader){
			var err = new Error('You are not authenticated');
			res.setHeader('WWW-Authenticate','Basic');
			err.status = 401;
			return next(err);
		}

		var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
		var username = auth[0];
		var password = auth[1];

		User.findOne({username: username})
		.then((user)=>{
			if(user===null){
				var err = new Error('User'+ username+' does not exits');
				err.status = 403;
				return next(err);
			}
			else if(user.password!== password){
				var err= new Error('your password is not correct');
				err.status = 403;
				return next(err);
			}
			req.session.user = 'authenticated';
			res.statusCode = 200;
			res.setHeader('Content-type','text/plain');
			res.end('you are authenticated');
		})
		.catch((err)=> next(err));
	}
	else{
		res.statusCode = 200;
		res.setHeader('Content-type','text/plain');
		res.end('you are already authenticated');
	}
});

router.get('/logout',(req, res)=>{
	if(req.session){
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	}
	else{
		var err = new Error(' you are not logged in');
		err.status = 403;
		next(err);
	}
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
