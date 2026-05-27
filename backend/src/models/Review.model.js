// models/review.model.js

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    CustomerID: {
      type: String,
      required: true
    },

    ProductID: {
      type: String,
      required: true
    },

    Rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    Comment: {
      type: String
    }
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;