import express from "express";
import orderRoutes from "./routes/order.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderStatsRoutes from "./routes/orderStats.route.js";
import orderShipmentRoutes from "./routes/orderShipment.route.js";
import orderAuthRoutes from "./routes/orderAuth.route.js";
import orderAdminRoutes from "./routes/orderAdmin.route.js";
import errorRoutes from "./routes/orderError.route.js";
import validationRoutes from "./routes/orderValidation.route.js";
import advancedRoutes from "./routes/orderAdvance.route.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  next(err);
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "ShopFusion API is running" });
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "ShopFusion API v1 is running" });
});

// routes
app.use("/api/v1/orders", orderRoutes); 
app.use("/api/v1/analytics", analyticsRoutes); 
app.use("/api/v1/stats", orderStatsRoutes); 
app.use("/api/v1/shipping", orderShipmentRoutes);
app.use("/api/v1/auth", orderAuthRoutes);
app.use("/api/v1/admin", orderAdminRoutes);
app.use("/api/v1/errors", errorRoutes);
app.use("/api/v1/validate", validationRoutes);
app.use("/api/v1", advancedRoutes);
export default app;