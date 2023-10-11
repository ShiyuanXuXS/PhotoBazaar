const Artwork = require('../models/artwork.model');

module.exports = {
    findAllArtwork: async (req, res) => {
        await Artwork.find()
            .sort({ _id: 1 })
            .then((result) => {
                console.log(result);
                res.send(result).status(200);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    message: "error from artwork controller",
                    err
                });
            });
    }
}