import Order from "../models/order.model.js";

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find(); 

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      OrderID,
      OrderDate,
      CustomerID,
      CustomerName,
      ProductID,
      ProductName,
      Category,
      Brand,
      Quantity,
      UnitPrice,
      Discount,
      Tax,
      ShippingCost,
      TotalAmount,
      PaymentMethod,
      OrderStatus,
      City,
      State,
      Country,
      SellerID,
    } = req.body;

    if (!OrderID) {
      return res.status(400).json({
        success: false,
        message: "OrderID is required",
      });
    }

    const newOrder = new Order({
      OrderID,
      OrderDate: OrderDate || new Date(),
      CustomerID,
      CustomerName,
      ProductID,
      ProductName,
      Category,
      Brand,
      Quantity: parseInt(Quantity) || 1,
      UnitPrice: parseFloat(UnitPrice) || 0,
      Discount: parseFloat(Discount) || 0,
      Tax: parseFloat(Tax) || 0,
      ShippingCost: parseFloat(ShippingCost) || 0,
      TotalAmount: parseFloat(TotalAmount) || 0,
      PaymentMethod,
      OrderStatus: OrderStatus || "pending",
      City,
      State,
      Country,
      SellerID,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};