// models/payment.model.js

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    OrderID: {
      type: String,
      required: true
    },

    CustomerID: {
      type: String,
      required: true
    },

    PaymentMethod: {
      type: String,
      required: true
    },

    TotalAmount: {
      type: Number,
      required: true
    },

    PaymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);