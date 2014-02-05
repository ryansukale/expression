
/**
 * Module dependencies.
 */

var express = require('express'),
http = require('http'),
routes = require('./routes'),
path = require('path'),
dust = require('dustjs-linkedin'),
app = express(),
store = new express.session.MemoryStore;

var templateEngine = 'dust';

// all environments

if ( templateEngine == 'dust' ) {
	var cons = require('consolidate');
	app.engine('dust', cons.dust);
}

app.set('template_engine', templateEngine);
app.set('view engine', templateEngine);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use( express.cookieParser() );
app.use(express.session({ secret: 'whatever', store: store }));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);

app.get('/', function(req,res,next){

	var resJson = {
		"title": "Famous People", 
		"names" : [{ "name": "Larry" },{ "name": "Curly" },{ "name": "Moe" }]
	}
	res.render('sample',resJson);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
