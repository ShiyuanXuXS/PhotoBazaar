const { ObjectId, Double } = require("mongodb");
const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
    {
        //artwork id
        _id: {
            type: ObjectId,
            required: true,
        },
        author_id: {
            type: String,
            required: true,
        },
        cover_url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photos: [
            {
                description: {
                    type: String,
                    required: true,
                },
                file_url: {
                    type: String,
                    required: true,
                },
            },
        ],
        price: {
            type: Double,
            required: true,
        },
        tags: [
            {
                type: String,
                required: true,
            },
        ],
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Artwork = mongoose.model("Artwork", artworkSchema);
module.exports = Artwork;