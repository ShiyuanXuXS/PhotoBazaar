const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

const tagRoutes = require('./src/routes/tag.routes');
const messageRoutes = require('./src/routes/message.routes');

app.use(express.json()); 

app.use('/api/tags', tagRoutes); 
app.use('api/messages', messageRoutes);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send-message', (data) => {
    io.emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});