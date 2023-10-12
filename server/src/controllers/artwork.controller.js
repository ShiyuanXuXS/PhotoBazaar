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
                // console.log(err);
                res.status(400).json({
                    message: "error from artwork controller",
                    err
                });
            });
    },
    createArtwork: async (req, res) => {
        const { _id, author_id, cover_url, description, photos, price, tags, title } = req.body;
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

        newArtwork.save()
            .then((result) => {
                // console.log(result);
                res.send(result).status(200);
            })
            .catch((err) => {
                // console.log(err);
                res.status(400).json({
                    message: "error from artwork controller",
                    err
                });
            });
    },
    findArtworkById: async (req, res) => {
        const artwork_id = req.params.id;
        Artwork.findOne({ _id: artwork_id })
            .then((result) => {
                if (result) {
                    res.send(result).status(200);
                } else {
                    res.status(404).send({ message: "error from artwork controller: No such product found" });
                }
            })
            .catch((err) => {
                res.status(400).json({
                    message: "error from artwork controller",
                    err
                });
            });
    },
    // FIXME, if artwork is sold, can't delete by user
    deleteArtworkById: async (req, res) => {
        const artwork_id = req.params.id;
        await Artwork.findOneAndDelete({ _id: artwork_id })
            .then((result) => {
                if (result) {
                    res.status(200).send({ message: "Artwork deleted successfully" });
                } else {
                    res.status(404).send({ message: "No artwork found to delete" });
                }
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
    updateArtworkById: async (req, res) => {
        const artwork_id = req.params.id;
        console.log(artwork_id);
        const { _id, author_id, cover_url, description, photos, price, tags, title } = req.body;

        const update = {
            _id,
            author_id,
            cover_url,
            description,
            photos: photos.map(photo => ({
                photo_name: photo.photo_name,
                description: photo.description,
                upload_time: new Date(photo.upload_time),
                modify_time: new Date(photo.modify_time),
                file_url: photo.file_url,
            })),
            price,
            tags: tags.map(tag => ({ tag_id: tag.tag_id })),
            title,
        };
        await Artwork.findOneAndUpdate({ _id: artwork_id }, update, { new: true })
            .then((result) => {
                if (result) {
                    res.status(200).send({ message: "Artwork updated successfully" });
                } else {
                    res.status(404).json({ message: 'Artwork not found' });
                }
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
}