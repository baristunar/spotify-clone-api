const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/02/10/17/52/musician-2055803_1280.jpg",
    },
    genres: [
      {
        type: String,
        trim: true,
      },
    ],
    followers: {
      type: Number,
      default: 0,
    },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
