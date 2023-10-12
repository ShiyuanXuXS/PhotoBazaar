const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

// Retrieve all users
router.get("/", userController.findAll);

// Retrieve a single user with user email
router.get("/:email", userController.findUserByEmail);

// Retrieve a single user with user id
router.get("/id/:id", userController.findUserById);

// Create a new user
router.post("/", userController.addUser);

// Delete a user with user email
router.delete("/:email", userController.deleteUserByEmail);

// Authentic a user
router.post("/auth", userController.authUser);

// Update a user password with email
router.put("/:email", userController.updateUserByEmail);

module.exports = router;
