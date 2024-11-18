const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieID:{
        type:String,
        required:true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    buttonUrlsAndTitles: [
      {
        url: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    genre_ids:[
      {
        type: String
      },
    ],
    isTrending:{
      type: Boolean,
      default: false
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);  // Check if model exists first

module.exports = Movie;
