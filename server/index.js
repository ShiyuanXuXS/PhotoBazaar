const express = require("express");
const mongoose = require("mongoose");
// const http = require("http");
// const socketIo = require("socket.io");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const purchaseRoutes=require("./src/routes/purchase.routes")
const tagRoutes = require("./src/routes/tag.routes");
const messageRoutes = require("./src/routes/message.routes");
const artworkRoutes = require("./src/routes/artworks.routes");
const userRouter = require("./src/routes/users.routes");

app.use(express.json());
app.use("/api/purchases",purchaseRoutes)
app.use("/api/tags", tagRoutes);
app.use("/api/messages", messageRoutes);
app.use(cors());
app.use("/api/artworks", artworkRoutes);
app.use("/users", userRouter);

const Message = require("./src/models/message.model");
const messageModel = new Message();
const userSockets = {};
// userSockets['user1'] = 'socketId1'; //for test
// userSockets['user2'] = 'socketId2'; //for test

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
// const purchaseController = require("./src/controllers/purchase.controller");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection', async (socket) => {
  console.log('A user connected');
  socket.on('user_info', (userInfo) => {
    // if (userInfo.username in userSockets) {
      userSockets[userInfo.username]=socket
    // }
    console.log(`${userInfo.username} Connected to server, socket_id: ${socket.id}`);
    // console.log(userSockets['user1']?userSockets['user1'].id:"no user1")
    // console.log(userSockets['user2']?userSockets['user2'].id:"no user2")
  })

  socket.on("private-message", async (data) => {
    const sender_id = data.sender_username; //todo: auth & find userid by username
    const receiver_id = data.receiver_username; //todo: find userid by username
    const message = data.message;
    console.log(`receive private-message sender_username: ${data.sender_username},receiver_username: ${data.receiver_username},message: ${data.message}`);

    try {
      const insertedId = await messageModel.save(sender_id, receiver_id, message);
      console.log("message inserted:" + insertedId)
      const receiverSocket = userSockets[data.receiver_username];
      if (receiverSocket) {
        console.log(receiverSocket.id)
        receiverSocket.emit('sendback', data);
        console.log(`send to ${data.receiver_username}: private-message sender_username: ${data.sender_username},receiver_username: ${data.receiver_username},message: ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to save message to database:', error);
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// connect Database
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "PhotoBazaar",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
