import express from "express";
import * as bulk from "../controllers/orderBulk.controller.js";

const router = express.Router();

// ✅ Bulk Create
router.post("/create", bulk.bulkCreateOrders);

// ✅ Bulk Update
router.patch("/update", bulk.bulkUpdateOrders);

// ✅ Bulk Delete
router.delete("/delete", bulk.bulkDeleteOrders);

// ✅ Bulk Status Update
router.patch("/status", bulk.bulkUpdateStatus);

// ✅ Bulk Archive
router.patch("/archive", bulk.bulkArchiveOrders);

// ✅ Bulk Restore
router.patch("/restore", bulk.bulkRestoreOrders);

// ✅ Bulk Apply Discount
router.post("/apply-discount", bulk.bulkApplyDiscount);

// ✅ Bulk Payment Status
router.patch("/payment-status", bulk.bulkPaymentStatus);

// ✅ Bulk Shipping Status
router.patch("/shipping-status", bulk.bulkShippingStatus);

// ✅ Cleanup Cancelled Orders
router.delete("/cleanup-cancelled", bulk.bulkCleanupCancelled);

export default router;