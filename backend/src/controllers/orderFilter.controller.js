import Order from "../models/order.model.js";

/* -----------------------------
   Helper
------------------------------ */
const buildRegex = (q) => new RegExp(q, "i");

/* -----------------------------
   1. STATUS FILTER
------------------------------ */
export const filterByStatus = async (req, res) => {
  const data = await Order.find({
    OrderStatus: req.query.type,
  });

  res.json({ success: true, data });
};

/* -----------------------------
   2. PAYMENT FILTER
------------------------------ */
export const filterByPayment = async (req, res) => {
  try {
    const method = req.query.method;

    const data = await Order.find({
      PaymentMethod: { $regex: method, $options: "i" },
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -----------------------------
   3. CATEGORY FILTER
------------------------------ */
export const filterByCategory = async (req, res) => {
  try {
    const { name } = req.query;

    const query = name
      ? { Category: { $regex: name, $options: "i" } }
      : {};

    const data = await Order.find(query);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   4. BRAND FILTER
------------------------------ */
export const filterByBrand = async (req, res) => {
  try {
    const { name } = req.query;

    const query = name
      ? { Brand: { $regex: name, $options: "i" } }
      : {};

    const data = await Order.find(query);

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   5. PRICE FILTER
------------------------------ */
export const filterByPrice = async (req, res) => {
  const min = Number(req.query.min) || 0;
  const max = Number(req.query.max) || Number.MAX_SAFE_INTEGER;

  const data = await Order.find({
    TotalAmount: { $gte: min, $lte: max },
  });

  res.json({ success: true, data });
};

/* -----------------------------
   6. DATE FILTER
------------------------------ */
export const filterByDate = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: "Start and end dates are required",
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    // include full end day (important!)
    endDate.setHours(23, 59, 59, 999);

    const data = await Order.find({
      OrderDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   7. COUNTRY FILTER
------------------------------ */
export const filterByCountry = async (req, res) => {
  try {
    const { name } = req.query;

    const query = name
      ? { Country: { $regex: name, $options: "i" } }
      : {};

    const data = await Order.find(query);

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   8. STATE FILTER
------------------------------ */
export const filterByState = async (req, res) => {
  try {
    const { name } = req.query;

    const query = name
      ? { State: { $regex: name, $options: "i" } }
      : {};

    const data = await Order.find(query);

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   9. CITY FILTER
------------------------------ */
export const filterByCity = async (req, res) => {
  try {
    const { name } = req.query;

    const query = name
      ? { City: { $regex: name, $options: "i" } }
      : {};

    const data = await Order.find(query);

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/* -----------------------------
   10. HIGH VALUE ORDERS
------------------------------ */
export const filterHighValue = async (req, res) => {
  try {
    let { amount } = req.query;

    // default value
    amount = amount ? Number(amount) : 1000;

    // validate number
    if (isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid number",
      });
    }

    const data = await Order.find({
      TotalAmount: { $gte: amount },
    }).sort({ TotalAmount: -1 }); // highest first

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   11. DISCOUNTED ORDERS
------------------------------ */
export const filterDiscounted = async (req, res) => {
  try {
    const data = await Order.find({
      $expr: {
        $gt: [{ $toDouble: "$Discount" }, 0],
      },
    }).sort({
      Discount: -1, // still string sort (we’ll fix below)
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   12. CANCELLED ORDERS
------------------------------ */
export const filterCancelled = async (req, res) => {
  const data = await Order.find({
    OrderStatus: "Cancelled",
  });

  res.json({ success: true, data });
};

/* -----------------------------
   13. REFUNDED ORDERS
------------------------------ */
export const filterRefunded = async (req, res) => {
  try {
    const data = await Order.find({
      OrderStatus: { $regex: "refund", $options: "i" },
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* -----------------------------
   14. SHIPPED ORDERS
------------------------------ */
export const filterShipped = async (req, res) => {
  const data = await Order.find({
    OrderStatus: "Shipped",
  });

  res.json({ success: true, data });
};

/* -----------------------------
   15. DELIVERED ORDERS
------------------------------ */
export const filterDelivered = async (req, res) => {
  const data = await Order.find({
    OrderStatus: "Delivered",
  });

  res.json({ success: true, data });
};