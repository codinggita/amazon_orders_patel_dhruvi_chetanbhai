import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
      unique: true
    },

    orderId: {
      type: String,
      required: true
    },

    shippedAt: {
      type: Date,
      required: true
    },

    deliveredAt: {
      type: Date,
      required: false
    },

    status: {
      type: String,
      enum: ["Shipped", "In Transit", "Delivered", "Returned"],
      default: "Shipped"
    },

    carrier: {
      type: String,
      default: "Unknown"
    },

    trackingNumber: {
      type: String,
      unique: true
    },

    origin: {
      city: String,
      state: String,
      country: String
    },

    destination: {
      city: String,
      state: String,
      country: String
    },

    shippingCost: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);