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

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;