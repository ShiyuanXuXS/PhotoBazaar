const { Server } = require("socket.io");
const Message = require("../models/message.model");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const userSockets = {};

  io.on('connection', async (socket) => {
    console.log('A user connected');
    socket.on('user_info', (userInfo) => {
      // if (userInfo.username in userSockets) {
        userSockets[userInfo.id]=socket
      // }
      console.log(`${userInfo.username}(id: ${userInfo.id}) Connected to server, socket_id: ${socket.id}`);
      // console.log(userSockets['user1']?userSockets['user1'].id:"no user1")
      // console.log(userSockets['user2']?userSockets['user2'].id:"no user2")
    })
  
    socket.on("private-message", async (data) => {
      const sender_id = data.sender_id; //todo: auth & find userid by username
      const receiver_id = data.receiver_id; //todo: find userid by username
      const message = data.message;
      console.log(`receive private-message sender_id: ${data.sender_id},receiver_id: ${data.receiver_id},message: ${data.message}`);
  
      try {
        const insertedId = await Message.save(sender_id, receiver_id, message);
        console.log("message inserted:" + insertedId)
        const receiverSocket = userSockets[data.receiver_id];
        if (receiverSocket) {
          // console.log(receiverSocket.id)
          receiverSocket.emit('sendback', data);
          console.log(`send to ${data.receiver_id}: private-message sender_id: ${data.sender_id},receiver_username: ${data.receiver_id},message: ${data.message}`);
        }
      } catch (error) {
        console.error('Failed to save message to database:', error);
      }
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  
};
