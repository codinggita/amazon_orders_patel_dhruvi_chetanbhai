// routes/validation.route.js

import express from "express";

import {
  validateOrder,
  validateOrderUpdate,
  validateCoupon,
  validateUpload,
  validatePayment,
  validateRegister,
  validateLogin,
  validateProduct,
  validateRefund
} from "../controllers/orderValidation.controller.js";

const router = express.Router();

router.post("/order", validateOrder);

router.patch("/order/:id", validateOrderUpdate);

router.post("/coupon", validateCoupon);

router.post("/upload", validateUpload);

router.post("/payment", validatePayment);

router.post("/auth/register", validateRegister);

router.post("/auth/login", validateLogin);

router.post("/product", validateProduct);

router.post("/refund", validateRefund);

export default router;