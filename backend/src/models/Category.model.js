import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true
    },

    categoryName: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    productCount: {
      type: Number,
      default: 0
    },

    createdBy: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;