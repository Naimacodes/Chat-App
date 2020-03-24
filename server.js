const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express();
const server = http.createServer(app)
const io = socketio(server)

//set static folder for our front end

app.use(express.static(path.join(__dirname, 'public')))


// run when a client connects, listens to an event

io.on('connection', socket=> {
  console.log('new web socket ');
})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT} `))