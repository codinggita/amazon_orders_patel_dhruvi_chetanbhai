// models/notification.model.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    NotificationID: {
      type: String,
      required: true,
      unique: true
    },

    CustomerID: {
      type: String,
      required: true
    },

    OrderID: {
      type: String,
      required: true
    },

    ProductID: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["Order", "Payment", "Shipping", "System"],
      required: true
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);