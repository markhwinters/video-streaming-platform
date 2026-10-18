const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 40,
    },
    avatarUrl: {
        type: String,
        trim: true,
        default: "",
    },
    maturityLevel: {
        type: String,
        enum: ["kids", "teen", "adult"],
        default: "adult",
        required: true,
    },
    language: {
        type: String,
        trim: true,
        default: "en",
    },
}, { timestamps: true })

profileSchema.index({ account: 1, name: 1 }, { unique: true })

module.exports = mongoose.model("Profile", profileSchema)
