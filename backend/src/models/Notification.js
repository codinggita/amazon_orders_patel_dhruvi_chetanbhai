// models/notification.model.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    CustomerID: {
      type: String,
      required: true
    },

    OrderID: String,    
    ProductID: String,    

    Message: {
      type: String,
      required: true
    },

    Type: {
      type: String,
      enum: ["order", "cart", "payment", "shipping"],
      default: "order"
    },

    IsRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);