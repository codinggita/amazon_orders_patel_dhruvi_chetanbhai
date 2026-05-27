import express from "express";
import {
  trackShipment,
  updateShippingStatus,
  getPendingShipments,
  getDeliveredShipments,
  getReturnedShipments,
  createShippingLabel,
  estimateDeliveryDate,
  getCarriers,
  changeShippingAddress,
  rescheduleDelivery
} from "../controllers/orderShipment.controller.js";

const router = express.Router();

router.get("/tracking/:orderId", trackShipment);
router.patch("/update-status/:orderId", updateShippingStatus);

router.get("/pending", getPendingShipments);
router.get("/delivered", getDeliveredShipments);
router.get("/returned", getReturnedShipments);

router.post("/create-label", createShippingLabel);

router.get("/estimate/:orderId", estimateDeliveryDate);

router.get("/carriers", getCarriers);

router.patch("/change-address/:orderId", changeShippingAddress);

router.post("/rescheduled/:orderId", rescheduleDelivery);

export default router;