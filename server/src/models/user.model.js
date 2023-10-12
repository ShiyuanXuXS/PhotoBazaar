const { ObjectId } = require("mongodb");
const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //artwork id
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
  my_assets: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;