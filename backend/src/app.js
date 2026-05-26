import express from "express";
import orderRoutes from "./routes/order.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "ShopFusion API is running" });
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "ShopFusion API v1 is running" });
});

// routes
app.use("/api/v1/orders", orderRoutes); 
app.use("/api/v1/analytics", analyticsRoutes); // Add analytics routes

export default app;