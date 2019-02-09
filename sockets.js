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
      console.log(data);
      request.get({ url: 'http://localhost:3000/classement', json: true },function(err,res,body){
        if(err) {console.log(err)}
        else{
          // console.log(body);
          console.log('classement pushed front');
          console.log('socket');
          console.log(socket);
          socket.emit('classement', body);
          // io.emit('classement', body);
        }
      });

    });

    // events to listen for
      socket.on('new message',(data) => {
        console.log('sended new element from the client');
        console.log(data);
      });
      var classe = temps.classements();
      setTimeout(function(){
        socket.emit('speciale'+i, {
          speciale : 'resultat de la speciale',
          res : classe
        });
      }, 5000);

      request.get({ url: 'http://localhost:3000/temps/speciale/1', json: true },function(err,res,body){
        if(err) {console.log(err)}
        else{
          // console.log(body);
          socket.emit('classement1', body);
        }
      });

  });
}
