const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const port = process.env.PORT || 3001;

const tagRoutes = require('./src/routes/tag.routes');
const messageRoutes = require('./src/routes/message.routes');

app.use(express.json()); 

app.use('/api/tags', tagRoutes); 
app.use('/api/messages', messageRoutes);



const server = http.createServer(app);
const io = socketIo(server);
const Message = require('./src/models/message.model');
const messageModel = new Message();
const userSockets = {};
userSockets['user1'] = 'socketId1'; //for test
userSockets['user2'] = 'socketId2'; //for test

io.on('connection', async (socket) => {
  console.log('A user connected');
  //todo: get username and save socket id to userSockets


  socket.on('private-message', async (data) => {
    const sender_id = data.sender_username; //todo: auth & find userid by username
    const receiver_id = data.receiver_username; //todo: find userid by username
    const message = data.message;
    
    try {
      const insertedId = await messageModel.save(sender_id, receiver_id, message);
      const receiverSocket = io.sockets.sockets[data.receiver_username];
      if (receiverSocket) {
        receiverSocket.emit('private-message', data);
      }
    } catch (error) {
      console.error('Failed to save message to database:', error);
      socket.emit('message-sent', { error: 'Failed to send message' });
    }
    });
    socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});