const mongoose = require("mongoose")

const watchProgressSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    positionSeconds: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

watchProgressSchema.index({ profile: 1, movie: 1 }, { unique: true })
watchProgressSchema.index({ profile: 1, updatedAt: -1 })

module.exports = mongoose.model("WatchProgress", watchProgressSchema)
