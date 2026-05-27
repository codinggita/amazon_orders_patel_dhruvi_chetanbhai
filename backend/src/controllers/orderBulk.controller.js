import Order from "../models/order.model.js";


// ========================
// 1. BULK CREATE
// ========================
export const bulkCreateOrders = async (req, res) => {
  try {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ success: false, message: "Request body must be a non-empty array of orders" });
    }

    const data = await Order.insertMany(orders);

    res.json({
      success: true,
      message: "Bulk orders created",
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 2. BULK UPDATE (by OrderID)
// ========================
export const bulkUpdateOrders = async (req, res) => {
  try {
    const updates = req.body; // [{ OrderID, data }]

    const results = await Promise.all(
      updates.map(async (item) => {
        // normalize possible shapes: { OrderID, data }, { orderId, data }, or full object with OrderID and other fields
        const orderId = item?.OrderID || item?.orderId || item?.OrderID?.toString();

        // determine payload: prefer explicit `data` field, fall back to item minus id fields
        let payload = null;
        if (item && item.data != null) payload = item.data;
        else if (item && typeof item === 'object') {
          // clone and remove id keys
          const clone = { ...item };
          delete clone.OrderID;
          delete clone.orderId;
          // if clone has keys, use it as payload
          payload = Object.keys(clone).length ? clone : null;
        }

        if (!orderId || payload == null) {
          return {
            OrderID: orderId || null,
            status: "invalid_payload",
            updated: null,
          };
        }

        const updated = await Order.findOneAndUpdate(
          { OrderID: orderId },
          { $set: payload },
          { returnDocument: 'after', runValidators: true }
        );

        if (!updated) {
          return {
            OrderID: orderId,
            status: "not_found",
            updated: null,
          };
        }

        return {
          OrderID: orderId,
          status: "updated",
          updated,
        };
      })
    );

    res.json({
      success: true,
      message: "Bulk orders updated",
      count: results.filter((item) => item.status === "updated").length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 3. BULK DELETE
// ========================
export const bulkDeleteOrders = async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({ success: false, message: "orderIds must be a non-empty array" });
    }

    const result = await Order.deleteMany({
      OrderID: { $in: orderIds },
    });

    res.json({
      success: true,
      message: "Orders deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 4. BULK STATUS UPDATE
// ========================
export const bulkUpdateStatus = async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0 || !status) {
      return res.status(400).json({ success: false, message: "orderIds and status are required" });
    }

    // normalize ids to strings and trim whitespace
    const normalizedIds = orderIds
      .flat()
      .map((id) => (id == null ? null : String(id).trim()))
      .filter((id) => id);

    if (normalizedIds.length === 0) {
      return res.status(400).json({ success: false, message: "No valid orderIds provided" });
    }

    // find which OrderIDs actually exist
    const existingDocs = await Order.find({ OrderID: { $in: normalizedIds } }).select("OrderID").lean();
    const existingIds = existingDocs.map((d) => d.OrderID);
    const missingIds = normalizedIds.filter((id) => !existingIds.includes(id));

    if (existingIds.length === 0) {
      return res.json({
        success: true,
        message: "No matching orders found",
        matched: 0,
        modified: 0,
        existingIds: [],
        missingIds,
      });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: existingIds } },
      { $set: { OrderStatus: status } }
    );

    res.json({
      success: true,
      message: "Order status updated",
      matched: result.matchedCount,
      modified: result.modifiedCount,
      existingIds,
      missingIds,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 5. BULK ARCHIVE
// ========================
export const bulkArchiveOrders = async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({ success: false, message: "orderIds must be a non-empty array" });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: orderIds } },
      { $set: { OrderStatus: "Archived" } }
    );

    res.json({
      success: true,
      message: "Orders archived",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 6. BULK RESTORE
// ========================
export const bulkRestoreOrders = async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({ success: false, message: "orderIds must be a non-empty array" });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: orderIds } },
      { $set: { OrderStatus: "Pending" } }
    );

    res.json({
      success: true,
      message: "Orders restored",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 7. APPLY DISCOUNT IN BULK
// ========================
export const bulkApplyDiscount = async (req, res) => {
  try {
    const { orderIds, discount } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0 || discount == null) {
      return res.status(400).json({ success: false, message: "orderIds and discount are required" });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: orderIds } },
      {
        $set: { Discount: discount },
      }
    );

    res.json({
      success: true,
      message: "Discount applied",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 8. BULK PAYMENT STATUS
// ========================
export const bulkPaymentStatus = async (req, res) => {
  try {
    const { orderIds, paymentMethod } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0 || !paymentMethod) {
      return res.status(400).json({ success: false, message: "orderIds and paymentMethod are required" });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: orderIds } },
      { $set: { PaymentMethod: paymentMethod } }
    );

    res.json({
      success: true,
      message: "Payment status updated",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 9. BULK SHIPPING STATUS
// ========================
export const bulkShippingStatus = async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0 || !status) {
      return res.status(400).json({ success: false, message: "orderIds and status are required" });
    }

    const result = await Order.updateMany(
      { OrderID: { $in: orderIds } },
      { $set: { OrderStatus: status } }
    );

    res.json({
      success: true,
      message: "Shipping status updated",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========================
// 10. CLEANUP CANCELLED ORDERS
// ========================
export const bulkCleanupCancelled = async (req, res) => {
  try {
    const result = await Order.deleteMany({
      OrderStatus: "Cancelled",
    });

    res.json({
      success: true,
      message: "Cancelled orders deleted",
      deleted: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};