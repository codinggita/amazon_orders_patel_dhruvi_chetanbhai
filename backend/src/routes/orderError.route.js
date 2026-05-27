// routes/error.route.js

import express from "express";

import {
  simulateNotFoundError,
  simulateServerError,
  simulateDatabaseError,
  simulateValidationError,
  simulateRateLimitError,
  simulateTokenExpiredError,
  simulatePaymentFailedError,
  simulateShippingFailedError,
  simulateUploadError,
  simulateCacheError
} from "../controllers/orderError.controller.js";

const router = express.Router();


// =========================
// ERROR SIMULATION ROUTES
// =========================

router.get("/not-found", simulateNotFoundError);

router.get("/server-error", simulateServerError);

router.get("/database", simulateDatabaseError);

router.get("/validation", simulateValidationError);

router.get("/rate-limit", simulateRateLimitError);

router.get("/token-expired", simulateTokenExpiredError);

router.get("/payment-failed", simulatePaymentFailedError);

router.get("/shipping-failed", simulateShippingFailedError);

router.get("/upload-error", simulateUploadError);

router.get("/cache-error", simulateCacheError);

export default router;