// models/category.model.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true } // helps track changes
);

export default mongoose.model("Category", categorySchema);