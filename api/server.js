const express = require("express")
require("dotenv").config()
const { clerkMiddleware } = require("@clerk/express")
const connectDB = require("./db/config")
const authRouter = require("./routes/auth")

const app = express()
const port = process.env.PORT || 3001

app.use(clerkMiddleware())
app.use(express.json())

app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Server is up and running!")
})

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
})

app.use((error, req, res, next) => {
    console.error("API request failed:", error)

    if (res.headersSent) {
        return next(error)
    }

    if (error.status === 400) {
        return res.status(400).json({ error: "Invalid request" })
    }

    return res.status(500).json({ error: "Internal server error" })
})

async function start() {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

start().catch((error) => {
    console.error("Failed to start the API:", error)
    process.exitCode = 1
})