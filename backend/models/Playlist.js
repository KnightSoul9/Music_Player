const mongoose = require('mongoose');
const Playlist= new mongoose. Schema ({
    name: {
       type: String, 
       required: true,
    },
    thumbnail: {
        type: String, 
        required: true,
     },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
            default:[],
         },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
     },
     collaborators: {
        type: [{ 
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
        default: [], 
    },
    
});
const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel;