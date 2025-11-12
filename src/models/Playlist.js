const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Playlist name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    coverImage: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2014/04/03/11/07/disc-311810_1280.png",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Creator is required"],
      ref: "User",
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: Number,
        default: 0,
      },
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
