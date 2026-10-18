const mongoose = require("mongoose")

async function connectDB() {
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const host = process.env.MONGODB_HOST
    const database = process.env.MONGODB_DATABASE

    if (!username || !password || !host || !database) {
        throw new Error(
            "MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, and MONGODB_DATABASE are required",
        )
    }

    const credentials = `${encodeURIComponent(username)}:${encodeURIComponent(password)}`
    const uri = `mongodb://${credentials}@${host}:27017/${database}?authSource=admin`

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    console.log(`Connected to MongoDB database "${mongoose.connection.name}"`)
}

module.exports = connectDB
