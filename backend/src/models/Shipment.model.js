// models/shipment.model.js

import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    OrderID: {
      type: String,
      required: true
    },

    ShipmentStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Returned"],
      default: "Pending"
    },

    City: String,
    State: String,
    Country: String
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);