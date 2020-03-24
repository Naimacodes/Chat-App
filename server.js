const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//sets static folder for our front end

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Admin';

// runs when client connects, listens to an event

io.on('connection', socket => {
  //welcomes current user
  socket.emit('message', formatMessage(botName, 'Welcome to the chat'));

  //broadcasts to everybody when a certain user connects except the user in question
  socket.broadcast.emit(
    'message',
    formatMessage(botName, 'a user has joined the chat')
  );

  // runs when client disconnects
  socket.on('disconnect', () => {
    //emits to everyone
    io.emit('message', formatMessage(botName, 'a user has left the chat'));
  });

  //listens for chatMessage
  socket.on('chatMessage', msg => {
    //emits the message back to the client for everyone to see

    io.emit('message', formatMessage('user', msg));
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT} `));
