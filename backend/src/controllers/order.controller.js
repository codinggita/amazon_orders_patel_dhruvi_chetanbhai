import Order from "../models/Order.model.js";


// =============================
// 📦 CRUD
// =============================

// CREATE
export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// GET ALL (pagination + sorting)
export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const orders = await Order.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ orderId: req.params.orderId });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};


// =============================
// 📦 ORDER FEATURES
// =============================

export const getOrderItems = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    res.json({ success: true, data: order.items });
  } catch (err) {
    next(err);
  }
};

export const getOrderSummary = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    res.json({
      success: true,
      data: {
        totalAmount: order.pricing.totalAmount,
        items: order.items.length,
        status: order.orderStatus
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getOrderHistory = async (req, res) => {
  res.json({ success: true, message: "History feature optional" });
};

export const archiveOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { isArchived: true },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const restoreOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { isArchived: false },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { orderStatus: "Cancelled" },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const duplicateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    const newOrder = await Order.create({
      ...order.toObject(),
      orderId: "ORD" + Date.now()
    });
    res.json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};


// =============================
// 🔍 SEARCH
// =============================

export const searchOrders = async (req, res, next) => {
  try {
    const q = req.query.q;
    const orders = await Order.find({
      $or: [
        { "customer.name": { $regex: q, $options: "i" } },
        { orderStatus: { $regex: q, $options: "i" } }
      ]
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const searchByCustomer = async (req, res, next) => {
  try {
    const data = await Order.find({
      "customer.name": { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByProduct = async (req, res, next) => {
  try {
    const data = await Order.find({
      "items.productName": { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByCategory = async (req, res, next) => {
  try {
    const data = await Order.find({
      "items.category": { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByStatus = async (req, res, next) => {
  try {
    const data = await Order.find({
      orderStatus: { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByPayment = async (req, res, next) => {
  try {
    const data = await Order.find({
      "payment.method": { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByLocation = async (req, res, next) => {
  try {
    const data = await Order.find({
      "shippingAddress.city": { $regex: req.query.q, $options: "i" }
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByDate = async (req, res, next) => {
  try {
    const data = await Order.find({
      orderDate: new Date(req.query.q)
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchByTracking = async (req, res) => {
  res.json({ success: true, message: "Tracking optional" });
};


// =============================
// 🎯 FILTER
// =============================

export const filterByStatus = (req, res, next) =>
  Order.find({ orderStatus: req.query.type })
    .then(data => res.json({ success: true, data }))
    .catch(next);

export const filterByPayment = (req, res, next) =>
  Order.find({ "payment.method": req.query.method })
    .then(data => res.json({ success: true, data }))
    .catch(next);

export const filterByPrice = (req, res, next) =>
  Order.find({
    "pricing.totalAmount": {
      $gte: Number(req.query.min),
      $lte: Number(req.query.max)
    }
  })
    .then(data => res.json({ success: true, data }))
    .catch(next);


// =============================
// 📦 BULK
// =============================

export const bulkCreateOrders = async (req, res, next) => {
  try {
    const data = await Order.insertMany(req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const bulkUpdateOrders = async (req, res, next) => {
  try {
    const updates = req.body;
    const results = await Promise.all(
      updates.map(item =>
        Order.findOneAndUpdate({ orderId: item.orderId }, item)
      )
    );
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

export const bulkDeleteOrders = async (req, res, next) => {
  try {
    await Order.deleteMany({ orderId: { $in: req.body.ids } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};


// =============================
// 📊 ANALYTICS
// =============================

export const getTotalRevenue = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$pricing.totalAmount" } } }
    ]);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyRevenue = async (req, res, next) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          total: { $sum: "$pricing.totalAmount" }
        }
      }
    ]);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getOrderCount = async (req, res, next) => {
  try {
    const count = await Order.countDocuments();
    res.json({ success: true, data: count });
  } catch (err) {
    next(err);
  }
};