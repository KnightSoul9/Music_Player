// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const Song = require("../models/Song");

// //Here we are using passport as a middleware to check the authenticity of the user
// router.post("/create", passport.authenticate("jwt",{session:false}), async (req, res)=>{
//     const {name, thumbnail, track} = req.body;
//     //req.user gets the user because of passport.authenticate
//     if (!name || !thumbnail || !track) {
//       return res.status(301)
//       .json({err: "Insufficient details to create song."});
// }
//     const artist = req.user._id;
//     const songDetails = {name, thumbnail, track, artist};
//     const createdSong = await Song.create(songDetails);
// });
// //Creating a route for the songs uploaded by the current user 
// router.post("/get/mysongs", passport.authenticate("jwt",{session:false}), async (req, res)=>{
//     const currentUser = req.user;
//     // We need to get all songs where artist id = currentUser._id
//     const songs = await Song.find({artist: req.user._id});
//     return res.status(200).json({data: songs});
// });

// module.exports= router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// Here we are using passport as a middleware to check the authenticity of the user
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;

    // req.user gets the user because of passport.authenticate
    if (!name || !thumbnail || !track) {
        return res.status(400).json({ err: "Insufficient details to create song." });
    }

    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };

    try {
        const createdSong = await Song.create(songDetails);
        return res.status(201).json({ data: createdSong });
    } catch (err) {
        return res.status(500).json({ err: "Error creating song." });
    }
});

// Creating a route for the songs uploaded by the current user
router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    // We need to get all songs where artist id = currentUser._id
    try {
        //populate will expand the artist which is coming as an API and all the attributes of artist will be shown
        const songs = await Song.find({ artist: req.user._id }).populate("artist");
        return res.status(200).json({ data: songs });
    } catch (err) {
        return res.status(500).json({ err: "Error retrieving songs." });
    }
});


// Get route to get  all songs any artist has published
// I will send the artist id and I want to see all songs that artist has published.
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}), 
    async (req, res) =>{
        const {artistId} = req.params; 
        // We can check if the artist does not exis:
        const artist = await User.findOne({_id:artistId});
    if (!artist) {
    return res.status (400).json({err: "Artist does not exist"});
    }
    const songs = await Song.find({artist: artistId});
    return res.status(200).json({data: songs});
});
// Get route to get a single song by name
router.get(
    "/get/songname/:songName",
    passport.authenticate("jwt", {session: false}), 
    async (req, res) =>{
        const {songName} = req.params;
        // name: songName -> exact name matching. Vanilla, Vanila
        // Pattern matching instead of direct name matching.
        const songs = await Song.find({name: songName}).populate("artist"); 
    return res.status(200).json({data: songs});
});

module.exports = router;
