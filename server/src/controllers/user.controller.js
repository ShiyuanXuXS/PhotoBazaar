const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  //find all the users
  findAll: async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.json(users).status(200);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "User Controllers: Internal Server Error" });
    }
  },

  //find a user by email
  findUserByEmail: async (req, res) => {
    const user_email = req.params.email;
    User.findOne({ email: user_email })
      .then((result) => {
        if (result) {
          res.send(result).status(200);
        } else {
          res.status(404).send({
            message: "error from user controller: No such user found",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "error from user controller",
          err,
        });
      });
  },

  //add a user
  addUser: async (req, res) => {
    try {
      const user = req.body;
      const existingUseremail = await User.findOne({
        where: { email: user.email },
      });

      if (existingUseremail !== null) {
        return res
          .status(400)
          .json({ message: `User email ${user.email} already exists.` });
      }

      if (validateDataAdd(req, res)) {
        // hash the password
        const hash = await bcrypt.hash(user.password, 10);
        //create user with hashed password
        const newUser = await User.create({
          username: user.username,
          password: hash,
          email: user.email,
          role: user.role || "user", // Set a default role if not provided
        });
        res.json(newUser).status(201);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "User Controllers: create failed. Internal Server Error",
      });
    }
  },

  // delete user
  deleteUserByEmail: async (req, res) => {
    const user_email = req.params.email;
    await User.findOneAndDelete({ email: user_email })
      .then((result) => {
        if (result) {
          res.status(200).send({ message: "user deleted successfully" });
        } else {
          res.status(404).send({ message: "No user found to delete" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //update user password
  updateUserByEmail: async (req, res) => {
    const user_email = req.params.email;
    // console.log(req.body.password);
    const hash = await bcrypt.hash(req.body.password, 10);
    const update = { password: hash };

    await User.findOneAndUpdate({ email: user_email }, update, { new: true })
      .then((result) => {
        if (result) {
          res
            .status(200)
            .send({ message: "user password updated successfully" });
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //authentication
  authUser: async (req, res) => {
    try {
      const user = req.body;
      // find if user email exists
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ error: `User email ${user.email} doesn't exists.` });
      }

      // compare the password
      const match = await bcrypt.compare(user.password, existingUser.password);
      if (!match) {
        return res
          .status(200)
          .json({ error: "Wrong Username And Password Combination" });
      }
      // generate a token and pass the front-end
      const accessToken = sign(
        { username: user.username, id: existingUser._id },
        "importantsecret"
      );
      console.log("Controller: " + accessToken);
      res.status(201).json({
        message: `You are loggin in as ${user.username}.`,
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "User Controllers: Internal Server Error" });
    }
  },
};

//register validation
function validateDataAdd(req, res) {
  const { username, password, role, email } = req.body;
  console.log(password);

  // required, 4-20 characters, contains only numbers and lowercase letters
  if (
    validator.isEmpty(username) ||
    !validator.isLength(username, { min: 4, max: 20 }) ||
    !validator.isAlphanumeric(username, "en-US")
  ) {
    res.status(400).send({
      message:
        "User Controllers: Username must be 4-20 characters long and only contain numbers and lowercase letters",
    });
    return false;
  }

  // required, 6-100 characters, at least one uppercase letter, one lowercase letter, one number or special character
  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 6, max: 100 }) ||
    !validator.matches(
      password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      "g"
    )
  ) {
    res.status(400).send({
      message:
        "User Controllers: Password must be 6-100 characters long, contain at least one uppercase letter, one lowercase letter, one number or special character",
    });
    return false;
  }

  if (validator.isEmpty(role)) {
    res.status(400).send({ message: "User Controllers: Role must be entered" });
    return false;
  }

  // required, must look like a valid email
  if (validator.isEmpty(email) || !validator.isEmail(email)) {
    res
      .status(400)
      .send({ message: "User Controllers: Email must be entered and valid" });
    return false;
  }
  return { valid: true };
}
