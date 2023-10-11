const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artwork.controller.js');

// Retrieve all artworks
router.get("/", artworkController.getAllArtworks);

// Create a new artwork
router.post("/", artworkController.createArtwork);

// Retrieve a single artwork with artwork—_id
router.get("/:id(\\w{24})", artworkController.findArtworkById);

// Delete a artwork with artwork—_id
router.delete("/:id(\\w{24})", artworkController.deleteArtworkById);

// Update a artwork with artwork—_id
router.patch("/:id", artworkController.updateArtworkById);

module.exports = router;
