const Artwork = require('../models/artwork.model');

module.exports = {
    getAllArtworks: async (req, res) => {
        await Artwork.find()
            .sort({ _id: 1 })
            .then((result) => {
                // console.log(result);
                res.send(result).status(200);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    message: "error from artwork controller",
                    err
                });
            });
    },
    createArtwork: async (req, res) => {
        const { _id, author_id, cover_url, description, photos, price, tags, title } = req.body;
        console.log(req.body);

        const newArtwork = new Artwork({
            _id,
            author_id,
            cover_url,
            description,
            photos: photos.map(photo => {
                return {
                    photo_name: photo.photo_name,
                    description: photo.description,
                    upload_time: new Date(photo.upload_time),
                    modify_time: new Date(photo.modify_time),
                    file_url: photo.file_url,
                };
            }),
            price,
            tags: tags.map(tag => ({ tag_id: tag.tag_id })),
            title,
        });

        await newArtwork.save()
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
    },


}