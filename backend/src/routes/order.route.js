import express from "express";
import searchRouter from "./orderSearch.route.js";
import filterRouter from "./orderFilter.route.js";
import paginationRouter from "./orderPagination.route.js";

import {
  getAllOrders,
  getOrderById,
  createOrder,
  replaceOrder,
  updateOrder,
  deleteOrder,
  checkOrderExists,
  getOrderSummary,
  getOrderItems,
  getOrderHistory,
  archiveOrder,
  restoreOrder,
  cancelOrder,
  duplicateOrder,
  getInvoice
} from "../controllers/order.controller.js";

const router = express.Router();


// ======================
// ✅ SEARCH ROUTES FIRST
// ======================
router.use("/search", searchRouter);
router.use("/filter", filterRouter);
router.use("/", paginationRouter);

// ======================
// CRUD ROUTES
// ======================
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.post("/", createOrder);
router.put("/:orderId", replaceOrder);
router.patch("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);


// ======================
// EXTRA ORDER ACTION ROUTES
// ======================
router.get("/:orderId/exists", checkOrderExists);
router.get("/:orderId/summary", getOrderSummary);
router.get("/:orderId/items", getOrderItems);
router.get("/:orderId/history", getOrderHistory);

router.patch("/:orderId/archive", archiveOrder);
router.patch("/:orderId/restore", restoreOrder);

router.post("/:orderId/cancel", cancelOrder);
router.post("/:orderId/duplicate", duplicateOrder);

router.get("/:orderId/invoice", getInvoice);

export default router;