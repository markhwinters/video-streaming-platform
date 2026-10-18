const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active",
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Account", accountSchema)
