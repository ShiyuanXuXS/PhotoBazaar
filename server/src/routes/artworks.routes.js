const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artwork.controller.js');

// Retrieve all artworks
router.get("/", artworkController.getAllArtworks);

module.exports = router;
