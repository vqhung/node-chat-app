const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected.');


socket.emit('newMessage', {
  from: 'Admin',
  text: 'Welcome to the chat app',
  createdAt: new Date().getTime()
});

socket.broadcast.emit('newMessage', {
  from: 'Admin',
  text: 'New user joined',
  createdAt: new Date().getTime()
});

socket.on('disconnect', () => {
  console.log('User disconnected');
});

});

app.use(express.static(publicPath));



server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
})
