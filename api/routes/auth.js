const express = require("express")
const { getAuth } = require("@clerk/express")
const Account = require("../schemas/Account")

const router = express.Router()

router.get("/me", async (req, res) => {
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated || !userId) {
        return res.status(401).json({ error: "Authentication required" })
    }

    const account = await Account.findOneAndUpdate(
        { clerkUserId: userId },
        { $setOnInsert: { clerkUserId: userId } },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    )

    if (account.status !== "active") {
        return res.status(403).json({ error: "Account is not active" })
    }

    return res.json({
        account: {
            id: account.id,
            status: account.status,
        },
    })
})

module.exports = router
