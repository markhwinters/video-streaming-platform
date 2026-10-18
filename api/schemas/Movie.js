const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    synopsis: {
        type: String,
        trim: true,
        default: "",
        maxlength: 5000,
    },
    genres: {
        type: [String],
        default: [],
    },
    releaseYear: {
        type: Number,
        min: 1888,
        max: 3000,
    },
    runtimeSeconds: {
        type: Number,
        min: 1,
    },
    maturityRating: {
        type: String,
        trim: true,
        default: "NR",
    },
    artworkUrl: {
        type: String,
        trim: true,
        default: "",
    },
    playbackUrl: {
        type: String,
        trim: true,
        default: "",
    },
    status: {
        type: String,
        enum: ["draft", "published", "unavailable"],
        default: "draft",
        required: true,
    },
}, { timestamps: true })

movieSchema.index({ status: 1, title: 1 })

module.exports = mongoose.model("Movie", movieSchema)
