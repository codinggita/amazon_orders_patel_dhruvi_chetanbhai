import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const secret = process.env.JWT_SECRET || "dev_jwt_secret";
    if (!process.env.JWT_SECRET) console.warn("WARNING: JWT_SECRET not set — using fallback secret for development");

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}