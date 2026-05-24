// models/wishlist.model.js

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    CustomerID: {
      type: String,
      required: true
    },

    Products: [
      {
        ProductID: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);