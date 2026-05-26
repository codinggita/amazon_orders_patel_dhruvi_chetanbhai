import express from "express";
import * as stats from "../controllers/orderStats.controller.js";

const router = express.Router();


router.get("/orders/total", stats.getTotalOrders);
router.get("/orders/daily", stats.getDailyOrders);
router.get("/orders/monthly", stats.getMonthlyOrders);
router.get("/orders/yearly", stats.getYearlyOrders);

router.get("/revenue/total", stats.getTotalRevenueStats);
router.get("/revenue/daily", stats.getDailyRevenue);
router.get("/revenue/monthly", stats.getMonthlyRevenueStats);
router.get("/revenue/yearly", stats.getYearlyRevenueStats);
router.get("/products/count", stats.getProductCount);
router.get("/customers/count", stats.getCustomerCount);
router.get("/categories/count", stats.getCategoryCount);
router.get("/refunds/count", stats.getRefundCount);
router.get("/cancellations/count", stats.getCancellationCount);

router.get("/shipping/average-time", stats.getAverageShippingTime);
router.get("/system/performance", stats.getSystemPerformance);

export default router;