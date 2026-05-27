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
      required: true,
      index: true
    },

    shippedAt: {
      type: Date
    },

    deliveredAt: {
      type: Date
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "In Transit", "Delivered", "Returned", "Rescheduled"],
      default: "Pending",
      index: true
    },

    carrier: {
      type: String,
      required: true
    },

    trackingNumber: {
      type: String,
      unique: true,
      required: true
    },

    shippingLabelUrl: {
      type: String
    },

    rescheduledAt: {
      type: Date
    },

    shippingCost: {
      type: Number,
      default: 0
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
    }
  },
  {
    timestamps: true
  }
);

const ShipmentModel = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);

export default ShipmentModel;