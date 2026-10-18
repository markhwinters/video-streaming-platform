const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 1000,
    },
}, { timestamps: true })

playlistSchema.index({ profile: 1, name: 1 }, { unique: true })

module.exports = mongoose.model("Playlist", playlistSchema)
