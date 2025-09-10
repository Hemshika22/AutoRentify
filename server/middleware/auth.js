import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // remove "Bearer"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ success: false, message: "Not authorized" });
      }

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      return next();  // ✅ Only call next if valid
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token invalid" });
    }
  }

  // ✅ Only runs if no token at all
  return res.status(401).json({ success: false, message: "No token, not authorized" });
};
