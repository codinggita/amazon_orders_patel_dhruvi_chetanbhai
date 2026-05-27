// routes/advanced.route.js

import express from "express";

import {
  getRecommendedProducts,
  getRecommendedProductsFromOrder,
  getTrendingProducts,
  getTrendingCategories,
  getNotifications,
  markNotificationRead,
  deleteNotification,
  getActivityLogs,
  getDashboardOverview,
  getRevenueDashboard,
  getOrdersDashboard,
  getCustomersDashboard,
  getProductsDashboard,
  getSystemVersion,
  getSystemConfig,
  getSystemUptime,
  pingServer,
  getDatabaseStatus,
  getCacheStatus,
  getStorageStatus
} from "../controllers/orderAdvance.controller.js";

const router = express.Router();

// =========================
// RECOMMENDATIONS
// =========================
router.get(
  "/recommendations/products/:customerId",
  getRecommendedProducts
);

router.get(
  "/recommendations/orders/:orderId",
  getRecommendedProductsFromOrder
);

// =========================
// TRENDING
// =========================
router.get("/trending/products", getTrendingProducts);

router.get("/trending/categories", getTrendingCategories);

// =========================
// NOTIFICATIONS
// =========================
router.get("/notifications", getNotifications);

router.patch(
  "/notifications/read/:id",
  markNotificationRead
);

router.delete(
  "/notifications/:id",
  deleteNotification
);

// =========================
// ACTIVITY LOGS
// =========================
router.get("/activity/logs", getActivityLogs);

// =========================
// DASHBOARD
// =========================
router.get("/dashboard/overview", getDashboardOverview);

router.get("/dashboard/revenue", getRevenueDashboard);

router.get("/dashboard/orders", getOrdersDashboard);

router.get("/dashboard/customers", getCustomersDashboard);

router.get("/dashboard/products", getProductsDashboard);

router.get("/system/version", getSystemVersion);

router.get("/system/config", getSystemConfig);

router.get("/system/uptime", getSystemUptime);

router.get("/system/ping", pingServer);

router.get("/system/status/database", getDatabaseStatus);

router.get("/system/status/cache", getCacheStatus);

router.get("/system/status/storage", getStorageStatus);


export default router;