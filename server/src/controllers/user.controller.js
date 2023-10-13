const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const mailgun = require("mailgun.js");
const formdata = require("form-data");
// const { isAuth, isAdmin, generateToken, baseUrl } = require("../utils.js");

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

  //find a user by user id
  findUserById: async (req, res) => {
    const user_id = req.params._id;
    User.findOne({ _id: user_id })
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

  //update user password by email
  updateUserByEmail: async (req, res) => {
    const user_email = req.params.email;
    // console.log(req.body.password);
    if (req.body.password != req.body.confirmPassword) {
      return res
        .status(400)
        .send({ message: "confirm password mush be the same" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const update = { password: hash };

    // find the user by user email, and generate new token
    const user = await User.findOne({ email: user_email });
    const token = sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    //find the user and update the password
    await User.findOneAndUpdate({ email: user_email }, update, { new: true })
      .then((result) => {
        if (result) {
          console.log("inside update");
          //maigun
          const mg = new mailgun(formdata);
          const client = mg.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY,
          });
          const messageData = {
            from: process.env.MAILGUN_SERVEREMAIL,
            // to: [`${user_email}`],
            to: [process.env.MAILGUN_CLIENTEMAIL],
            subject: "Hello",
            text: "aaa",
            html: `
             <p>Please Click the following link to reset your password:</p>
             <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
             `,
          };
          client.messages
            .create(process.env.MAILGUN_DOMIAN, messageData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
          //maigun end

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

  //authentication:user login
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
          .status(400)
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

  validateToken: async (req, res) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged In!" });

    try {
      const validToken = verify(accessToken, "importantsecret");
      req.user = validToken;

      if (validToken) {
        return next();
      }
    } catch (err) {
      res.json({ error: err });
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
