const Artwork = require('../models/artwork.model');

module.exports = {
    findAllArtwork: async (req, res) => {
        await Artwork.find()
            .sort({ _id: 1 })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
}