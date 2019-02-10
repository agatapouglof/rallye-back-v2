var request = require('request');
let router = require('express').Router();
var socketio = require('socket.io');
let user = require('./controllers/user');
let temps = require('./controllers/temps');
let speciale = require('./controllers/speciale');

module.exports.listen = function(server){
  var io = socketio.listen(server);
  var  i  = 1

  io.sockets.on('connection', function(socket){
    console.log('connection');
    socket.on('classementpush', (data) => {
      console.log(data.id_speciale);
      request.get({ url: 'http://localhost:3000/classement', json: true },function(err,res,body){
        if(err) {console.log(err)}
        else{
          console.log('classement pushed to front');
          io.emit('classement', body);
        }
      });
      request.get({ url: 'http://localhost:3000/temps/speciale/'+data.id_speciale, json: true },function(err,res,body){
        if(err) {console.log(err)}
        else{
          io.emit('speciale'+data.id_speciale, body);
        }
      });

    });
  });
}
