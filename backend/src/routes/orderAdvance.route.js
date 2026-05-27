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
  getRevenueDashboard
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

export default router;