import express from "express";
import {
  filterByStatus,
  filterByPayment,
  filterByCategory,
  filterByBrand,
  filterByPrice,
  filterByDate,
  filterByCountry,
  filterByState,
  filterByCity,
  filterHighValue,
  filterDiscounted,
  filterCancelled,
  filterRefunded,
  filterShipped,
  filterDelivered
} from "../controllers/orderFilter.controller.js";

const router = express.Router();


// ======================
// FILTER ROUTES
// ======================

router.get("/status", filterByStatus);
router.get("/payment", filterByPayment);
router.get("/category", filterByCategory);
router.get("/brand", filterByBrand);
router.get("/price", filterByPrice);
router.get("/date", filterByDate);
router.get("/country", filterByCountry);
router.get("/state", filterByState);
router.get("/city", filterByCity);
router.get("/high-value", filterHighValue);
router.get("/discounted", filterDiscounted);
router.get("/cancelled", filterCancelled);
router.get("/refunded", filterRefunded);
router.get("/shipped", filterShipped);
router.get("/delivered", filterDelivered);

export default router;