import express from "express";
import {
  getOrder,
  createOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrder);
router.post("/", createOrder);

export default router;