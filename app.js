var express = require('express'),
app = express(),
path = require('path'),
cookieParser = require ('cookie-parser');

var session = require('express-session');
var config = require('./config/config.js');

var ConnectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose').connect(config.dbURL);

passport = require('passport');
FacebookStrategy = require('passport-facebook').Strategy;
var rooms = [];

app.set('views', path.join(__dirname,'views'));

//hogan templateing engine- templating engine inside in express
// to ender html file and it will use hogan-express to render them
app.engine('html', require('hogan-express'));

//
app.set('view engine','html');

//set express setting static attributes -
// to help express twherre to find the static file(css, img etc)
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use(session({
	secret: config.sessionSecret,
	store: new ConnectMongo({
		url: config.dbURL,
		stringify:true
	})
}));

/****************************** Checking monggose connection  ******************* */
//var userSchema = mongoose.Schema({
//	username: String,
//	password: String,
//	fullname: String
//});
//var Person = mongoose.model('users',userSchema);
//var John = new Person({
//	username: 'Joydip',
//	password: 'joydip',
//	fullname: 'joydipNath'
//});
//John.save(function(err){
//	console.log(err);
//});
/****************************** Checking monggose connection ends ******************* */
var env = process.env.NODE_ENV || 'development' ;
if(env === 'development'){
	app.use(session({secret:config.sessionSecret}));
	//console.log();
}else{
	app.use(session({
		secret:config.sessionSecret,
		store: new ConnectMongo({
			//url: config.dbURL,
			mongoose_connection:mongoose.connection[0],
			stringify:true
		})
	}));
}

//app.use(session({secret:'catscanfly', saveUninitialized:true, resave:true}));

//app.route('/').get(function(req, res, next){
//	//res.send('<h1>Hello </h1>');
//	res.render('index',{ title : 'Welcome to Chat'}); // rendering index.html - as we have already sets views
//});

app.use(passport.initialize());
app.use(passport.session());

require('./auth/passportauth.js')(passport, FacebookStrategy, config, mongoose);
require('./route/route.js')(express,app,passport,config, rooms);

//app.listen(3000, function(){
//	console.log('Chat listening to 3000');
//	console.log('Mode : ' + env);
//});

/*********************  configuring the express for socket.io **********************/
app.set('port', 3000);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

require('./socket/socket.js')(io,rooms);
server.listen(app.get('port'),function(){
	console.log('Chat on PORT' + app.get('port'));
})