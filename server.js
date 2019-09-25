require('./server/config/database');
const express = require('express');
const app = express();
const path = require('path');
const bp = require('body-parser');
const router = require('./server/routes');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({extended: true}));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(express.static( path.join(__dirname, './dist/funday')));
app.set('secretKey', 'bgy9u7w6nwv5bfnk');
app.use(router);
const server = app.listen(8000, () => console.log('listening on port 8000'));



const io = require('socket.io')(server);
var roomChat = [];

io.on('connection', function (socket) { //2


  socket.on('join', function (user) { //7
    roomChat.push(user);
    console.log('room chat = ', roomChat)
    console.log("hello from server");
    console.log(user);
    io.emit('OutMessage', {msg :{ user :user, msg : "has joined the room"}});
  });
  socket.on('newMessage', function (msg) { //7

    console.log("got new message");
    console.log(msg);
    io.emit('OutMessage', {msg :{ user :msg.user, msg : msg.msg}});
  });

});
