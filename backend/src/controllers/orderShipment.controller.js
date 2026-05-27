import Shipment from "../models/Shipment.model.js";


// =========================
// 1. TRACK SHIPMENT
// GET /shipping/tracking/:orderId
// =========================
export const trackShipment = async (req, res) => {
  try {
    const data = await Shipment.findOne({ orderId: req.params.orderId });

    if (!data) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 2. UPDATE STATUS
// PATCH /shipping/update-status/:orderId
// =========================
export const updateShippingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const data = await Shipment.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: { status } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    res.json({ success: true, message: "Status updated", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 3. PENDING SHIPMENTS
// GET /shipping/pending
// =========================
export const getPendingShipments = async (req, res) => {
  try {
    const data = await Shipment.find({ status: "Pending" });

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 4. DELIVERED SHIPMENTS
// GET /shipping/delivered
// =========================
export const getDeliveredShipments = async (req, res) => {
  try {
    const data = await Shipment.find({ status: "Delivered" });

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 5. RETURNED SHIPMENTS
// GET /shipping/returned
// =========================
export const getReturnedShipments = async (req, res) => {
  try {
    const data = await Shipment.find({ status: "Returned" });

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 6. CREATE SHIPPING LABEL
// POST /shipping/create-label
// =========================
export const createShippingLabel = async (req, res) => {
  try {
    const { orderId, trackingNumber } = req.body;

    if (!orderId || !trackingNumber) {
      return res.status(400).json({ success: false, message: "orderId and trackingNumber are required" });
    }

    const labelUrl = `https://shipping-labels.com/${trackingNumber}`;

    try {
      const data = await Shipment.findOneAndUpdate(
        { orderId },
        { $set: { trackingNumber, shippingLabelUrl: labelUrl } },
        { returnDocument: 'after', runValidators: true }
      );

      if (!data) {
        return res.status(404).json({ success: false, message: "Shipment not found" });
      }

      res.json({
        success: true,
        message: "Shipping label created",
        data
      });
    } catch (innerErr) {
      // duplicate tracking number
      if (innerErr.code === 11000) {
        return res.status(400).json({ success: false, message: "Tracking number already exists" });
      }
      throw innerErr;
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 7. ESTIMATE DELIVERY DATE
// GET /shipping/estimate/:orderId
// =========================
export const estimateDeliveryDate = async (req, res) => {
  try {
    const data = await Shipment.findOne({ orderId: req.params.orderId });

    if (!data) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    let estimate = null;

    if (data.shippedAt && data.status !== "Delivered") {
      const shippedDate = new Date(data.shippedAt);

      // simple estimate: +4 days delivery time
      estimate = new Date(shippedDate);
      estimate.setDate(shippedDate.getDate() + 4);
    }

    res.json({
      success: true,
      estimatedDeliveryDate: estimate || data.deliveredAt || "Not available"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 8. GET CARRIERS
// GET /shipping/carriers
// =========================
export const getCarriers = async (req, res) => {
  try {
    const data = await Shipment.distinct("carrier");

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 9. CHANGE SHIPPING ADDRESS
// PATCH /shipping/change-address/:orderId
// =========================
export const changeShippingAddress = async (req, res) => {
  try {
    const { destination } = req.body;

    if (!destination || typeof destination !== 'object') {
      return res.status(400).json({ success: false, message: "destination object is required" });
    }

    const data = await Shipment.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: { destination } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    res.json({
      success: true,
      message: "Address updated",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// =========================
// 10. RESCHEDULE DELIVERY
// POST /shipping/reschedule/:orderId
// =========================
export const rescheduleDelivery = async (req, res) => {
  try {
    const { rescheduledAt } = req.body;

    if (!rescheduledAt) {
      return res.status(400).json({ success: false, message: "rescheduledAt is required" });
    }

    const date = new Date(rescheduledAt);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid rescheduledAt date" });
    }

    const data = await Shipment.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: { status: "Rescheduled", rescheduledAt: date } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    res.json({
      success: true,
      message: "Delivery rescheduled",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};