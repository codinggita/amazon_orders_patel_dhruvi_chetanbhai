import express from "express";
import * as admin from "../controllers/orderAdmin.controller.js";

const router = express.Router();

/* =========================
   USERS ROUTES
========================= */

router.get("/users", admin.getAllUsers);
router.get("/users/:id", admin.getUserById);
router.patch("/users/:id/ban", admin.banUser);
router.patch("/users/:id/unban", admin.unbanUser);
router.patch("/users/:id/role", admin.changeUserRole);

/* =========================
   ORDERS ROUTES
========================= */

router.get("/orders", admin.getAllOrders);

/* =========================
   REPORTS ROUTES
========================= */

router.get("/reports/sales", admin.getSalesReport);
router.get("/reports/revenue", admin.getRevenueReport);
router.get("/reports/top-customers", admin.getTopCustomers);
router.get("/reports/top-products", admin.getTopProducts);

/* =========================
   SYSTEM ROUTES
========================= */

router.get("/system/health", admin.systemHealth);
router.get("/system/logs", admin.getSystemLogs);
router.post("/system/maintenance", admin.toggleMaintenance);
router.delete("/cache/clear", admin.clearCache);

/* =========================
   BACKUPS
========================= */
router.get("/backups", admin.getBackups);

export default router;