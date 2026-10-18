const assert = require("node:assert/strict")
const test = require("node:test")
const mongoose = require("mongoose")

const Account = require("../schemas/Account")
const Movie = require("../schemas/Movie")
const Playlist = require("../schemas/Playlist")
const PlaylistItem = require("../schemas/PlaylistItem")
const Profile = require("../schemas/Profile")
const WatchProgress = require("../schemas/WatchProgress")

async function assertHasValidationError(document, path) {
    await assert.rejects(document.validate(), (error) => {
        return error instanceof mongoose.Error.ValidationError && Boolean(error.errors[path])
    })
}

test("account requires a Clerk user ID and defaults to active", async () => {
    const account = new Account({ clerkUserId: "user_123" })

    await account.validate()
    assert.equal(account.status, "active")
    await assertHasValidationError(new Account(), "clerkUserId")
})

test("profile requires an account and a name", async () => {
    const profile = new Profile({
        account: new mongoose.Types.ObjectId(),
        name: "Family",
    })

    await profile.validate()
    await assertHasValidationError(new Profile(), "account")
    await assertHasValidationError(new Profile(), "name")
})

test("movie defaults to draft and requires a title and slug", async () => {
    const movie = new Movie({ title: "Sample", slug: "sample" })

    await movie.validate()
    assert.equal(movie.status, "draft")
    await assertHasValidationError(new Movie(), "title")
    await assertHasValidationError(new Movie(), "slug")
})

test("playlist requires a profile and a name", async () => {
    const playlist = new Playlist({
        profile: new mongoose.Types.ObjectId(),
        name: "Favorites",
    })

    await playlist.validate()
    await assertHasValidationError(new Playlist(), "profile")
    await assertHasValidationError(new Playlist(), "name")
})

test("playlist item positions must be whole non-negative numbers", async () => {
    const playlistItem = new PlaylistItem({
        playlist: new mongoose.Types.ObjectId(),
        movie: new mongoose.Types.ObjectId(),
        position: 0,
    })

    await playlistItem.validate()
    await assertHasValidationError(new PlaylistItem({ position: 1.5 }), "position")
    await assertHasValidationError(new PlaylistItem({ position: -1 }), "position")
})

test("watch progress defaults to the start of a movie", async () => {
    const progress = new WatchProgress({
        profile: new mongoose.Types.ObjectId(),
        movie: new mongoose.Types.ObjectId(),
    })

    await progress.validate()
    assert.equal(progress.positionSeconds, 0)
    assert.equal(progress.completed, false)
})
