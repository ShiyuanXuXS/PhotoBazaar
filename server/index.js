const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;


const purchaseRoutes=require("./src/routes/purchase.routes")
const tagRoutes = require("./src/routes/tag.routes");
const messageRoutes = require("./src/routes/message.routes");
const artworkRoutes = require("./src/routes/artworks.routes");
const userRouter = require("./src/routes/users.routes");

app.use(express.json());
app.use(cors());

app.use("/api/purchases", purchaseRoutes)
app.use("/api/tags", tagRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/users", userRouter);

const socketController = require("./src/controllers/socket.controller");
const { createServer } = require("node:http");
const server = createServer(app);
socketController(server);


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
