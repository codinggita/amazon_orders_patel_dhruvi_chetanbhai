import express from "express";
import {
  getSortedOrders,
  getSpecialSortedOrders,
} from "../controllers/orderSort.controller.js";

const router = express.Router();

/**
 * =========================================
 * QUERY PARAM SORTING
 * /api/v1/orders?sort=amount | -amount | date | etc.
 * =========================================
 */
router.get("/", getSortedOrders);

/**
 * =========================================
 * SPECIAL SORTING ROUTES
 * /api/v1/orders/sort/highest-value
 * /api/v1/orders/sort/lowest-value
 * /api/v1/orders/sort/latest
 * /api/v1/orders/sort/oldest
 * /api/v1/orders/sort/most-items
 * /api/v1/orders/sort/least-items
 * /api/v1/orders/sort/discount
 * =========================================
 */
router.get("/sort/:type", getSpecialSortedOrders);

export default router;