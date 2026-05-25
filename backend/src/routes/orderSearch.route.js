import express from "express";

import {
  searchOrders,
  searchByCustomer,
  searchByProduct,
  searchByCategory,
  searchByBrand,
  searchByStatus,
  searchByPayment,
  searchByLocation,
  searchByDate,
  searchByTracking,
  fuzzySearch,
  autocompleteSearch,
  highlightSearch,
  recentSearch,
  popularSearch,
} from "../controllers/orderSearch.controller.js";

const router = express.Router();


// ======================
// SEARCH ROUTES
// ======================

router.get("/", searchOrders);

router.get("/customer", searchByCustomer);
router.get("/product", searchByProduct);
router.get("/category", searchByCategory);
router.get("/brand", searchByBrand);
router.get("/status", searchByStatus);
router.get("/payment", searchByPayment);
router.get("/location", searchByLocation);
router.get("/date", searchByDate);
router.get("/tracking", searchByTracking);

router.get("/fuzzy", fuzzySearch);
router.get("/autocomplete", autocompleteSearch);
router.get("/highlight", highlightSearch);

router.get("/recent", recentSearch);
router.get("/popular", popularSearch);


export default router;