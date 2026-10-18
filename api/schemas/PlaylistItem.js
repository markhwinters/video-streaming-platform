const mongoose = require("mongoose")

const playlistItemSchema = new mongoose.Schema({
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    position: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "Position must be an integer",
        },
    },
}, { timestamps: true })

playlistItemSchema.index({ playlist: 1, movie: 1 }, { unique: true })
playlistItemSchema.index({ playlist: 1, position: 1 }, { unique: true })

module.exports = mongoose.model("PlaylistItem", playlistItemSchema)
