// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    address: {
      city: String,
      state: String,
      country: String
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);