var render = require('./lib/render')
var jsonResp = require('./lib/jsonResp')
var config = require('./lib/config')
var sessionHelper = require('./lib/sessionHelper')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var app = koa();

var gameWorld =require("./lib/gameWorld")

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)

//ROUTES
app.keys = [config.sessionSecret]
app.use(session())
app.use(jsonResp())
app.use(router(app))

//PAGE ROUTES
app.get('/', defaultPageLoad('index'))
app.get('/public/*', serve('.'))


//PAGE HANDLERS
function defaultPageLoad(pageName, requiresLogin) {
  return function *(){
    if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
      this.redirect('/login')
      return
    }

    var temp = sessionHelper.commonTemplate(this.session);
    this.body = yield render(pageName, temp)
  }
}

var server = http.createServer(app.callback())
var io = require('socket.io').listen(server, { log: false });

io.sockets.on('connection', function (socket) {
	socket.playerData = {mapArea: null,x: 0,y: 0, health: 100, attack: 5, gold: 0}

	gameWorld.addPlayerToMapArea(socket, 0, 0)

	socket.emit('updateMap', { map: socket.playerData.mapArea.map });

	socket.on('my other event', function (data) {
		console.log(socket.id)
		//console.log(data);
	});
});

server.listen(config.appPort);
console.log('Started ----------------------------------------------')