// controllers/error.controller.js

// =========================
// 404 NOT FOUND
// =========================
export const simulateNotFoundError = async (req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: "Requested resource does not exist"
  });
};


// =========================
// INTERNAL SERVER ERROR
// =========================
export const simulateServerError = async (req, res) => {
  try {
    throw new Error("Internal Server Error Simulation");
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: err.message
    });
  }
};


// =========================
// DATABASE ERROR
// =========================
export const simulateDatabaseError = async (req, res) => {
  res.status(500).json({
    success: false,
    error: "Database Error",
    message: "Failed to connect to database"
  });
};


// =========================
// VALIDATION ERROR
// =========================
export const simulateValidationError = async (req, res) => {
  res.status(400).json({
    success: false,
    error: "Validation Error",
    message: "Invalid request data"
  });
};


// =========================
// RATE LIMIT ERROR
// =========================
export const simulateRateLimitError = async (req, res) => {
  res.status(429).json({
    success: false,
    error: "Too Many Requests",
    message: "Rate limit exceeded. Please try again later."
  });
};


// =========================
// TOKEN EXPIRED ERROR
// =========================
export const simulateTokenExpiredError = async (req, res) => {
  res.status(401).json({
    success: false,
    error: "Token Expired",
    message: "Authentication token has expired"
  });
};


// =========================
// PAYMENT FAILED ERROR
// =========================
export const simulatePaymentFailedError = async (req, res) => {
  res.status(402).json({
    success: false,
    error: "Payment Failed",
    message: "Payment transaction failed"
  });
};


// =========================
// SHIPPING FAILED ERROR
// =========================
export const simulateShippingFailedError = async (req, res) => {
  res.status(500).json({
    success: false,
    error: "Shipping Failed",
    message: "Shipment processing failed"
  });
};


// =========================
// UPLOAD ERROR
// =========================
export const simulateUploadError = async (req, res) => {
  res.status(400).json({
    success: false,
    error: "Upload Error",
    message: "File upload failed"
  });
};


// =========================
// CACHE ERROR
// =========================
export const simulateCacheError = async (req, res) => {
  res.status(500).json({
    success: false,
    error: "Cache Error",
    message: "Cache service unavailable"
  });
};