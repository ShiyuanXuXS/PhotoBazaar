const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const mailgun = require("mailgun.js");
const formdata = require("form-data");
const dotenv = require("dotenv");
const SmtpMailer = require("@techamica/smtpserver-node");
dotenv.config();
const secretKey = process.env.SECRET_KEY || "importantsecret";
// const { isAuth, isAdmin, generateToken, baseUrl } = require("../utils.js");
const nodemailer = require("nodemailer");

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

  //find user information for profile
  userProfile: async (req, res) => {
    const id = req.params._id;
    const basicInfo = await User.findOne(id, {
      attributes: { exclude: ["password"] },
    });

    res.json({ basicInfo: basicInfo });
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
        { username: existingUser.username, id: existingUser._id },
        secretKey,
        { expiresIn: "1d" }
      );
      res.status(201).json({
        message: `You are loggin in as ${existingUser.username}.`,
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "User Controllers: Internal Server Error" });
    }
  },

  //decode token and return user's information
  validateToken: async (req, res) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) {
      return res.status(400).json({ error: "User not logged In!" });
    }

    try {
      const validToken = verify(accessToken, secretKey);
      // req.user = validToken;
      if (validToken && validToken.id) {
        const user = await User.findOne({ _id: validToken.id });
        console.log(user);
        res.status(200).json({
          token: accessToken,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            nickname: user.nickname,
          },
        });
      }
    } catch (err) {
      res.status(500).json({ error: "User not found" });
    }
  },

  //Todo: retrive artwork_id list from user_id
  // crud artwork_id list
<<<<<<< Updated upstream
  updateMyAssetsById: async (req, res) => {
    const user_id = req.params.id; // Corrected parameter name from _id to id
    const update = req.body.my_assets;
    // const update =
    //   [{ "arkwork_id": "6529b5d22ae3b64352fb739d" }];

    try {
      const user = await User.findOne({ _id: user_id });

      if (user) {
        if (user.my_assets === null) {
          user.my_assets = [update]; // Wrap update in an array
        } else {
          console.log("======");
          console.log(update);
          console.log(user.my_assets);
          user.my_assets = [...user.my_assets, ...update.my_assets];
          // user.my_assets.push(...update);
          console.log(user.my_assets);
        }

        // Save the updated user
        // const updatedUser = await user.save();
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({
          message: "Error from user controller: No such user found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error from user controller: An error occurred",
      });
    }
  },

  forgotPassword: async (req, res) => {
    console.log(
      "inside user controller forgotpassword:" + req.body.forgotemail
    );
    // const user = await User.findOne({ email: req.body.resetemail });
    // const user = User.findOne({ email: req.body.forgotemail });
    User.findOne({ email: req.body.forgotemail }).then((result) => {
      if (result) {
        console.log("inside user controller forgotpw findone:" + result.email);
        // console.log(`${process.env.baseUrl}/changepassword/${req.body.token}`);

        console.log(
          `${process.env.baseUrl}/changepassword/${req.body.forgotemail}`
        );
        //smtp
        const nodemailer = require("nodemailer");

        var transport = nodemailer.createTransport({
          service: "gmail",

          auth: {
            user: "pekinglc@gmail.com",
            pass: "omuc elme ehux hvpj",
          },
        });

        const mailoptions = {
          from: "pekinglc@gmail.com",
          to: "dpl200002@hotmail.com",
          subject: "Hello!",
          text: "This is a test of Mailtrap and Nodemailer. ",
          html: `
             <p>Please Click the following link to reset your password:</p>
             <a href="http://localhost:3000/changepassword/dpl200002@hotmail.com"}>Reset Password</a>
             `,
        };

        transport.sendMail(mailoptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
        //maigun
        // const mg = new mailgun(formdata);
        // const client = mg.client({
        //   username: "api",
        //   key: process.env.MAILGUN_API_KEY,
        // });
        // const messageData = {
        //   from: process.env.MAILGUN_SERVEREMAIL,
        //   // to: [`${user_email}`],
        //   to: [process.env.MAILGUN_CLIENTEMAIL],
        //   subject: "Hello",
        //   text: "aaa",
        //   html: `
        //      <p>Please Click the following link to reset your password:</p>
        //      <a href="${process.env.REACT_APP_URL}/changepassword/${req.body.forgotemail}"}>Reset Password</a>
        //      `,
        // };
        // client.messages
        //   .create(process.env.MAILGUN_DOMIAN, messageData)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
        //maigun end

        // console.log(`${user.email}`);
      } else {
        res.status(404).send({
          message: "error from user controller: No such user email found",
        });
      }
    });

    // console.log("inside user controller userfindone:" + user.email);

    // if (user) {
    //   const token = sign({ _id: user._id }, process.env.JWT_SECRET, {
    //     expiresIn: "3h",
    //   });
    // user.resetToken = token;
    // console.log("inside user controller forgotpassword:" + user.resettoken);

    // await user.save();
    //reset link
    //   console.log(`${process.env.baseUrl}/changepassword/${token}`);
    //   console.log(`${user.email}`);
    // } else {
    //   res.status(404).send({ message: "User not found" });
    // }
  },

  // if (user) {
  //   const token = sign({ _id: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: "3h",
  //   });
  // user.resetToken = token;
  // console.log("inside user controller forgotpassword:" + user.resettoken);

  // await user.save();
  //reset link
  //   console.log(`${process.env.baseUrl}/changepassword/${token}`);
  //   console.log(`${user.email}`);
  // } else {
  //   res.status(404).send({ message: "User not found" });
  // }
=======
>>>>>>> Stashed changes
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
